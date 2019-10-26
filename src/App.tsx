import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import AlbumList from "./components/AlbumList";
import Dropzone from "./components/Dropzone";

const App: React.FC = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Photon</h1>
      </header>

      <section className="container">
        <h3>Albums</h3>
        <AlbumList />
      </section>

      <section className="container">
        <h3>Upload</h3>
        <Dropzone />
      </section>
    </div>
  );
};

export default App;
