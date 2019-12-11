(function(){
	function A(option) {
        var t = this;
        t.option = option;
        t.div = null;
        t.map = null;
        t.data = [];
        t.raphaelLayer = null;
        t.paper = null;
        t.text = "";
        t.events = {};
        t.animat ={};
        t.radiusField = "";
        t._maxRadius = 30;
        t.graphType = "circle";
        t.styleMap = {
            heightStyle : null,
            hoverStyle : null
        };
        t._defaultStyle = {"opacity":"0.7",fill:"r(0.3,0.3)#fff-#94bbf0:30-#418cf0","cursor":"pointer","fill-opacity":0.3,"font-family":"微软雅黑","font":"#fff","font-size":"12px","stroke-width":0.8,"stroke-opacity":0.8,"stroke":"#cecece"};
        t._defaultTextStyle = {"font-family":"微软雅黑","font-size":"12","stroke-width":1,"stroke":"#333"};
        t._minCircleR = 18;
        t._isMove = false;
        t._tempData=null;
        t._callback = null;
        for (var key in option) {
            t[key] = option[key];
        };
        //if(!t.raphaelLayer){console.log("raphael创建失败，raphael图层未绑定...");return;}
        t.createParer();
        t._createGraph(option);
        t.raphaelLayer.events.on({moveend: function (evt) {
            if(t._isMove){
                t._isMove = false;
            }
            t._refresh(evt);
        }});
        t.raphaelLayer.events.on({move: function (evt) {
            if(!t._isMove){
                t._isMove = true;
            }
        }});
	 };
	var p = A.prototype;
	p.createParer = function(){
		if(!Raphael){};
		var t = this;
		//if(!t.div){console.log("raphael未绑定任何元素之上...");return;}
		var size = this.map.getSize();
		this.paper = Raphael(this.div,size.w,size.h);
	};
	p._refresh = function(evt){
		var t = this;
		t._createGraph(t.option);
	};
	p.addData = function(data){
		this.data.push(data);
		this._refresh();
	};
	p.setData = function(data){
		this.data = data||[];
		this._refresh();
	};
	p.addGraph = function(x,y,options){
		this._refresh();
	};
	p.clear = function(){
		this.paper.clear();
	};
	p.setOption = function(option){
		for (var key in option) {
			this[key] = option[key];
			this.option[key] = option[key];
        };
        this._refresh();
	};
	p.hideOrShow = function(mode){
		if(mode){
			this.raphaelLayer.setVisibility(true);
		}else{
			this.raphaelLayer.setVisibility(false);
		}
	};
	p._createGraph = function(options){
		var t = this;
		t.clear();
		if(!t.data.length)return;
		options = options||{};
		options.graphType = options.graphType||t.graphType;
		options.text = options.text||t.text;
		options.events = options.events||t.events;
		options.style = options.style||t._defaultStyle;
		if(options.styleMap&&options.styleVariable){options.style = options.styleMap[options.styleVariable]||options.style;};
		options.animate = options.animate||t.animat;
		for(var i=0;i<t.data.length;i++){
			if((t.data[i].x||t.data[i].X)&&(t.data[i].y||t.data[i].Y)){
				var lonlat = new SuperMap.LonLat(parseFloat(t.data[i].x||t.data[i].X),parseFloat(t.data[i].y||t.data[i].Y));
				if(t.transition&&t.transition.length==2)lonlat.transform(t.transition[0],t.transition[1]);
				var pxLonLat = t.raphaelLayer.getLayerPxFromLonLat(lonlat);
				var r = parseFloat(((t.data[i].r||t.data[i].R||t.data[i][t.radiusField])?t.data[i].r||t.data[i].R||(t.data[i][t.radiusField]+17)||t._minCircleR:0));
				r=r>t._maxRadius?t._maxRadius:r;
				switch(options.graphType){
				case "circle"://画圆
					t.paper.circle(pxLonLat.x,pxLonLat.y,r).attr(options.style).animate(options.animate);
					break;
				case "rect"://矩形
					t.paper.rect(pxLonLat.x,pxLonLat.y,parseFloat(t.data[i].w||t.data[i].W),parseFloat(t.data[i].h||t.data[i].H)).attr(options.style).animate(options.animate);
					break;
				case "ellipse"://椭圆形
					t.paper.ellipse(pxLonLat.x,pxLonLat.y,parseFloat(t.data[i].rx||t.data[i].RX||t._minCircleR),parseFloat(t.data[i].ry||t.data[i].RY||t._minCircleR)).attr(options.style).animate(options.animate);
					break;
				case "path"://路径
					t.paper.path(t.data[i].path).attr(options.style).animate(options.animate);
					break;
				case "image"://图片
					t.paper.image(t.data[i].imgurl,pxLonLat.x,pxLonLat.y,t.data[i].width,t.data[i].heigh).attr(options.style).animate(options.animate);
					break;
				case "text"://文本
					t.paper.text(pxLonLat.x,pxLonLat.y,t.data[i].label).attr(options.textStyle||t._defaultTextStyle).animate(options.animate);
					break;
				};
				if(options.text){
					var fields = options.text.split(",");
					var text = "";
					for(var n=0;n<fields.length;n++){
						t.data[i][fields[n]] = t.data[i][fields[n]]==undefined||t.data[i][fields[n]]==null||t.data[i][fields[n]]=="null"?"":t.data[i][fields[n]];
						if(n!=fields.length-1){
							text += t.data[i][fields[n]]+"\n\n\n";
						}else{
							text += t.data[i][fields[n]];
						}
					}
					if(text&&text!=0){
						t.paper.text(pxLonLat.x,pxLonLat.y,text).attr((options.textStyle||t._defaultTextStyle)).animate(options.animate);
					}
				}
			}else{
				//console.log("缺少必要参数，屏幕坐标x或y...");return;
			}
		}
	};
	window.RaphaelWindMap = A;
})();