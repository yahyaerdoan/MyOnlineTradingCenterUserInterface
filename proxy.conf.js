const target =
  process.env['services__api__https__0'] ||
  process.env['services__api__http__0'] ||
  'https://localhost:7241';

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
  },
  '/products-hub': {
    target,
    secure: false,
    changeOrigin: true,
    ws: true,
  },
  '/orders-hub': {
    target,
    secure: false,
    changeOrigin: true,
    ws: true,
  },
};
