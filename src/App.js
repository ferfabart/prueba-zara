import './App.css';
import React, { useEffect, useState }from "react";
import {AppBar,TextField,Toolbar,Box,Chip} from '@mui/material';
import  {Link, Route, Routes} from 'react-router-dom'
import EpisodeDetail from './components/episodeDetail/EpisodeDetail';
import PodcastDetail from './components/podcastDetail/PodcastDetail';
import PodcastList from './components/podcastList/PodcastList';
import { useLocation } from "react-router-dom";

function App() {

  const [data, setData] = useState([])
  const [hasLoaded, setHasLoaded] = useState();
  const [search, setSearch] = useState("")

  useEffect(()=>{
    setHasLoaded(false)
    const top100 =localStorage.getItem('top100')
    const updateDate =new Date(JSON.parse(top100).updated.label).getTime();
    const todayDate = new Date().getTime();
    if( top100=== undefined){
      fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
        .then(response => response.json())
        .then(data => {setData(data.feed.entry); setHasLoaded(true); localStorage.setItem('top100',JSON.stringify((data.feed)))})
    }else if(todayDate - updateDate > 86400000 ){
      fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
      .then(response => response.json())
      .then(data => {setData(data.feed.entry); setHasLoaded(true); localStorage.setItem('top100',JSON.stringify((data.feed)))})
    }else{
      setData(JSON.parse(top100).entry); 
      setHasLoaded(true)
    }
  },[]);

  const filterData = (data,search)=>{
    let filteredPodcasts =[]
    if(search === ""){
      filteredPodcasts= data
    }
     data.map(podcast => {
      if(podcast["im:name"].label.toLowerCase().includes(search.toLowerCase())){
        if(!filteredPodcasts.find(filteredPodcast =>filteredPodcast["im:name"].label=== podcast["im:name"].label))
          filteredPodcasts.push(podcast)

      } else if(podcast["im:artist"].label.toLowerCase().includes(search.toLowerCase())){
        if(!filteredPodcasts.find(filteredPodcast =>filteredPodcast["im:artist"].label === podcast["im:artist"].label))
          filteredPodcasts.push(podcast)
      }

    })
    return filteredPodcasts
  }

  return (
  <div className='App'>
    <React.Fragment>
        <AppBar position="fixed" color="transparent">
          <Toolbar><Link to="/" style={{color: "black",textDecorationColor:"none",fontWeight:"bolder",textDecoration:"none", fontSize:"40px"}}> Podcaster</Link></Toolbar>
        </AppBar>
      </React.Fragment>

      {useLocation().pathname === "/" ?
       <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{display:"flex", justifyContent:"flex-end",paddingRight:"20px"}}>
        <Chip label={filterData(data,search).length}/>
        <TextField 
          sx={{width: "300px"}}  
          id="standard-basic" 
          size='small'
          label="Filter"
          variant="outlined"
          style={{marginTop:"80px",marginLeft:"10px"}}
          onChange= {event=>setSearch(event.target.value)}
              />
       </Box>
       : <></>}
      <Routes>
        {hasLoaded && <Route path ='/' element ={<PodcastList props data={filterData(data,search)}/>}/>}
        <Route path ='/podcast/:id' element ={<PodcastDetail/>}/>
        <Route path ='/podcast/:id/episode/:episodeId'element ={<EpisodeDetail/>}/>
      </Routes>

  </div>
  );
}

export default App;
