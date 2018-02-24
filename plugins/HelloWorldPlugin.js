function HelloWorldPlugin(options) {
	console.log(options);
}

HelloWorldPlugin.prototype.apply = function(compiler) {

	compiler.plugin('compilation', function(compilation) {
		compilation.plugin('optimize', function() {
			console.log('assets are being optimized');
		});
	})

	compiler.plugin('done', function() {
		console.log('hello world');
	});

	compiler.plugin('emit', function(compilation, callback) {
		setTimeout(function() {
			console.log('done with async work ...');
			callback();
		}, 1000);
	})
}

module.exports = HelloWorldPlugin;