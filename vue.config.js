const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	// baseUrl: "./",
	publicPath: "./",
	productionSourceMap: false,
	lintOnSave: false,
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src"))
	},
	devServer: {
		open: true, //配置自动启动浏览器
	},
};
