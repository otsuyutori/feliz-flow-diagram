var path = require('path');
var webpack = require('webpack');
isProduction = process.env.NODE_ENV && process.env.NODE_ENV === 'Production';

console.log('Bundling for ' + (isProduction ? 'production' : 'development') + '...');

var CONFIG = {
    fsharpEntry: isProduction ? "./.fable/Index.js" : "./src/Client/.fable/Index.js",
    outputDir: isProduction ? './wwwroot' : './src/Client/public',
    devServerProxy: {
        '/api/*': {
          target: 'http://localhost:8085',
        }
    },
    babel: {
        presets: ["@babel/preset-env", "@babel/preset-react"]
    }
}

module.exports = {
    entry: {
        app:[resolve(CONFIG.fsharpEntry)]
    },
    output: {
        path: resolve(CONFIG.outputDir),
        filename: '[name].js'
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    plugins: isProduction ? [] : [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        host: '0.0.0.0',
        allowedHosts: ['localhost'],
        port: CONFIG.devServerPort,
        proxy: CONFIG.devServerProxy,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: {
                    loader: 'babel-loader',
                    options: CONFIG.babel
                }
            },
            {
                test: /\.css/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: { url: false }
                  }
                ]
            }
        ]
    },
    resolve: {
        // See https://github.com/fable-compiler/Fable/issues/1490
        symlinks: false,
        modules: [resolve("./node_modules")],
        alias: {
            'core-js/es6': 'core-js/es'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
    },
};

function resolve(filePath) {
    return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
}
