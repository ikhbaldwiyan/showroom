const { createProxyMiddleware } = require('http-proxy-middleware');

const live = 'https://www.showroom-live.com/api/live';
const room = 'https://www.showroom-live.com/api/room';

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/profile", {
      target: room,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/streaming_url", {
      target: live,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/telop", {
      target: live,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/comment_log", {
      target: live,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/stage_user_list", {
      target: live,
      changeOrigin: true,
    }),
  );
};