import React from "react";
import { Card, CardContent, Grid, CardActionArea ,Typography,Avatar} from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'

const PodcastList =(data) =>{
    const podcastList = data.data
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={9}  style={{marginTop:'10px',marginBottom: '90px',paddingLeft : '20px',paddingRight : '20px'}}>
            {podcastList.map((podcast)=> 
            <Grid item xs ={3}>
                <Card >
                    <CardActionArea component={RouterLink} to={`/podcast/${podcast.id.attributes["im:id"]}`}>
                    <Avatar alt="avatarimage" src={podcast["im:image"][2].label} style={{width: 170,height: 170,margin: "auto"}} />
                        <CardContent>
                            <Typography align="center" gutterBottom variant="h6" component="div">
                                {podcast["im:name"].label}
                            </Typography>
                            <Typography align="center" variant="body2" color="text.secondary">
                                Author:{podcast["im:artist"].label}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>)}
        </Grid>
      
    );
  }
  export default PodcastList