import { Configuration } from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config: Configuration = {
  entry: {
    background: path.join(__dirname, 'src', 'background.ts'),
    app: path.join(__dirname, 'src/app'),
  },
  output: {
    // distディレクトリにcontent_scripts.jsを吐く
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // publicディレクトリにあるファイルをdistディレクトリにコピーする
    new CopyWebpackPlugin({ patterns: [{ from: 'src/public', to: '.' }] }),
  ],
};

export default config;
