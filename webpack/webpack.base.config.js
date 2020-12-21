const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};

	return config;
};

const filename = ext => `[name].${ext}`;

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: true,
				reloadAll: true,
			},
		},
		'css-loader',
	];

	if (extra) {
		loaders.push(extra);
	}

	return loaders;
};

const babelOptions = preset => {
	const opts = {
		presets: [
			'@babel/preset-env',
		],
		plugins: [
			'@babel/plugin-proposal-class-properties',
		],
	};

	if (preset) {
		opts.presets.push(preset);
	}

	return opts;
};

const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: babelOptions(),
	}];

	loaders.push('eslint-loader');

	return loaders;
};

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './public/index.html',
			minify: {
				collapseWhitespace: false,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	];

	return base;
};

module.exports = {
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './src/main/index.tsx'],
	},
	output: {
		filename: filename('js'),
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.ts', '.tsx', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			main: path.resolve(__dirname, '../src/main'),
			pages: path.resolve(__dirname, '../src/pages'),
			library: path.resolve(__dirname, '../src/library'),
			typings: path.resolve(__dirname, '../src/typings'),
			recourses: path.resolve(__dirname, '../src/recourses'),
		}
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		hot: true,
		historyApiFallback: true,
	},
	devtool: 'source-map',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // localIdentName: "[name]__[local]__[hash:base64:5]",
            },
          },
          {
            loader: "sass-loader",
            // options: {
            //   includePaths: [path.resolve(__dirname, "./src")],
            // },
          },
        ],
      },
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
			{
				test: /\.xml$/,
				use: ['xml-loader'],
			},
			{
				test: /\.csv$/,
				use: ['csv-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript'),
				},
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: { plugins: ['react-hot-loader/babel'] },
					},
					'ts-loader',
				],
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react'),
				}
			},
		],
	},
};