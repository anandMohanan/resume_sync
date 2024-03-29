/** @type {import('next').NextConfig} */
const nextConfig = {
     webpack: (config) => {
   config.resolve.alias.canvas = false;

   return config;
 },
images:{
domains: ["lh3.googleusercontent.com"]
}
};

export default nextConfig;
