function DrawCanvas() {
    var kedu = 100;
    var canvas = document.createElement('canvas');
    var width = 1500;
    var height = 800;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;


    // 画坐标轴中的两条线
    ctx.font = "30px Verdana";
    ctx.beginPath();
    // x 轴
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.fillText("x", width - 20, 20);
    // y 轴
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.fillText("y", 10, height - 10);
    ctx.stroke();

    // x 轴箭头
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width - 10, 10)
    ctx.stroke();

    // y 轴箭头
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(10, height - 10)
    ctx.stroke();

    // x 刻度
    ctx.beginPath();
    for (var i = 0; i < width; i++) {
        if (i % kedu === 0) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 5)
        }
    }
    ctx.stroke();

    // y 刻度
    ctx.beginPath();
    for (var i = 0; i < height; i++) {
        if (i % kedu === 0) {
            ctx.moveTo(0, i);
            ctx.lineTo(5, i)
        }
    }
    ctx.stroke();

    // k=1
    /*ctx.beginPath();
    ctx.moveTo(0, 0);
    for (var i = 0; i < width; i++) {
        ctx.lineTo(i, i);
    }
    ctx.stroke();*/

    setTimeout(function () {
        document.getElementById('kedu').innerHTML = kedu;
    }, 500)
}

function DrawPoints(c) {
    var ctx = c.ctx;
    var canvas = c.canvas;
    canvas.onmouseup = function (e) {
        var x = e.pageX;
        var y = e.pageY;
        drawPoint(x, y, ctx);
    }
}