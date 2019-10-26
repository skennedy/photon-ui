import React from "react";
import useAxios from "axios-hooks";
import { Album } from "../api/dto/album";
import chunked from "../utils/chunked";
import AlbumCard from "./AlbumCard";
import { Row, Col } from "react-materialize";

export default function AlbumList() {
  const [{ data: albums, loading, error }] = useAxios<Album[]>(
    "http://localhost:8080/albums"
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Row>
        {albums.map(album => (
          <Col m={4} s={8}>
            <AlbumCard album={album} />
          </Col>
        ))}
      </Row>
    );
  }
}
