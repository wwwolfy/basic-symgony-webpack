const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require('./webpack.config');


module.exports = merge(common, {
    mode: 'development',

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin(),
        ],
    },

});