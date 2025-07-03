import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["_mongodb._tcp.cluster-bf.zqrbc.mongodb.net"],
  crossOrigin: "anonymous",
  /* config options here */
};

export default nextConfig;
