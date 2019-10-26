import React from "react";
import { Album } from "../api/dto/album";
import { Card, CardTitle } from "react-materialize";

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = props => {
  return (
    <Card
      header={
        <CardTitle image={`${props.album.coverPhotoBaseUrl}=w225-h225`}>
          {props.album.title}
        </CardTitle>
      }
      actions={[
        <a
          href={props.album.googlePhotosUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>,
        <a href={props.album.downloadUrl}>Download</a>
      ]}
    >
      {props.album.itemCount} items
    </Card>
  );
};

export default AlbumCard;
