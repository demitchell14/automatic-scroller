const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // context: __dirname,
    entry: "./src/index.js",
    // entry: {
    //     main: "./src/index.js",
    // },
    mode: "development",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "js/[name]-[contenthash].js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 3005
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /(node_modules|dist|public_html)/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass", ".html"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: path.join(__dirname, "dist", "index.html"),
            inject: "body"
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 10000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm-${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    }
};
