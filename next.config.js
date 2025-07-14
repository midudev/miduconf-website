/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ticket/:username',
        destination: '/?ticket=:username'
      },
      {
        source: '/ticket/:username/:hash',
        destination: '/?ticket=:username'
      }
    ]
  }
}

module.exports = nextConfig
