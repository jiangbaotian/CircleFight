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
		//游戏状态
       isStart:false,
	   isPaused:false,
	   isOver:false,
	   isInit:false,
	   
		//触摸移动状态
		isTouch:false,
	   //屏幕显示
	   playerscreen:cc.Node,
	   StartScreen:cc.Node,
	   GuidScreen:cc.Node,
	   GameoverScreen:cc.Node,
	   PauseScreen:cc.Node,
	   //控制分数
	   scoreLabel:cc.Label,
	   score:0,
	   highscoreLabel:cc.Label,
	   highscore:0,
	   //控制节点
	   player:cc.Node,
	    GameUI:cc.Node,
		cccScreen:cc.Node,//1110 1960
		highscoretip:cc.Node,
		tips:cc.Label,
		//适配
		winwidth:null,
		winheight:null,
		//圆圈预制体
		blueprefab:cc.Prefab,
		redprefab:cc.Prefab,
		//计时器
		timer:null,
		tipstimer:null,
		//精灵图片
		playerSprite:cc.Sprite,
		overFrame:cc.SpriteFrame,
		meFrame:cc.SpriteFrame,
		//其他
		randx:null,
		diff:1,
		gameoverLabelAni:cc.Animation,
    },
    onLoad:function(){
		this.player.active=false;
		//注册触摸事件
		var self=this;
		this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event){
			if(self.isStart==true&&!self.isOver)
			{
				var position=event.touch.getLocation();
				var delta=event.touch.getDelta();
				self.PlayerMove(delta.x,delta.y,position.x,position.y);
			}
		});
	},
    start () {
		//适配
		var winSize=cc.director.getWinSize();
		this.winwidth=winSize.width;
		this.winheight=winSize.height;
		this.GameUI.setPosition(this.winwidth/2-100,this.winheight-250);
		//cc.log(winSize.width,winSize.height);
		
		//关闭屏幕
		cc._initDebugSetting(cc.DebugMode.INFO);
		this.highscoretip.active=false;
		this.GameUI.active=false;
		this.GuidScreen.active=false;
		this.PauseScreen.active=false;
		this.GameoverScreen.active=false;
		this.StartScreen.active=true;
		
		
		//注册触摸事件
		
	 },
	 
	 //屏幕控制
	OnStartButton:function(){
		this.player.active=true;
		if(cc.sys.localStorage.getItem('highscore')){
		this.highscore=cc.sys.localStorage.getItem('highscore');
		this.highscoretip.active=true;
		this.highscoreLabel.string=this.highscore;
		}
		//cc.log(cc.sys.localStorage.getItem('highscore'));
		this.GuidScreen.active=true;
		this.StartScreen.active=false;
	},
	OnGameStart:function(){
		//初始化 生成小球
		
		for (i = 0; i < 15; i ++) {
		var bluec=cc.instantiate(this.blueprefab);
		bluec.parent=this.cccScreen;
		this.randx=cc.random0To1()*500;
		bluec.setPosition(1110-this.randx,1980);
		}
		for (i = 0; i < 10; i ++) {
		var redc=cc.instantiate(this.redprefab);
		redc.parent=this.cccScreen;
		this.randx=cc.random0To1()*500;
		redc.setPosition(1110-this.randx,1980);
		}
		
		this.score=0;
		this.scoreLabel.string=this.score;
		this.isStart=true;
		this.GameUI.active=true;
		this.GuidScreen.active=false;
	},
	
	//重新开始游戏
	resumeGame:function(){
		cc.director.resume();
		this.isOver=false;
		this.isStart=false;
		//重置主角图像
		this.playerSprite.spriteFrame=this.meFrame;
		this.player.setPosition(this.winwidth/2,this.winheight/2);
		this.player.scale=1;

		this.GuidScreen.active=true;
		this.GameoverScreen.active=false;
		this.cccScreen.removeAllChildren();
		
		
	},
	//游戏结束
	GameOver:function(){
		this.isOver=true;
		cc.director.pause();
		this.player.scale=2;
		this.playerSprite.spriteFrame=this.overFrame;
		this.gameoverLabelAni.play();
		
		//最高分 本地缓存
		this.highscoretip.active=true;
		this.score=this.scoreLabel.string;
		if(this.score>this.highscore){
		this.highscore=this.score;
		this.highscoreLabel.string=this.highscore;
		cc.sys.localStorage.setItem('highscore',this.highscore);
		}
		this.GameoverScreen.active=true;
	
	},
	//得分之后圈圈生成
	CircleProduce:function(){
		this.scoreLabel.string++;
		var redc=cc.instantiate(this.redprefab);
		redc.parent=this.cccScreen;
		this.randx=cc.random0To1()*500;
		redc.setPosition(1110-this.randx,1980);
	},
	//人物移动
	PlayerMove:function(deltaX,deltaY,posX,posY){
		var position=this.player.getPosition();
		this.player.setPosition(position.x+deltaX,position.y+deltaY);
		//范围控制
		if(position.x>this.winwidth)
			this.player.setPosition(this.winwidth,position.y);
		if(position.x<0)
			this.player.setPosition(0,position.y);
		if(position.y>this.winheight)
			this.player.setPosition(position.x,this.winheight);
		if(position.y<0)
			this.player.setPosition(position.x,0);
		//显示提示
		if(posX<position.x+100&&posX>position.x-100&&posY<position.y+100&&posY>position.y-100){
			this.tipstimer++;
		}
		
	},
     update (dt) {
		 //蓝色小球生成
		if(this.timer>this.diff&&this.isStart==true){
			var bluec=cc.instantiate(this.blueprefab);
		bluec.parent=this.cccScreen;
		this.randx=cc.random0To1()*500;
		bluec.setPosition(1110-this.randx,1980);
			this.timer=0;
		}
		 this.timer+=dt;
		
		//提示语
		 if(this.tipstimer>100){	
		 this.tipstimer=0;
		 this.tips.node.active=true;
		 this.tips.string='提示：你的手指可以不用放在圆圈上，拖动屏幕任意位置均可移动'
		 this.tips.node.getComponent(cc.Animation).play();
		 }
		 
		 
	 },
	 
});
