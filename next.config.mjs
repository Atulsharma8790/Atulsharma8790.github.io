/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk'],
    // Enables HTTPS in local dev: next dev --experimental-https
    // No cert setup needed — Next.js auto-generates a self-signed cert
  },
}

export default nextConfig
