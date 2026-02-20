// /** @type {import('next').NextConfig} */
// const nextConfig = {

//   reactStrictMode: false,
//   productionBrowserSourceMaps: false,


//     images: {
//     domains: ["http://192.168.1.50:3001", "192.168.1.50:3001", "192.168.1.50:3001"],
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "192.168.1.50:3001",
//         pathname: "/",
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {

//         source: "/api/:path*",
//         destination: "http://192.168.1.50:3001/api/:path", // note /api here
//       },
//     ];
//   },
// };

// export default nextConfig;

//---------------------------------------- proxy add Code ----------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,

  images: {
    domains: ["rest.healthsquare.in"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rest.healthsquare.in",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://rest.healthsquare.in/api/:path*",
      },
    ];
  },
};

export default nextConfig;
