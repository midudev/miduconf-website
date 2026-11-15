/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    agentUpgrade: 'security'
  },
  async redirects() {
    return [
      {
        source: '/ticket/:path+',
        destination: '/',
        permanent: false
      }
    ]
  }
}

export default nextConfig
