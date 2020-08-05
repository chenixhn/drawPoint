var d = 100;

function _distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) - d <= 0;
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 收集点
 * @param points [[99,234],[60,124],[88,157]]
 */
function retPoints(points) {
    var ret = {};
    var _points = copy(points);
    while (_points.length > 0) {
        var basePoint = _points.splice(0, 1)[0];
        var basePointStr = basePoint.toString();

        for (var j = 0; j < _points.length; j++) {
            var temp = copy(_points)[j];
            if (_distance(basePoint[0], basePoint[1], temp[0], temp[1])) {
                if (Array.isArray(ret[basePointStr])) {
                    ret[basePointStr].push(temp);
                } else {
                    ret[basePointStr] = [temp];
                }
                _points[j] = false;
            }
        }
        if (ret[basePointStr]) {
            if (ret[basePointStr].length < 2) {
                delete ret[basePointStr];
            } else {
                ret[basePointStr].push(basePoint);
            }
        } else {
            delete ret[basePointStr];
        }
        _points = _points.filter(Boolean);
    }
    return ret;
}

function random(limit) {
    return Math.round(Math.random() * limit);
}

function drawPoint(x, y, ctx) {
    ctx.fillStyle = "#ff1d50";
    ctx.beginPath();
    ctx.arc(x, y, 5, Math.PI * 2, 0, true);
    ctx.closePath();
    ctx.fill();
    ctx.font = "10px Verdana";
    ctx.fillText(`(${x},${y})`, x, y);
    points.push([x, y]);
}

function generateRadomPoints(canvas, count) {
    for (var i = 0; i < (count || 20); i++) {
        var x = random(canvas.width);
        var y = random(canvas.height);
        drawPoint(x, y, canvas.ctx);
    }
}

function d3Draw(p, context) {
    var pointsMap = retPoints(p);
    console.log(JSON.stringify(pointsMap));
    console.log(pointsMap)
    for (var key in pointsMap) {
        if (pointsMap.hasOwnProperty(key)) {
            var hull = d3_polygon.hull(pointsMap[key]);

            console.log(hull);
            context.beginPath();
            context.moveTo(hull[0][0], hull[0][1]);
            for (var i = 1, n = hull.length; i < n; ++i) {
                context.lineTo(hull[i][0], hull[i][1]);
            }
            context.closePath();
            // context.fillStyle = "rgba(0,0,0,0.3)";
            // context.fill();
            // context.lineWidth = 1;
            // context.lineJoin = "round";
            // context.strokeStyle = "steelblue";
            context.stroke();
        }
    }
}