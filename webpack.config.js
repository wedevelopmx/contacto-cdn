var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: {
     main: './src/js/bundles/main.js',
     utils: './src/js/bundles/utils.js',
     deputy: './src/js/bundles/deputy.js',
     attendance: './src/js/bundles/attendance.js',
     chamber: './src/js/bundles/chamber.js'
   },
   output: {
       path: path.resolve(__dirname, 'dist/js'),
       filename: "[name].bundle.js"
   },
   module: {
       rules: [
           {
               // test: /\.js$/,
               test: /\.js?$/,
               loader: 'babel-loader',
               exclude: ['/node_modules/'],
               query: {
                   presets: ['react', 'es2015', 'stage-0']
               }
           },
           {
              test: /\.(html)$/,
              use: {
                loader: 'html-loader',
                options: {
                  attrs: [':data-src']
                }
              }
          }
       ]
   },
   stats: {
       colors: true
   },
   devtool: 'source-map',
   resolve: {
     modules: [
        'node_modules',
        'node_modules/react-echarts-v3/src',
        path.resolve(__dirname, 'src/js/components'),
        path.resolve(__dirname, 'src/js/services'),
        path.resolve(__dirname, 'src/js/template')
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery", // Used for Bootstrap JavaScript components
        jQuery: "jquery", // Used for Bootstrap JavaScript components
        Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
      })
  ]
};
