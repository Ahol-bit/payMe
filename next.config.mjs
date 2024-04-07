/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment out the 'images' key under the "experimental" section
  basePath: "/payMe",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
