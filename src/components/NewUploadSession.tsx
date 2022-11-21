import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import UserContext from "../services/UserContext";

const NewUploadSession: React.FC = () => {
    const currentUser = useContext(UserContext);
    const [{data: uploadId, loading, error}, executePost] = currentUser!.useAxios<string, { name: string }>(
        {
            url: `/upload-sources`,
            method: "POST"
        }, {
            manual: true,
        }
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        executePost({
            data: {name: (data.get('name') as string)}
        });
    };

    return (uploadId) ? <Navigate to={`/upload/${uploadId}`}/> : (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="name"
                        label="Session Name"
                        id="name"
                        autoFocus
                    />
                </Grid>

                {error && <Grid item xs={12}>
                    Something went wrong...
                </Grid>
                }
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={loading}
            >
                {loading ? "..." : "Start"}
            </Button>
        </Box>
    );
};

export default NewUploadSession;
