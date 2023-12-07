/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;