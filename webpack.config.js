const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');



module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    mode: 'none',
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test:/\.(svg|png|jpg|gif)$/,
                use:
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            context: path.resolve(__dirname, "public/"),
                            outputPath: 'images/',
                            publicPath: './images/',
                            useRelativePaths: true
                        },
                    },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './dist/css/',
                            reloadAll: true,
                        },
                    },
                    { loader: "css-loader" },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                }),
                            ],
                        },
                    },
                    { loader: "sass-loader" }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'main.css',}),
        new CleanWebpackPlugin(),
    ]
};