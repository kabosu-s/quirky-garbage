module.exports = {
  pages: {
    top: {
      entry: 'src/entry-point/top/main.js', // エントリーポイントとなるjs
      template: 'public/index.html', // テンプレートのHTML
      filename: 'index.html', // build時に出力されるファイル名
    },
    lab: {
      entry: 'src/entry-point/lab/main.js',
      title: 'LAB',
      template: 'public/lab.html',
      filename: 'lab.html',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/sass/prepends.scss";',
      },
    },
  },
};
