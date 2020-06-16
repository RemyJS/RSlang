module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/typography.scss";
          @import "@/styles/base.scss";
        `,
      },
    },
  },

  productionSourceMap: false,
};
