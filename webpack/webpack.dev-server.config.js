const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.base.config');

const port = '3000';
const host = '0.0.0.0';

const options = {
	contentBase: false,
	hot: true,
	host,
	historyApiFallback: true,
	quiet: false,
	disableHostCheck: true,
	watchOptions: {
		ignored: /node_modules/,
	},
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(port, host);
