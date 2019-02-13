const webpack  = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
    mode: 'development',
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    module: {
        rules: webpackConfig.module.rules
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}