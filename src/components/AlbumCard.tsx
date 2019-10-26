import React from "react";
import { Album } from "../api/dto/album";

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = props => {
  return (
    <div className="card mb-4 shadow-sm">
      <img
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        src={`${props.album.coverPhotoBaseUrl}=w225-h225`}
        alt="cover"
      />
      <div className="card-body">
        <h5 className="card-title">{props.album.title}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <a
              href={props.album.googlePhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary"
            >
              View
            </a>
            <a
              href={props.album.downloadUrl}
              className="btn btn-sm btn-outline-secondary"
            >
              Download
            </a>
          </div>
          <small className="text-muted">{props.album.itemCount} items</small>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
