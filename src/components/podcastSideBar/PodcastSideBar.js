import React from "react";
import { Card, CardContent, Divider, CardMedia ,Typography,Avatar, CardActionArea} from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'

const PodcastSideBar =(podcastInfo) =>{
    const podcast = podcastInfo.podcastInfo
    console.log(podcast);
    return (
        <Card style={{maxWidth:"400px",margin: "auto",marginBottom: "10px"}}>
                <CardActionArea component={RouterLink} to={`/podcast/${podcast.id.attributes["im:id"]}`}>
                    <CardMedia component="img" alt="avatarimage" image={podcast["im:image"][2].label} style={{width: 170,height: 170,margin: "auto",marginBottom: "10px"}} />
                    <Divider />
                    <CardContent>
                        <Typography align="left" gutterBottom variant="h6" component="div" style={{fontWeight:"bolder"}}>
                            {podcast["im:name"].label}
                        </Typography>
                        <Typography align="left" variant="body2" color="text.secondary" style={{fontStyle:"italic"}}>
                             Author:{podcast["im:artist"].label}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                    <Divider />
                    <CardContent>
                        <Typography align="left" gutterBottom variant="h9" component="div" style={{fontWeight:"bold"}}>
                            Description:
                        </Typography>
                        <Typography style={{whiteSpace:"pre-wrap"}}>
                            {podcast.summary.label}
                        </Typography>
                    </CardContent>
        </Card>
    );
  }
  export default PodcastSideBar