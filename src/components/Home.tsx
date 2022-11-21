import React from 'react';
import AlbumList from "./AlbumList";
import NewUploadSession from "./NewUploadSession";

const Home: React.FC = () => {
    return <div>
        <section className="container">
            <h3>Albums</h3>
            <AlbumList/>
        </section>

        <section className="container">
            <h3>Upload</h3>
            <NewUploadSession/>
        </section>
    </div>;
}

export default Home;