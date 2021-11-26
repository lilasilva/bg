(function(){

    var content = document.querySelector(".jd-content");
    var i = 0;
    
    var box = '';

    while(i < listModel.length){

        _img = listModel[i].img;
        _model = listModel[i].desc;

        box = '<li class="jd-item">\
                    <div class="box-image">\
                    <img src="'+_img+'" />\
                    </div>\
                    <span class="jd-desc">'+_model+'</span>\
                </li>';

        content.innerHTML += box;

        i++;
    }

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var arrObj = [],
        maxBall = 400,
        maxRadius = 40,
        minRadius = 5,
        mouse = {
            x: undefined,
            y: undefined
        },
        arrColor = [
            'rgba(255,255,255,.3)',
            'rgba(255,255,255,.1)',
            'rgba(255,255,255,.7)',
            'rgba(255,255,255,.5)',
            'rgba(255,255,255,.8)'
        ];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('mousemove', function(ev){
        mouse.x = ev.x;
        mouse.y = ev.y;
    });

    function itemObj(x, y, radius, vx, vy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.paint = arrColor[Math.floor(Math.random() * arrColor.length)];
        
        this.drawCircle = function (){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.paint;
            ctx.fill();
        }
        
        this.update = function (){
            if(this.x + this.radius > innerWidth || this.x + this.radius < 0){
                this.vx = -this.vx;
            }
            if(this.y + this.radius > innerHeight || this.y + this.radius < 0){
                this.vy = -this.vy;
            }
            
            this.x += this.vx;
            this.y += this.vy;
            
            if(mouse.x - this.x < maxRadius && mouse.x - this.x > -maxRadius && mouse.y - this.y < maxRadius && mouse.y - this.y > -maxRadius){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }
            }else if(this.radius > minRadius){
                this.radius -= 1;
            }
            
            this.drawCircle();
        }
    }

    function init(){
        arrObj = [];
        for(var i = 0; i < maxBall; i++){
            var radius = Math.random() * 50,
                x = Math.random() * (innerWidth - radius * 3) + radius,
                y = Math.random() * (innerHeight - radius * 3) + radius,
                vx = (Math.random() - 0.5),
                vy = (Math.random() - 0.5);
            arrObj.push(new itemObj(x, y, radius, vx, vy));
        }
    }

    function animate(){
        requestAnimationFrame(animate);
        
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for(var i = 0; i < arrObj.length; i++){
            arrObj[i].update();
        }
    }

    init();
    animate();


})();
