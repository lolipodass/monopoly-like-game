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
            presets,
        }
    }
}



module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".json", ".ts", "jsx", "tsx"],
    },

    module:
    {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders(),
        },
        { test: /\.css$/i, use: 'css-loader' },
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
            // {
            //     loader: "babel-loader",
            //     options: {
            //         presets: [["@babel/preset-env",
            //             {
            //                 "useBuiltIns": "usage",
            //                 "corejs": "3.25.2"
            //             }],
            //         ["@babel/preset-react", { runtime: "automatic" }],
            //             "@babel/preset-typescript"]
            //     },

            // }
        },
        ],
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: "./src/index.html",
        }),
    new CleanWebpackPlugin(),
    ],
    target: "web",
    devtool: "eval-cheap-source-map",

    node: {
        __dirname: false,
    },
}


