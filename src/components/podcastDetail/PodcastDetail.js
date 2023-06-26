import React,{ useEffect, useState }from "react";
import testInfo from "./testInfo.json"
import PodcastSideBar from "../podcastSideBar/PodcastSideBar";
import {Grid,Card,Typography,CardContent} from "@mui/material"
import DataTable from "./DataTable";
import  {useParams} from 'react-router-dom'

const PodcastDetail =() =>{
  const [episodes, setEspisodes] = useState([])
  const podcastList = JSON.parse(localStorage.getItem('top100')).entry
  const {id} = useParams()
  const podcastId = id
  
  useEffect(()=>{
    const podcastInfo =localStorage.getItem(podcastId)
    const podcastAsObject = JSON.parse(podcastInfo)
    const todayDate = new Date().getTime();
    console.log(podcastInfo);
    if(podcastInfo === null){
      fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
        })
      .then(data => {
        setEspisodes(data)
        console.log(data);
        data.results[0].updateDate = new Date()
        localStorage.setItem(podcastId,JSON.stringify(data))
      });
    }else if(todayDate - new Date(podcastAsObject.results[0].updateDate).getTime() > 86400000 ){
      fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
        })
      .then(data => {
        setEspisodes(data)
        data.results[0].updateDate = new Date()
        localStorage.setItem(podcastId,JSON.stringify(data))
      });
    }else{
      setEspisodes(JSON.parse(podcastInfo)); 
    }
    
  },[]);

    return (
      <Grid sx={{ flexGrow: 1 }} container spacing={3}  style={{marginTop: '90px',paddingLeft : '20px',paddingRight : '20px'}}>
        <Grid item xs ={2}> 
        <PodcastSideBar podcastInfo={podcastList.find(podcast => podcast.id.attributes["im:id"] === id)}/>
        </Grid>
        <Grid spacing={3} xs ={10} item  container>
          <Grid sx={{ flexGrow: 1 }} xs ={11} item >
            <Card >
              <CardContent>
                <Typography align="left" gutterBottom variant="h4" component="div" style={{fontWeight:"bolder",marginTop:"10px"}}>
                  Episodes:{episodes.resultCount -1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ flexGrow: 1 }} xs ={11} item>
            <Card >
              <CardContent>
              <DataTable episodesList={episodes}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  export default PodcastDetail