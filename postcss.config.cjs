module.exports = {
  plugins: [
    require('autoprefixer'),
    {
      postcssPlugin: true,
      Declaration: {
        'font-display': (node) => {
          if (node.parent.name === 'font-face' && node.parent.type === 'atrule')
            node.value = 'optional'
        },
      },
    },
  ],
}
