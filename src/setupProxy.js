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

  app.use(
    createProxyMiddleware("/gift_log", {
      target: live,
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/room_status_list.json", {
      target: 'https://campaign.showroom-live.com/akb48_sr/data',
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/summary_ranking", {
      target: live,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/next_live", {
      target: room,
      changeOrigin: true,
    })
  )
};