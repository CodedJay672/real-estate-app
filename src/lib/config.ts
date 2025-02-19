const config = {
  env: {
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT_URL!,
    databaseUrl: process.env.DATABASE_URL!,
    prodEndpoint: process.env.NEXT_PUBLIC_PROD_ENDPOINT!,
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_API_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
  },
};

export default config;
