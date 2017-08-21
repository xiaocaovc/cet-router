/**
 * Created by Center on 2017/3/31.
 */
var middleware = [];
var cetRouter ={
	route: function (){
		return async function (ctx,next) {
			for(var i = 0;i< middleware.length;i++){
				if(ctx.request.cmd == middleware[i].cmd){
					await middleware[i].func(ctx,next);
					return;
				}
			}
			let error = new Error("服务器找不到请求的资源");
			error.number = 404;
			throw error;
		};
	},
	use:function (cmd,func) {
		let route = {};
		route.cmd = cmd;
		route.func = func;
		middleware.push(route);
	}
};
module.exports = cetRouter;