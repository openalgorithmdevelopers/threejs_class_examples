const path = require('path')

module.exports = {
    // entry: './src/client/client.ts',
    //entry: './src/client/displacement_map.ts',
    //entry: './src/client/texture_example.ts',
    entry: './src/client/externalModel.ts',
    // entry: './src/client/dualCamera.ts',
    // entry: './src/client/physics.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}