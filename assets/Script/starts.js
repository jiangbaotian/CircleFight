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
      blueprefab:cc.Prefab,
	  redprefab:cc.Prefab,
	  enemyscreen:cc.Node,
	  randx:0,
	  },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		
    },
     StartMenuShow:function(){
		for (i = 0; i < 15; i ++) {
		var bluec=cc.instantiate(this.blueprefab);
		bluec.parent=this.enemyscreen;
		this.randx=cc.random0To1()*500;
		bluec.setPosition(1110-this.randx,1980);
		}
		for (i = 0; i < 10; i ++) {
		var redc=cc.instantiate(this.redprefab);
		redc.parent=this.enemyscreen;
		this.randx=cc.random0To1()*500;
		redc.setPosition(1110-this.randx,1980);
		}
	},
    // update (dt) {},
});
