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
      console.log(res)
      if (res.error.status === 401) {
        // refresh token
        console.log('refresh token');
      }
      return res;
    })
    .catch((err) => {
      if (err.error.status == 401) {
        // refresh token
        console.log('refresh token');
      }
    });
}

export {
  makeRequest,
  endpoints,
};
