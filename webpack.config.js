const path = require('path');

module.exports = {
  entry: ["@babel/polyfill",'./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  mode:"production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    port: 3200,//webpack-dev-server ın çalışacağı port 
    static:{
      directory:path.join(__dirname,'bundles') //ana dosyalar için bakacağı dizin
    },
    hot:true //canlı çalışması için verilen parametre
  }
};