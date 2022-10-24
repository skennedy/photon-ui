import React from 'react';
import AlbumList from "./AlbumList";
import Dropzone from "./Dropzone";

const Home: React.FC = () => {
    return <div>
        <section className="container">
            <h3>Albums</h3>
            <AlbumList/>
        </section>

        <section className="container">
            <h3>Upload</h3>
            <Dropzone/>
        </section>
    </div>;
}

export default Home;