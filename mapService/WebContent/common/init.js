var init = function(){
		//navaigation.initialize();//初始化导航
		//mapTool.initialize();//地图工具栏初始化
		initMapConfigs();//MapConfigs初始化
		page = new SGS.App.Index();
	    page.Initialize("divmap");
	    //page.InitMapSwitchBar("limitLevel");
	    //initUTFGrid();
	   // _page.Initialize();//加载并显示资源树
};
window.onload = init;
window.resize = function(){};
	
