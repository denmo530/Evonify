/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "outstanding-parrot-865.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
