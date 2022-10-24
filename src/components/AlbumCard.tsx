import React from "react";
import {Album} from "../api/dto/album";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';

interface Props {
    album: Album;
}

const AlbumCard: React.FC<Props> = props => {
    return (
        <Card>
            <CardContent>
                <CardHeader image={`${props.album.coverPhotoBaseUrl}=w225-h225`}>
                    {props.album.title}
                </CardHeader>
                {props.album.itemCount} items
            </CardContent>
            <CardActions>
                <Link href={props.album.googlePhotosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View
                </Link>
                <Link href={props.album.downloadUrl}>Download</Link>
            </CardActions>
        </Card>
    );
};

export default AlbumCard;
