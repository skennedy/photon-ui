import React from "react";
import {Album} from "../api/dto/album";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface Props {
    album: Album;
}

const AlbumCard: React.FC<Props> = props => {
    return (
        <Card>
            <CardMedia
                component="img"
                width="140"
                height="140"
                image={`${props.album.coverPhotoBaseUrl}=w225-h225`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.album.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.album.itemCount} items
                </Typography>
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
