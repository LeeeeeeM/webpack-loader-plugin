function MyAwesomePlugin() {
	this.connectPool = [];
}

MyAwesomePlugin.prototype = {
	apply: function(compiler) {
		this.initServer();
		console.log('hello ___________ world');
		compiler.plugin('compilation', this.injectScriptToBundle.bind(this));
		compiler.plugin('done', this.onBuildCompleted.bind(this));
	},
	injectScriptToBundle: function(compilation) {
		compilation.mainTemplate.plugin('startup', function(source) {
			console.log('inject to browser');
			return  this.buildScript() + source;
		}.bind(this));
	},
	onBuildCompleted: function(stats) {
		var detail = stats.toJson({
			errorDetails: false
		});
	},
	buildScript: function() {
		return [
			'',
			'',
			'// webpack-plugin-console-to-browser bootstrap',
			'(function() {',
			'if (typeof window == "undefined") return;',
			'var scriptDom = document.createElement("script");',
			'scriptDom.setAttribute("type", "text/javascript");',
			'scriptDom.setAttribute("src", "http://localhost:8099/1.js");',
			'document.body.appendChild(scriptDom);',
			'})()'
		].join('\n');
	},
	sockWrite: function(type, data) {
		var item = this.connectPool;
	},
	initServer: function() {
		var app = require('express')();
		var server = app.listen(8099, 'localhost');
		var WebSocketServer = require('ws').Server;
		var ws = new WebSocketServer({
		    port: 8092 //监听的端口
		    // verifyClient: socketverify //(可选)用于验证连接的函数
		});

		ws.on('connection', function(wsocket) {
			wsocket.on('message', function(event) {
				console.log(event);
			});
		    wsocket.on('close', function(event) {
		    	console.log(event); // 从connectPool删除
		    });
		    wsocket.on('error', function(err) {
		    	console.log(err);
		    });
		    wsocket.on('open', function(event) {
		    	console.log('open', event);
		    });
		});

		app.get('/1.js', function(req, res) {
			var fs = require('fs');
			var path = require('path');
			var script = fs.readFileSync(path.resolve(__dirname, '../1.js'));
			res.send(script);
			res.end();
		})
	}
}

module.exports = MyAwesomePlugin;