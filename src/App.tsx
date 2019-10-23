import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AlbumList from "./components/AlbumList";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Photon</h1>
      </header>
      <AlbumList />
    </div>
  );
};

export default App;
