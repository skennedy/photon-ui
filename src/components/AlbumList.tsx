import React from "react";
import { Album } from "../api/dto/album";
import chunked from "../utils/chunked";
import AlbumCard from "./AlbumCard";

interface State {
  error: Error | null;
  isLoaded: boolean;
  albums: Album[];
}

export default class AlbumList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      albums: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/albums")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            albums: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, albums } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="album py-5 bg-light">
          <div className="container">
            {chunked(3)(albums).map(albumRow => (
              <div className="row">
                {albumRow.map(album => (
                  <div className="col-md-4">
                    <AlbumCard album={album} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
