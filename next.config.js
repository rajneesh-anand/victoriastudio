const isProd = process.env.NODE_ENV === "production";

const assetPrefix = isProd
  ? "https://victoria-five.vercel.app/"
  : "http://localhost:3000/";

const baseApiServer = isProd
  ? "https://nodappserver.herokuapp.com"
  : "http://localhost:8080";

module.exports = {
  env: {
    PUBLIC_URL: "",
    baseUrl: assetPrefix,
    API_SERVER: baseApiServer,
  },
};
