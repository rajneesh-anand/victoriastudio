const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "https://sdalegal.vercel.app/" : "http://localhost:3000/";

module.exports = { 
  env: {
    PUBLIC_URL: "",
    baseUrl: assetPrefix,
  },

};