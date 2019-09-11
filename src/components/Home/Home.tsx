import React, { useEffect, useState, FC } from 'react';
import { Categories, Cards, Genres } from '../index';
import { endpoints, makeRequest } from '../../utils/requests';
import './Home.css';

interface CategorieInterface {
  items: [];
};

/* interface RecentlyPlayedInterface {
  title: string;
}; */

interface RelatedArtistInterface {
  seedName: string;
  artists: any;
};

const Home: FC = () => {
  const [categories, setCategories] = useState<CategorieInterface>({
    items: [],
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [relatedArtist, setRelatedArtist] = useState<RelatedArtistInterface>({
    seedName: '',
    artists: [],
  });
  const [newReleases, setNewReleases] = useState<any>([]);
  const [selectedCategorie, selectCategorie] = useState<string>('featured');

  async function getRelatedArtists(recently) {
    const artistSeed = recently[0].artists[0];
    const related = {
      seedId: artistSeed.id,
      seedName: artistSeed.name,
      artists: [],
    };
    const {artists} = await makeRequest(endpoints.relatedArtists(related.seedId));
    related.artists = artists;
    setRelatedArtist(related);
  };

  function getRecentlyPlayedArtists(recentlyPlayed) {
    const artistsFiltered = Array.from(new Set(recentlyPlayed.map(a => a.track.artists[0].id)))
      .map(id => recentlyPlayed.find(a => a.track.artists[0].id === id));

    const recentlyPlayedFiltered = artistsFiltered.map(artist => artist.track);
    setRecentlyPlayed(recentlyPlayedFiltered);
    getRelatedArtists(recentlyPlayedFiltered);
  };

  useEffect(() => {
    //async declarations
    async function getCategories(){
      const rsp = await makeRequest(endpoints.categories);
      setCategories(rsp.categories);
    };

    async function getRecentlyPlayed(){
      const recentlyPlayed = await makeRequest(endpoints.recentlyPlayed);
      getRecentlyPlayedArtists(recentlyPlayed.items);
    }
    
    async function getNewReleases(){
      const userProfile = await makeRequest(endpoints.userProfile);
      const newReleases = await makeRequest(endpoints.newReleases(userProfile.country));
      setNewReleases(newReleases.albums);
    }
    
    //async calls
    getCategories();
    getRecentlyPlayed();
    getNewReleases();
  }, [])

  const tabCategories = ['featured', 'genres & moods', 'new releases'];

  return (
    <div className="main-view">

      <Categories
        categories={tabCategories}
        onClick={e => selectCategorie(e)}
        selected={selectedCategorie}
      />

      <div className="main-container">
        {(selectedCategorie === 'featured') ? (
          <Cards
            title="Recently played"
            data={recentlyPlayed}
            selected={selectedCategorie}
            type="recentlyPlayed"
          />
        ) : ''}

       {(selectedCategorie === 'featured') ? (
          <Cards
            title={`Related to ${relatedArtist.seedName}`}
            data={relatedArtist.artists}
            selected={selectedCategorie}
          />
        ) : ''}

        {(selectedCategorie === 'genres & moods') ? (
          <Genres
          title="genres & moods"
          data={categories.items}
          selected={selectedCategorie}
          />
        ) : ''}

      </div>

      {(selectedCategorie === 'new releases') ? (
          <Cards
            title="New albums & singles"
            data={newReleases.items}
            selected={selectedCategorie}
          />
        ) : ''}
    </div>
  );
}


export default Home;
