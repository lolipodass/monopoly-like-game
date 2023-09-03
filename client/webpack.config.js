/** @type {import('webpack').Configuration} */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const jsLoaders = (elem, elem2) => {

    const presets = [["@babel/preset-env",
        {
            "useBuiltIns": "usage",
            "corejs": "3.25.2"
        }]];
    if (elem)
        presets.push(elem);
    if (elem2)
        presets.push(elem2);
    return {
        loader: "babel-loader",
        options: {
            presets
        }
    }
}


module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".jsx", ".tsx"],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@css': path.resolve(__dirname, 'src/resources/css'),
            '@resources': path.resolve(__dirname, 'src/resources'),
        },

    },

    module:
    {
        rules: [{
            test: /\.m?js$/i,
            exclude: /node_modules/,
            use: jsLoaders(),
        },
        {
            test: /\.css$/i, use: ["style-loader", {
                loader: "css-loader",

            }]
        },
        {
            test: /\.ts$/i,
            exclude: /node_modules/,
            use: jsLoaders("@babel/preset-typescript")
        },
        {
            test: /\.jsx$/i,
            exclude: /node_modules/,
            use: jsLoaders(["@babel/preset-react", { runtime: "automatic" }])
        },
        {
            test: /\.tsx$/i,
            exclude: /node_modules/,
            use: jsLoaders(["@babel/preset-react", { runtime: "automatic" }], "@babel/preset-typescript")
        },
        {
            test: /\.png$/i,
            type: 'asset/resource'
        }
        ],
    },
    plugins: [new HtmlWebpackPlugin(
        {
            favicon: './src/resources/icons/favicon.svg',
            template: "./src/index.html",
        }),
    new CleanWebpackPlugin(),
    ],
    target: "web",
    devtool: "source-map",
    // devtool: "eval-cheap-source-map",
    node: {
        __dirname: false,
    },
}


