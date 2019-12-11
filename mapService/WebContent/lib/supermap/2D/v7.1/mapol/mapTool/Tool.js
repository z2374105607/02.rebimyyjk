var mapTool=new function(){
this.name="";
};
mapTool.config = mapToolCfg;
mapTool.layout = layout;
mapTool.initialize = function(){
 var div=document.createElement("div");
 var ul=document.createElement("ul");
 ul.className="mapToolUl";
 ul.style.listStyle="none";
 div.className = "mapToolDiv";
 div.style.position = "absolute";
 div.style.zIndex=4990;
 div.style.top=this.layout.position.top;
 div.style.right=this.layout.position.right;
 var sequences=[];//工具排序
 for(var i in this.config){
   if(i!=="initialize"&&this.config[i].show==true)
	    sequences.push(this.config[i].sequence);
 }
 sequences.sort(function(a,b){return a>b?1:-1});//从小到大排序
 
	 for(var k=0;k<sequences.length;k++){
	   for(var i in this.config){
		if(this.config[i].sequence==sequences[k]){
		   var li=document.createElement("li");
		   var img=document.createElement("img");
		   li.className=i+"li";
		   if(this.layout.direction=="landscape"){
		     li.style.float="left";
			 li.style.marginLeft="3px";
		   }
		   img.className=i;
		   img.src=this.config[i].icon_n||imgPath+i+"."+imgType;
		   img.title=this.config[i].title;
		   if(!!this.config[i].clickHandle){
			   if(isIE){
				 img.setAttribute("onclick",this.config[i].clickHandle+"()");  
			   }else{
				 img.click=this.config[i].clickHandle;
			   }
		   }
		   if(!!this.config[i].icon_h&&!!this.config[i].icon_n){
		    img.mouseover=function(){img.src=this.config[i].icon_h||imgPath+i+"_1."+imgType;}
		   }
           li.appendChild(img);
           ul.appendChild(li);
		   break;
		}
		continue;
	 }
 }
 div.appendChild(ul);
 document.body.appendChild(div);
};