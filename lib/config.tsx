if (!process.env.NEXT_PUBLIC_BASE_URL) throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
if (!process.env.NEXT_PUBLIC_SECRET_KEY) throw new Error('NEXT_PUBLIC_SECRET_KEY is not defined');
const CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY
};

export default CONFIG;
