<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="panel-group" id="legend" role="tablist" aria-multiselectable="true">
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#legend" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="collapsed">
             <%--<i class="fa fa-circle-o" style="color:#2d15e6;"></i>--%>
              <img src="resources/imgs/left-bottom-one.png"/>常规项目
            </a>
          </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne" aria-expanded="true">
          <div class="panel-body" id="usual_cutline">
          <ul style="list-style:none;padding:0px;">
          <li style="line-height: 24px;cursor:pointer;text-align:right;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#6060f7;"></span>新开项目</li>
          <li style="line-height: 24px;cursor:pointer;text-align:right;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#3def3d;"></span>竣工项目</li>
          <li style="line-height: 24px;cursor:pointer;text-align:right;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#f15e5e;"></span>已销售项目</li>
          </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingTwo">
          <h4 class="panel-title">
            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#legend" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <i class="fa fa-bell" style="color:#f34da7;"></i>库存预警
            </a>
          </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" aria-expanded="false" style="height: 0px;">
          <div class="panel-body" id="repertory_cutline">
          <ul style="list-style:none;padding:0px;">
          <li style="line-height: 24px;cursor:pointer;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#6060f7;"></span>库存>5万㎡或>5亿</li>
          <li style="line-height: 24px;cursor:pointer;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#3def3d;"></span>库存>10万㎡或>10亿</li>
          <li style="line-height: 24px;cursor:pointer;"><span style="display:inline-block;width:32px;vertical-align: middle;height:14px;margin:0px 6px;background:#f15e5e;"></span>库存>20万㎡或>20亿</li>
          </ul>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingThree">
          <h4 class="panel-title">
            <a class="" role="button" data-toggle="collapse" data-parent="#legend" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <i class="fa fa-warning"></i>进度预警
            </a>
          </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" aria-expanded="false" style="height: 0px;">
          <div class="panel-body" id="plan_cutline"></div>
        </div>
      </div>
    </div>