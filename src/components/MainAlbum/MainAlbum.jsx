import React, { Component } from 'react';
import { SingleArtist, ListedItems } from '../index';
import { makeRequest, endpoints } from '../../utils/requests';
import './MainAlbum.css';

class MainAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      id: '',
      type: '',
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getAlbumData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const newId = nextProps.match.params.id;
      return this.getAlbumData(newId);
    }
    return '';
  }

  async getAlbumData(newId) {
    const artistID = (newId) ? newId : this.props.match.params.id;
    const { items } = await makeRequest(endpoints.albumTracks(artistID));
    const {
      id, type, images, name,
    } = await makeRequest(endpoints.getAlbum(artistID));

    this.setState({
      songs: items,
      id: id,
      type: type,
      image: images[0].url,
      name: name,
    });
  }

  render() {
    const {
      songs, id, type, image, name,
    } = this.state;

    return (
      <div className="main-album">
        <div className="main-album-data">
          <SingleArtist id={id} type={type} url={image} name={name} />
        </div>
        <div className="main-album-songs">
          <ListedItems items={songs} />
        </div>
      </div>
    );
  }
}


export default MainAlbum;
