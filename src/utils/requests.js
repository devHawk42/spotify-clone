import { refreshToken } from './session';

const url = 'https://api.spotify.com/v1/';

const endpoints = {
  recentlyPlayed: 'me/player/recently-played',
};

function makeRequest(endpoint) {
  const request = new Request(`${url + endpoint}`,
    {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }),
    });

  return fetch(request)
    .then(res => res.json())
    .then((res) => {
      if (res.error && res.error.status === 401) {
        refreshToken();
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  makeRequest,
  endpoints,
};
