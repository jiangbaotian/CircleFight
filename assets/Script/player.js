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
        //parsys:cc.Prefab,
		parss:cc.Prefab,
		canvas:cc.Node,
		controller:cc.Node,
    },

  

    // onLoad () {},

    start () {
		//开启碰撞
		cc.director.getCollisionManager().enabled = true;
    },
	//碰撞检测
     onCollisionEnter: function (other) {
		
		if(other.node.name=='blue'){
			this.controller.getComponent('Game').GameOver();
		}
		if(other.node.name=='red'){
			
			this.controller.getComponent('Game').CircleProduce();
			//播放粒子(bug)
			//var par=cc.instantiate(this.parss);
			//par.parent=this.canvas;
			//par.setPosition(other.node.getPositionX(),other.node.getPositionY());
			
			other.node.destroy();
		}
	},
    // update (dt) {},
});
