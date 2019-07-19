import { refreshToken } from './session';

const url = 'https://api.spotify.com/v1/';

const endpoints = {
  recentlyPlayed: 'me/player/recently-played',
  search: query => `search?type=album%2Cartist%2Cplaylist%2Ctrack%2Cshow_audio%2Cepisode_audio&q=${query}&decorate_restrictions=true&best_match=true&include_external=audio&limit=10&userless=false&market=from_token`,
  categories: 'browse/categories',
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
