import Style from '../styles/Home.module.css'
import Head from 'next/head'
import axios from 'axios'
import { useState, useEffect } from 'react';

import ProfileGrid from './components/templates/ProfileGrid';
import Track from './components/molecules/Track';

export default function Home() {
  const [tracks, setTracks] = useState([])
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackLoadingError, setTrackLoadingError] = useState(false)
  
  useEffect(() =>{
    setTrackLoading(true)
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=3&user=nero_asterisk&api_key=5e81a94ee1bd10956d3073070a27dd1f&format=json`).then((res) => {
      setTracks(res.data.recenttracks.track)
      setTrackLoading(false)
    }).catch(() => {
      setTrackLoadingError(true)
      setTrackLoading(false)
    })
  }, [])
  return (
    <>
    <Head>
      <title>next-portfolio-with-lastfm-api</title>
    </Head>

    <div className={Style.container}>
      <ProfileGrid />
      
      <div className={Style.grid}>
        <h1>Recently played tracks</h1>
        <div className={Style.trackList}>
          {tracks.map((track) => {
            return(
              <Track
                key={track.name}
                src={track.image[2]["#text"]}
                name={track.name}
                artist={track.artist["#text"]}
              />
            )
          })}
        </div>
        
        {trackLoading && <p className={Style.trackStatus}>Loading...</p>}
        {trackLoadingError && <p className={Style.trackStatus}>Not found tracks</p>}
        
        <p className={Style.apiDescription}>The tracks are fetching from <a href="https://www.last.fm/ja/api">Last.fm API</a></p>
        
      </div>
    </div>
    </>
  )
}
