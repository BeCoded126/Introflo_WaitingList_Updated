/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow cross-origin requests from local network for mobile testing
  // Remove unsupported experimental flags that trigger warnings
  async redirects() {
    return [
      // Redirect root to waitlist page
      { source: '/', destination: '/waitlist', permanent: false },
    ];
  },
};

module.exports = nextConfig;
