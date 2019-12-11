function toJson (obj){ 
	if (this==null) return null; 
	var retObj = new Object;
	buildObjectNode(retObj,/*jQuery*/obj);
	return retObj; 
	function buildObjectNode(cycleOBJ,/*Element*/elNode){
		/*NamedNodeMap*/ 
		var nodeAttr=elNode.attributes; 
		if(nodeAttr != null){ 
			if (nodeAttr.length&&cycleOBJ==null) cycleOBJ=new Object; 
			for(var i=0;i<nodeAttr.length;i++){
				cycleOBJ[nodeAttr[i].name]=nodeAttr[i].value; 
				}
			} 
		var nodeText="text"; 
		if (elNode.text==null) nodeText="textContent"; 
		/*NodeList*/
		var nodeChilds=elNode.childNodes; 
		if(nodeChilds!=null){ 
			if (nodeChilds.length&&cycleOBJ==null)
			cycleOBJ=new Object; 
			for(var i=0;i<nodeChilds.length;i++){ 
				if (nodeChilds[i].tagName!=null){ 
					if (nodeChilds[i].childNodes[0]!=null&&nodeChilds[i].childNodes.length<=1&&(nodeChilds[i].childNodes[0].nodeType==3||nodeChilds[i].childNodes[0].nodeType==4)){
						if (cycleOBJ[nodeChilds[i].tagName]==null){
							cycleOBJ[nodeChilds[i].tagName]=nodeChilds[i][nodeText]; 
							}else{ 
								if (typeof(cycleOBJ[nodeChilds[i].tagName])=="object"&&cycleOBJ[nodeChilds[i].tagName].length){
									cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length]=nodeChilds[i][nodeText];
									}else{
										cycleOBJ[nodeChilds[i].tagName]=[cycleOBJ[nodeChilds[i].tagName]];
										cycleOBJ[nodeChilds[i].tagName][1]=nodeChilds[i][nodeText]; 
										}
								}
						}else{
							if (nodeChilds[i].childNodes.length){
								if (cycleOBJ[nodeChilds[i].tagName]==null){
									cycleOBJ[nodeChilds[i].tagName]=new Object; 
									buildObjectNode(cycleOBJ[nodeChilds[i].tagName],nodeChilds[i]); 
									}else{ 
										if (cycleOBJ[nodeChilds[i].tagName].length){
											cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length]=new Object;
											buildObjectNode(cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length-1],nodeChilds[i]);
											}else{ 
												cycleOBJ[nodeChilds[i].tagName]=[cycleOBJ[nodeChilds[i].tagName]]; 
												cycleOBJ[nodeChilds[i].tagName][1]=new Object; buildObjectNode(cycleOBJ[nodeChilds[i].tagName][1],nodeChilds[i]);
												}
										}
								}else{
									cycleOBJ[nodeChilds[i].tagName]=nodeChilds[i][nodeText]; 
									}
							}
					}
				} 
			}
		} 
	} 

function xmlToJson(xml) { 
	// Create the return object 
	var obj = {}; 
	if(xml.nodeType==9){
		xml = xml.documentElement;
	}
	if (xml.nodeType == 1) { // element 
	// do attributes 
	if (xml.attributes.length > 0) { 
	obj["attributes"] = {}; 
	for (var j = 0; j < xml.attributes.length; j++) { 
	var attribute = xml.attributes.item(j); 
	obj["attributes"][attribute.nodeName] = attribute.nodeValue; 
	} 
	} 
	} else if (xml.nodeType == 3) { // text 
	obj = xml.value||xml.nodeValue; 
	} 

	// do children 
	if (xml.hasChildNodes()) { 
	for (var i = 0; i < xml.childNodes.length; i++) { 
	var item = xml.childNodes.item(i); 
	if(!item.attributes&&!item.nodeValue.Trim()&&!item.childNodes.length)continue;
	var nodeName = item.nodeName.replaceIlegalityChar(); 
	if (typeof (obj[nodeName]) == "undefined") { 
	obj[nodeName] = xmlToJson(item); 
	} else { 
	if (typeof (obj[nodeName].length) == "undefined") { 
	var old = obj[nodeName]; 
	obj[nodeName] = []; 
	obj[nodeName].push(old); 
	} 
	obj[nodeName].push(xmlToJson(item)); 
	} 
	} 
	} 
	return obj; 
	}; 
