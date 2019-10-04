const packagejson = require('./package.json')
const path = require('path');
const production = process.env.NODE_ENV === 'production';
const webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    mode: production ? 'production' : 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mjsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        publicPath: "/devdata/",
        port: 9000
    },
    module: {
        rules: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
              }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          FRONTEND_ROUTE: production
            ? JSON.stringify(packagejson.applicationURL.production)
            : JSON.stringify(packagejson.applicationURL.development),
        }),
    ],
    externals: {
        jsonld: '{}',
        'node-fetch': 'fetch',
    },
}
