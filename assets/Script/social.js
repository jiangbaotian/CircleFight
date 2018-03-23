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
       avatarURL:null,
	   shareButton:cc.Node,
	   friends:null,
    },

     onLoad () {
		// this.shareButton.active=false;
		wx.showShareMenu();
		wx.onShareAppMessage(function () {
  // 用户点击了“转发”按钮
		
			cc.log("here");
		
		});
		var self=this;
		wx.login({
		success: function () {
			wx.getUserInfo({
			success:function(res){
				//cc.log(res.userInfo)
					self.avatarURL=res.userInfo.avatarUrl;
					//cc.log(self.avatarURL);
					}
		
		//fail: function (res) {
        // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
		//	if (res.errMsg.indexOf('auth deny') > -1 ||     res.errMsg.indexOf('auth denied') > -1 ) {
		//		cc.log("failed");
          // 处理用户拒绝授权的情况
       // }
				});
			}
		});
       // cc.log(wx.getFriendCloudStorage());
		
		 
 },
onshareButton:function(){
			wx.shareAppMessage({
  title: '转发标题'
});
			cc.log("down");
		},
    start () {

    },

    // update (dt) {},
});
