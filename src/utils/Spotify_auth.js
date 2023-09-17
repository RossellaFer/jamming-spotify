const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Spotify_auth = {
  generateEndpoint() {
    const endpoint = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private`;
    return endpoint;
  },

  authorizeApp() {
    const hash = window.location.hash;
    let tokenData = JSON.parse(window.localStorage.getItem("tokenData"));

    if (!tokenData && hash) {
      const tokenParams = hash.substring(1).split("&");
      const accessToken = tokenParams
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      const expiresIn = parseInt(
        tokenParams.find((elem) => elem.startsWith("expires_in")).split("=")[1]
      );

      // Calculate the expiration time in milliseconds
      const expirationTime = Date.now() + expiresIn * 1000;

      tokenData = { accessToken, expirationTime };

      window.location.hash = "";
      window.localStorage.setItem("tokenData", JSON.stringify(tokenData));
    }

    // Check if the token has expired
    if (tokenData && Date.now() >= tokenData.expirationTime) {
      // Token has expired, remove it
      window.localStorage.removeItem("tokenData");
      tokenData = null;
    }

    return tokenData ? tokenData.accessToken : null;
  },
};

export default Spotify_auth;
