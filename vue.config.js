module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/todo-mvc-collab/" : "/",
  configureWebpack: {
    devServer: {
      https: true,
    },
  },
};
