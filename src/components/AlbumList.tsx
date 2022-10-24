import React from "react";
import { useAxios } from "../App";
import { Album } from "../api/dto/album";
import AlbumCard from "./AlbumCard";
import Grid from '@mui/material/Grid'

export default function AlbumList() {
  const [{ data: albums, loading, error }] = useAxios<Album[]>(
    "/albums"
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
        <Grid container spacing={2}>
        {albums && albums.map(album => (
          <Grid item md={4} sm={8}>
            <AlbumCard album={album} />
          </Grid>
        ))}
        </Grid>
    );
  }
}
