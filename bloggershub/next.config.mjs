/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "picsum.photos",
      "loremflickr.com",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
