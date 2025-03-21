/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "picsum.photos",
      "loremflickr.com",
      "avatars.githubusercontent.com",
      "cdn.jsdelivr.net",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
