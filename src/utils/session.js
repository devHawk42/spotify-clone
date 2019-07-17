const url = 'https://accounts.spotify.com/en/authorize?client_id=f9320783b71849f0b8d963c4c9e8982d&scope=user-follow-read%20user-read-recently-played%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-collaborative%20streaming%20user-library-read%20user-read-private%20user-read-email&response_type=token&redirect_uri=http:%2F%2Flocalhost:8080%2F%23%2F';

function parseToken() {
  const r = /([^&=]+)/g;
  const accessToken = window.location.hash.match(r)[1];
  localStorage.setItem('accessToken', accessToken);
}

function refreshToken() {
  window.location.href = url;
  parseToken();
}

function setToken() {
  const token = localStorage.getItem('accessToken');
  if (!token || token === 'undefined') {
    window.location.href = url;
    parseToken();
  }
}

export {
  setToken,
  refreshToken,
};
