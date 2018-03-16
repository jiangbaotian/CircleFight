// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       speedX:0,
	   speedY:0,
	   SPEED:200,
	   radius:60,
	   //适配
		winwidth:null,
		winheight:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
		 var actionrota = cc.rotateBy(cc.random0To1()*5, 350);
		 this.node.runAction(actionrota.repeatForever());
	 },

    start () {
		
		var winSize=cc.director.getWinSize();
		this.winwidth=winSize.width;
		this.winheight=winSize.height;
		this.speedX=-cc.random0To1()-1;
		this.speedY=-cc.random0To1()-1;
		this.SPEED*=cc.random0To1()+0.8;
    },

     update (dt) {
		  var x = this.node.getPosition().x;
            var y = this.node.getPosition().y;
            x += this.speedX * this.SPEED * dt;
            y += this.speedY * this.SPEED * dt;
			if (x < this.radius) {
                this.speedX = Math.abs(this.speedX);
            }
            if (y < this.radius) {
                this.speedY = Math.abs(this.speedY);
            }
            if (x > this.winwidth - this.radius) {
                this.speedX = -Math.abs(this.speedX);
            }
            if (y > this.winheight - this.radius) {
                this.speedY = -Math.abs(this.speedY);
            }
			this.node.setPosition(x, y);
		 
	 },
});
