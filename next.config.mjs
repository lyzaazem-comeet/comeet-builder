const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Increase body size limit for large block data
    },
  },
}

export default nextConfig
