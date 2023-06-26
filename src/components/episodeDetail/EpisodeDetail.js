import React,{ useEffect, useState }from "react";
import PodcastSideBar from "../podcastSideBar/PodcastSideBar";
import {Grid,Card,Typography,CardContent} from "@mui/material"
import  {useParams} from 'react-router-dom'

const EpisodeDetail =() =>{
  const [episode, setEpisode] = useState({})
  const {id} = useParams()
  const {episodeId} = useParams()
  const podcastList = JSON.parse(localStorage.getItem('top100')).entry
  const podcastId = id
  //const podcastInfo =localStorage.getItem(podcastId)
  useEffect(()=>{
   const podcastInfo = JSON.parse(localStorage.getItem(podcastId)).results
   setEpisode(podcastInfo.find(e => e.trackId === Number(episodeId)))
  },[]);
    return (
      <Grid sx={{ flexGrow: 1 }} container spacing={3}  style={{marginTop: '90px', paddingLeft : '20px',paddingRight : '20px'}}>
        <Grid item xs ={2}> 
        <PodcastSideBar podcastInfo={podcastList.find(podcast => podcast.id.attributes["im:id"] === id)}/>
        </Grid>
        <Grid sx={{ flexGrow: 1 }} spacing={9} xs ={10} item  container>
          <Grid sx={{ flexGrow: 1 }} xs ={11} item >
            <Card >
              <CardContent>
                <Typography align="left" gutterBottom variant="h4" component="div" style={{fontWeight:"bolder",marginTop:"10px"}}>
                  {episode.trackName}
                </Typography>
                <pre style={{whiteSpace:"pre-wrap"}}>
                <Typography>
                  <p>
                  {new String(episode.description)}
                  </p>
                </Typography>
                </pre>
                <audio controls style={{width:"-webkit-fill-available"}}>
                  <source src={episode.episodeUrl} type="audio/mpeg"/>
                  <source src="horse.ogg" type="audio/ogg"></source>
                </audio>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  export default EpisodeDetail