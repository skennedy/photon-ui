import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import AlbumList from "./components/AlbumList";

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
    </div>
  );
};

export default App;
