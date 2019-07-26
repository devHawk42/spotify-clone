import { refreshToken } from './session';

const url = 'https://api.spotify.com/v1';

const endpoints = {
  userProfile: '/me',
  recentlyPlayed: '/me/player/recently-played?limit=50',
  search: query => `/search?type=album%2Cartist%2Cplaylist%2Ctrack%2Cshow_audio%2Cepisode_audio&q=${query}&decorate_restrictions=true&best_match=true&include_external=audio&limit=10&userless=false&market=from_token`,
  categories: '/browse/categories',
  newReleases: country => `/browse/new-releases?country=${country}&limit=10`,
  relatedArtists: seedId => `/artists/${seedId}/related-artists`,
  playlists: userId => `/users/${userId}/playlists`,
  savedTracks: '/me/tracks',
  savedAlbums: '/me/albums',
  savedArtists: '/me/following?type=artist&limit=20',
  getArtist: id => `/artists/${id}`,
  artistTopTracks: id => `/artists/${id}/top-tracks?country=AR`,
  artistAlbums: id => `/artists/${id}/albums?country=AR`,
};

async function makeRequest(endpoint) {
  const request = new Request(`${url + endpoint}`,
    {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }),
    });

  try {
    const resFetch = await fetch(request);
    const resJson = await resFetch.json();
    if (resJson.error && resJson.error.status === 401) {
      refreshToken();
    }
    return resJson;
  } catch (err) {
    console.log(err);
  }
}

export {
  makeRequest,
  endpoints,
};
