import React from 'react';
import './Home.css';

function Home() {
  /* function getArtist() {
    const request = new Request('https://api.spotify.com/v1/me/albums', {
      headers: new Headers({
        'Authorization': 'Bearer ' + this.props.token
      })
    });

    fetch(request).then(res => {
      return res.json();
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  } */

  return (
    <div className="main-view" />
  );
}


export default Home;
