//导入所需的资源文件 
(function(){
        /****************js文件**  baseurl ="javascript\core\map\libs _baseurl="ROOT" "***************/
	    inputScript(_baseurl+'lib/plug-in/jQuery/jquery.1.9.10.min.js');//工具类
	    inputScript(_baseurl+'common/util/util.js');//工具类
	    inputScript(_baseurl+'common/util/browseradepter.js');//工具类
	    inputScript(_baseurl+'common/util/toJson.js');//json转换类
		inputScript(_baseurl+'common/util/ajaxQueue.js');//ajax列队管理脚本
        inputScript(_liburl+'../include.js');//mapTool初始化资源
        inputScript(_liburl+'../mapol/include.js');//map初始化资源
        inputScript(_baseurl+'common/init.js');//page初始化脚本
		/*****************css文件  baseurl ="javascript\core\map\libs  ****************/
    	//inputCSS(_baseurl+'lib/plug-in/font-awesome-4.4.0/css/font-awesome.min.css');//字体图标
    	inputCSS(_baseurl+'css/dome.css');//公共样式
  })();