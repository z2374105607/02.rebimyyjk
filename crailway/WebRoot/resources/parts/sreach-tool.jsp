<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
.gover_search .search_suggest 
{
 position:absolute;
 z-index:999;
 left:132px;
 top:41px;
 width:468px;
 border:1px solid #ccc;
 border-top:none;
 display:none;
 color:#004080;
}
.gover_search .search_suggest li 
{
 height:24px;
 overflow:hidden;
 padding-left:3px;
 line-height:24px;
 background:#fff;
 cursor:default;
}
.gover_search .search_suggest li.hover {background:#ddd;}
    <%--6.4更改--%>
    .ZT-search{
    <%--width: 300px!important;--%>
    height: 3.71%!important;
    font-size: 14px!important;
    border-radius: 20px!important;
    background-color: #ffffff;
    box-shadow: 0 2px 2px rgba(0,0,0,0.4);
    padding-left: 60px!important;
    }
    .ZT-search-icon{
    width:16px!important;
    height:16px!important;
    position: absolute;
    right: 15px;
    z-index: 2;
    top: 10%;
    font-size: 2.0em;
    color: #fff;
    margin-top: 7px;
    }

    .fa-sitemap:before{
    font-size:24px;
    }
    /*修改提示文字的颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: red;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: red;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: red;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: red;
    }
    #input_search{
        padding:3% 20%!important;
    }
    .width100{width:100%;}
    
    .search_suggest ul li{
    list-style-type: none;
    height: 28px;
    line-height: 28px;
    padding-left: 10px;
    cursor:pointer;
    overflow: hidden;
    }
    
	.search_suggest ul li:hover {
    background-color: #eee;
	}
    </style>
<div class="input-group  input-group-lg width100">
	<input id="input_search" type="text" class="form-control cheight ZT-search" placeholder="请输入关键词搜索"
		aria-describedby="basic-addon2"> <span class="input-group-btn">
    <img onclick="search()" src="resources/imgs/search.png" class="ZT-search-icon left-area"/>
	</span>
</div>
	 <div class="search_suggest" id="gov_search_suggest" style="max-height: 300px ;background: rgb(255, 255, 255);
    border: 1px #d6d6d6 solid;  overflow: auto;display:none">
  			<ul id="searchContent" style="      margin-bottom: 0px;  padding-left: 3px;">
 		 	</ul>
 		</div>