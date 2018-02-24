function MyPlugin() {
	this.chunkVersions = {}
}

MyPlugin.prototype.apply = function(compiler) {
	var self = this;
	compiler.plugin('emit', function(compilation, callback) {
		var changedChunks = compilation.chunks.filter(function(chunk) {
			var oldVersion = self.chunkVersions[chunk.name];
			self.chunkVersions[chunk.name] = chunk.hash;
			return chunk.hash !== oldVersion;
		});
		console.log(self.chunkVersions);
		callback()
	});
}


module.exports = MyPlugin;