    var isWinRT = (typeof Windows === "undefined") ? false : true;
    var r = new RegExp("(^|(.*?\\/))(SuperMap.Include\.js)(\\?|$)"),
    s = document.getElementsByTagName('script'),
    src, m, _liburl = "",rootpath = "",rootL = 5;//到根目录的级别
    for(var i=0, len=s.length; i<len; i++) {
        src = s[i].getAttribute('src');
        if(src) {
            var m = src.match(r);
            if(m) {
                _liburl = m[1];
                break;
            }
        }
    }
	for(var i=0;i < rootL; i++){
	  rootpath += "../";
	}
    function inputScript(inc){
        if (!isWinRT) {
            var script = '<' + 'script type="text/javascript" src="' + inc + '"' + '><' + '/script>';
            document.writeln(script);
        } else {
            var script = document.createElement("script");
            script.src = inc;
            document.getElementsByTagName("HEAD")[0].appendChild(script);
        }
    }
    function inputCSS(style){
        if (!isWinRT) {
        	
            var css = '<' + 'link rel="stylesheet" href="' + style + '"><' + '/>';
            document.writeln(css);
        } else { 
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = style;
            document.getElementsByTagName("HEAD")[0].appendChild(link);
        }
    }
	function inputLess(style){
	if (!isWinRT) {
		var css = '<' + 'link rel="stylesheet/less" type = "text/css" href="' + _liburl + '../theme/default/' + style + '"' + '><' + '/>';
		document.writeln(css);
	} else { 
		var link = document.createElement("link");
		link.rel = "stylesheet/less";
		link.href = _liburl + "/theme/default/" + style;
		document.getElementsByTagName("HEAD")[0].appendChild(link);
	}
    }
    //加载类库资源文件
    function loadSMLibs() {
    	/*inputScript(_liburl+'SuperMap-7.1-11828.js');*/
    	inputScript(_liburl+'SuperMap-8.1.1-14426.js');
        inputCSS(_liburl+"../theme/default/"+'style.css');
        inputCSS(_liburl+"../theme/default/"+'google.css');
    }
    //引入汉化资源文件
    function loadLocalization() {
        inputScript(_liburl + 'Lang/zh-CN.js');
    }
    loadSMLibs();
    loadLocalization();
