import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleArtist } from '../index';
import './Cards.css';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {
      title, data, selected, type,
    } = this.props;
    console.log(data)
    function artistInfo(artists) {
      const artistCollab = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < artists.length; i++) {
        artistCollab.push(artists[i].name);
      }
      return artistCollab.join(', ');
    }

    function imageURL(artist) {
      const imgDefault = 'https://i.scdn.co/image/2162dbfb7151c96801bf586475cb203c40a21910';
      if (type === 'recentlyPlayed') {
        return (artist.album.images && artist.album.images[0]) ? artist.album.images[0].url : imgDefault;
      }
      return (artist.images && artist.images[0]) ? artist.images[0].url : imgDefault;
    }

    return (
      <div className={(!data.length || (selected !== title && selected !== '')) ? 'artists-container' : 'artists-container'}>
        <div className="artists-header">
          <h1 className="artists-title"><a href="#search" className="artist-link">{title}</a></h1>
        </div>
        <div className="artists-wrapper">
          {data.map(artist => (
            <SingleArtist
              key={artist.id}
              id={artist.id}
              name={artist.name}
              artistInfo={(artist.artists) ? artistInfo(artist.artists) : ''}
              url={imageURL(artist)}
              type={artist.type}
            />
          ))}
        </div>
      </div>
    );
  }
}

Cards.defaultProps = {
  title: '',
  data: [],
  selected: '',
  type: '',
};

Cards.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.name,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        }),
      ),
    }),
  ),
  selected: PropTypes.string,
  type: PropTypes.string,
};


export default Cards;
