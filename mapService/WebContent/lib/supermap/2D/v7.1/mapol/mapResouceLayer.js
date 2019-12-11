var _pointLayer, _lineLayer, _markerLayer,_surfaceLayer;
var vectorRoundLayer;
function getResouceLayer(type){
	switch(type){
	case "point":
		 return window._pointLayer;
	case "line":
		return window._lineLayer;
	case "surface":
		return window._surfaceLayer;
	case "marker":
		return window._markerLayer;
	case "pathMarker":
		return window._pathMarker;
	}
}
function setResouceLayer(layer,type){
	switch(type){
	case "point":
		window._pointLayer = layer;
		break;
	case "line":
		window._lineLayer = layer;
		break;
	case "surface":
		window._surfaceLayer = layer;
		break;
	case "marker":
		window._markerLayer = layer;
		break;
	case "pathMarker":
		window._pathMarker = layer;
		break;
	}
}