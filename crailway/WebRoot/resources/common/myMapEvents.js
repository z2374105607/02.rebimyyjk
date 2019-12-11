var hasMapObj = false,leave = 0,/*地图资源就绪标志*/leaveGroup=2;/*地图级别分组容级（几级一组，保持样式一致）*/
function initMyMapEvents(){
	if(hasMapObj){//map就绪
		top.mapFrame.page.oMap.events.on({
			"zoomend":function(args){
			/*************重置marker样式**************/
			leave = parseInt(args.object.zoom/leaveGroup);
			var markers = mapFrame.page.markerLayer.markers;
			if(markers&&markers.length){
				for(var i=0;i<markers.length;i++){
					var state = markers[i].attr[config.other.legendTheme.options.field];
					var tran = config.other.legendTheme.options.tran;
					if(tran){
						for(var k in tran){
							var t = transform(state,k,tran[k]);
							if(t!=null){state = t;break;}
						}
					}
					var style = null;
					try{style = config.other.legendTheme.options.styles[state]();}catch(e){style = {display:"none"};};
					var ele_p = markers[i].icon.imageDiv;
					var id = ele_p.id+"_div";
					var childs = ele_p.childNodes;
					for(var s=0; s<childs.length;s++){
					if(childs[s].id == id){
						for(var k in style){
							childs[s].style[k] = style[k];
						}
						break;
						}
					}
				};
			};
			/**********************END**********************/
		  }
			
		});
	}else{
	  setTimeout(function(){
			try{hasMapObj=top.mapFrame.page.oMap?true:false;}catch(e){}
			initMyMapEvents();
		},1000);
	}
}