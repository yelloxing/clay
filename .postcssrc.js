module.exports = {
    plugins: {
      "autoprefixer": {
        "Browserslist": [

          // 全球统计有超过1%的使用率使用
          '> 1%',

          // 主流浏览器最近2个版本
          'last 2 versions',

          // 针对浏览器设置
          'android >= 2.3',
          'ios >= 8',
          'not ie <= 8',
          'Firefox >= 20'
        ]
      }
    }
  }
