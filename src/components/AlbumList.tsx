import React from "react";
import useAxios from "axios-hooks";
import { Album } from "../api/dto/album";
import chunked from "../utils/chunked";
import AlbumCard from "./AlbumCard";

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
