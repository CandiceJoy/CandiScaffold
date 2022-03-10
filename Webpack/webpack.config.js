const paths = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Options
const srcDir = paths.join(__dirname, "src");
const distDir = paths.join(__dirname, "dist");
const dev = false; // Changes how webpack bundles things; use true for dev or false for production
const plugins = []; // Add any plugins here
const entryPoints = {"bundle": paths.join(srcDir, "index.tsx")/* ,"bundle2": paths.join(srcDir,"index2.tsx")*/}; // 'bundle' becomes the name of the bundle's output js file
const typescript = true;
const libs = ["node_modules"];
const react = true;
const pug = true; // Requires <srcDir>/index.pug
// End Options

const bundle = {
	mode   : dev ? "development" : "production",
	devtool: dev ? "source-map" : "eval",
	entry  : entryPoints,
	resolve: {
		modules   : libs,
		extensions: ['.js']
	},
	module : {
		rules: [{
			test   : /\.(css|scss)$/,
			use    : ["style-loader", "css-loader"],
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|jpeg|gif)$/i,
			use : {
				loader : "url-loader",
				options: {
					limit: 8192,
					name : "static/media/[name].[hash:8].[ext]"
				}
			}
		}, {
			test: /\.(mp3|svg)$/,
			use : ["file-loader"]
		}]
	},
	output : {
		filename: '[name].js',
		path    : distDir
	},
	plugins: (plugins.length > 0) ? plugins : []
};

if(pug)
{
	bundle.module.rules.push(
		{
			test: /\.pug$/,
			include: paths.join(__dirname, 'src'),
			use: [ "pug-loader" ]
		}
	);

	bundle.plugins.push(new HtmlWebpackPlugin({
		                                                                template : paths.join(srcDir,"index.pug"),
		                                                                inject   : true
	                                                                }));
}

if(typescript)
{
	bundle.module.rules.push({
		                         test   : /\.ts$/,
		                         use    : ["ts-loader"],
		                         exclude: /node_modules/
	                         });

	bundle.module.rules.push({
		                         test: /\.d\.ts$/,
		                         use : ["ignore-loader"]
	                         });

	bundle.resolve.extensions.push(".ts");
}

if(react)
{
	bundle.module.rules.push({
		                         test   : /\.(js|jsx)?$/,
		                         exclude: /node_modules/,
		                         use    : {
			                         loader : "babel-loader",
			                         options: {
				                         cacheDirectory  : true,
				                         cacheCompression: false,
				                         envName         : dev ? "development" : "production"
			                         }
		                         }
	                         });

	bundle.resolve.extensions.push(".jsx");
}

if(react && typescript)
{
	bundle.module.rules.push({
		                         test   : /\.(ts|tsx)?$/,
		                         exclude: /node_modules/,
		                         use    : [{
			                         loader : "babel-loader",
			                         options: {
				                         cacheDirectory  : true,
				                         cacheCompression: false,
				                         envName         : dev ? "development" : "production"
			                         }
		                         }]
	                         });

	bundle.resolve.extensions.push(".tsx");
}

console.log(JSON.stringify(bundle));

module.exports = bundle;