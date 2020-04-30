;(function(undefined) {
    "use strict";
    var _global;

    var config = {
        color : 'black',
        lineWidth: 2,
    };

    
    function myUtils() {};

    myUtils.prototype.init =function (id) {
        const canvas = document.getElementById(id);
        const map = canvas.getContext('2d');
        drawRect(map, 0,100,150,25, 'green', 2);
        drawRect(map, 100,100,150,25, 'green', 2);
        drawRect(map, 200,100,150,25, 'green', 2);
        drawRect(map, 300,100,150,25, 'green', 2);
    };
    
    // 矩形    
    function drawRect (map = getMap(), x, y, width, height, color = config.color, lineWidth = config.lineWidth) {
        if (!map) return;
        map.beginPath();
        map.lineWidth = lineWidth;
        map.strokeStyle = color;
        map.moveTo(x, y);
        map.lineTo(x + width, y);
        map.lineTo(x + width, y + height);
        map.lineTo(x, y + height);
        map.closePath();
        map.stroke();
    }



    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = myUtils;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return myUtils;});
    } else {

        !('myUtils' in _global) && (_global.myUtils = myUtils);
    }


})();