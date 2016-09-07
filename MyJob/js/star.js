(function(){
  var can;
  var ctx;
  var w;
  var h;
  var num = 100;
  var s = [];
  var sTime;
  var times;
  var is = false;
  var life = 0;
  var starImg = new Image();

  function init() {
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    w = $("body").width();
    h = $("body").height();
    can.width = w;
    can.height = h;
    $("a.c").hover(function () {
      is = true;
      $(this).addClass("active").siblings().removeClass("active");
      $("header").fadeOut();
    }, function () {
      is = false;
      $("a.c").removeClass("active");
      $("header").fadeIn();
    })
    starImg.src = "img/line.png";
    for (var i = 0; i < num; i++) {
      var obj = new starObj();
      s.push(obj);
      s[i].init();
    }
    sTime = Date.now();
    loop();
  }

  function loop() {
    window.requestAnimationFrame(loop);
    var now = Date.now();
    times = now - sTime;
    sTime = now;
    drawBackground();
    drawStar();
    isLife();
  }

  function drawBackground() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
  }

  function drawStar() {
    for (var i = 0; i < num; i++) {
      s[i].update();
      s[i].draw();
    }
  }

  var starObj = function () {
    this.x;
    this.y;
    this.n;
    this.t;
    this.xS;
    this.yS;
  }

  starObj.prototype.update = function () {
    this.x += this.xS * times * 0.003;
    this.y += this.yS * times * 0.003;
    if (this.x < 0 || this.x > w) {
      this.init();
      return;
    }
    if (this.y < 0 || this.y > h) {
      this.init();
      return;
    }
    this.t += times;
    if (this.t > 100) {
      this.n++;
      this.n %= 7;
      this.t = 0;
    }
  }

  starObj.prototype.init = function () {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.n = Math.floor(Math.random() * 3);
    this.t = 0;
    this.xS = Math.random() * 7 - 3.5;//[-2.5, 3.5)
    this.yS = Math.random() * 7 - 3.5;
  }

  starObj.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = life;
    ctx.drawImage(starImg, this.n * 7, 0, 7, 7, this.x, this.y, 7, 7);
    ctx.restore();
  }

  function isLife() {
    if (is) {
      life += times * 0.0016;
      if (life > 1) {
        life = 1;
      }
    } else {
      life -= times * 0.0016;
      if (life < 0) {
        life = 0;
      }
    }
  }

  document.body.onload = init;
})();


