import { useState, useEffect, useRef } from 'react';
import WaveVisualizer from './wavevisulizer';
import './App.css';



function NavBar({onClick}) {

  return  (
    <>
      <div className="navbar" style={{display: 'flex'}}>

        <div style={{position: 'relative', left: 20}}>
          <img src="src/logo.png" alt='display' className='logo'></img>
        </div>

        <div id='home' onClick={onClick} className="homediv" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', left: 390}}>
          <img src='src/home.png' alt='display' className='home'></img>
        </div>

        <div className="searcbox" style={{display:'flex', alignItems: 'center', position: 'relative', left: 420}}>
          <div className='searchdiv' style={{alignContent: 'center'}}>
            <img src='src/search.png'  className="searchicon"></img>
          </div>
          <input type='search' placeholder='What do you want to play?' className="search"></input>
        </div>

        <div style={{position: 'relative', left: 820, marginTop: 3}}>
          <img src='src/notification.png' className="notification"></img>
        </div>

        <div className="accountLogo" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className='accounttext'>
            <div style={{color: 'black', fontWeight: 'bold', fontFamily: 'sans-serif'}}>S</div>
          </div>
        </div>

      </div>
    </>
  )
}

function Home(){

  return (
    <>
      <div style={{color: 'white', fontFamily: 'sans-serif', filter: 'brightness(1.5)', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '50vh',  height: '50vh', backgroundColor: '#000000', marginTop: '120px', borderRadius: '80px'}}>
        <div style={{marginBottom: '16px', fontSize: '20px'}}>No song is playing !</div>
        <div style={{color: 'gray', fontSize: '12px'}}>Click any song to play</div>
      </div>
    </>
  )
}


function SongBox({onClick, songurl, songname, singername}){

  return (
    <>
      <div className='songselect' onClick={onClick}>
          <img src={songurl} className='framemine'></img>
          <div className='songname'>
            <div style={{fontSize: 14}}>{songname}</div>
            <div style={{fontSize: 12, color: 'gray'}}>{singername}</div>
          </div>
      </div>
    </>
  )
}

function SongFrame({songurl, songname, singername}){

    return (
      <>
        <div>
          <img src={songurl} className='playingframeimage'></img>
          <div style={{color: 'white', fontFamily: 'sans-serif', fontSize: '20px', marginTop: '5px', width: '350px'}}>{songname}</div>
          <div style={{color: 'gray', fontFamily: 'sans-serif', fontSize: '12px', marginTop: '2px'}}>{singername}</div>
        </div>
      </>
    )
}


function SingerDetail({src, songname, singername, singerimage, singerdetail}) {

  return (
    <>
      <div>
        <video className='videoclass' src={src} autoPlay muted loop ></video>
      </div>
      <div style={{zIndex: 1, position: 'relative', bottom: '80px', marginLeft: '10px'}} >
        <div className='detailsong'>{songname}</div>
        <div className='detailsongsinger'>{singername}</div>
      </div>
      <img src={singerimage} className='detailimage'></img>
      <div style={{zIndex: 2, position: 'relative', bottom: '120px', width: '320px', height: '0px', color: 'white', backgroundColor: 'black', marginLeft: '18px'}}>
        <div style={{backgroundColor: '#535353', fontFamily: 'sans-serif', fontSize: '15px', textAlign: 'left', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
          <div style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '15px', marginLeft: '10px', position: 'relative', top: '10px'}}>{singername}</div>
          <div style={{color: '#b3b3b3', marginLeft: '10px', marginTop: '20px', fontWeight: '500'}}>{singerdetail}</div>
        </div>
      </div>
    </>
  )
}



function App() {
  
  const [play, setplay] = useState(' ');
  const [isloop, setisloop] = useState(false)
  const [songplay, setsongplay] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const songplayhandle = (url) => {
    setsongplay(url);
  }

  const audioRef = useRef(new Audio()); // Single audio object
  const audio = audioRef.current;
  const playaudio = (url) => {
    
    if(url !== null){
      // If the same audio is playing, pause it
      if (url === songplay && !audio.paused) {
        audio.pause();
      } else {
        audio.src = url;
        audio.load();
        audio.play();
      }
    }
    else{
      audio.pause();
    }
  }

  const handleplay = (playvalue) => {
    setplay(playvalue);
  }

  useEffect(() => {
    handleplay(' ');
    songplayhandle(null);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    }
  }, [])

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changeVolume = (e) => {
    const newvolume = parseFloat(e.target.value);
    audioRef.current.volume = newvolume;
  }

  const loopaudio = () => {
    if(isloop){
      audio.loop = false;
    }
    else{
      audio.loop = true
    }
  }

  return (
    <> 
      <NavBar 
        onClick={() => {
          handleplay(' ');
          songplayhandle(null);
          playaudio(songplay);
        }}
      />
      <div style={{display: 'flex'}}>
        <div style={{width: '45vh', height: '90vh', backgroundColor: '#1F1F1F', marginLeft: 15, borderRadius: 20}}>
          <div style={{color: 'white', fontFamily: 'sans-serif', marginLeft: 20, marginTop: 20, fontWeight: 'bold'}}>
          Your Songs
          </div>
          <input type='search' placeholder='search..' className='searchsmall'></input>
          <div className='scroll-box' style={{overflow: 'auto', height: '75vh', marginTop: '10px', width: '40vh'}}>
            <SongBox 
              onClick={() => {
                handleplay('akari');
                songplayhandle('src/songs/akari.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/akari.jpg'
              songname='Akari'
              singername='Soushi Sakiyama'
            />
            <SongBox 
              onClick={() => {
                handleplay('akuma no ko');
                songplayhandle('src/songs/akuma no ko.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/akuma no ko.jpeg'
              songname='Akuma no ko'
              singername='Ai Higuchi'
            />
            <SongBox 
              onClick={() => {
                handleplay('bliss');
                songplayhandle('src/songs/bliss.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/bliss.jpeg'
              songname='Bliss'
              singername='Milet'
            />
            <SongBox 
              onClick={() => {
                handleplay('gods');
                songplayhandle('src/songs/gods.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/gods.webp'
              songname='GODS'
              singername='League of Legends'
            />
            <SongBox 
              onClick={() => {
                handleplay('limbo');
                songplayhandle('src/songs/limbo.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/limbo.jpeg'
              songname='Limbo'
              singername='Freddie Dredd'
            />
            <SongBox 
              onClick={() => {
                handleplay('nightcall');
                songplayhandle('src/songs/nightcall.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/nightcall.jpeg'
              songname='NightCall'
              singername='Kavinsky'
            />
            <SongBox 
              onClick={() => {
                handleplay('something in the way');
                songplayhandle('src/songs/Something In The Way.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/something in the way.jpeg'
              songname='Something in the way'
              singername='Nirvana'
            />
            <SongBox 
              onClick={() =>  {
                handleplay('take me to the beach');
                songplayhandle('src/songs/take me to the beach.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/take me to the beach.jpeg'
              songname='Take me to the beach'
              singername='Imagine Dragons, Ado'
            />
            <SongBox 
              onClick={() => {
                handleplay('to you from 2000 year ago');
                songplayhandle('src/songs/from you 2000 or 20000.. year ago.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/to you from 2000 year ago.jpeg'
              songname='Nisen-nen... Moshiku wa... Niman-nen-go no Kimi e...'
              singername='Linked Horizon'
            />
            <SongBox 
              onClick={() => {
                handleplay('warriors');
                songplayhandle('src/songs/Warriors.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/warriors.jpeg'
              songname='Warriors'
              singername='League of Legends'
            />
            <SongBox 
              onClick={() => {
                handleplay('king');
                songplayhandle('src/songs/you can be king again.mp3');
                playaudio(songplay);
              }}
              songurl='src/song frames/you can be king again.jpeg'
              songname='You can be king again'
              singername='Lauren Aquillina'
            />
          </div>
        </div>
        <div style={{width: '89vh', height: '90vh', backgroundColor: '#1F1F1F', marginLeft: 15, borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {play === ' ' && <Home />}

          {(play === 'akari') && <SongFrame 
            songurl='src/song frames/akari.jpg'
            songname='Akari'
            singername='Soushi Sakiyama'
          />}
          
          {play === 'akuma no ko' && <SongFrame 
            songurl="src/song frames/akuma no ko.jpeg"
            songname='Akuma no ko'
            singername='Ai Higuchi'
          />}

          {play === 'bliss' && <SongFrame 
            songurl='src/song frames/bliss.jpeg'
            songname='Bliss'
            singername='Milet'
          />}

          {play === 'gods' && <SongFrame 
            songurl='src/song frames/gods.webp'
            songname='GODS'
            singername='League of Legends'
          />}

          {play === 'limbo' && <SongFrame 
            songurl='src/song frames/limbo.jpeg'
            songname='Limbo'
            singername='Freddie Dredd'
          />}

          {play === 'nightcall' && <SongFrame 
            songurl='src/song frames/nightcall.jpeg'
            songname='NightCall'
            singername='Kavinsky'
          />}

          {play === 'something in the way' && <SongFrame 
            songurl='src/song frames/something in the way.jpeg'
            songname='Something in the way'
            singername='Nirvana'
          />}

          {play === 'take me to the beach' && <SongFrame 
            songurl='src/song frames/take me to the beach.jpeg'
            songname='Take me to the beach'
            singername='Imagine Dragons, Ado'
          />}

          {play === 'to you from 2000 year ago' && <SongFrame 
            songurl='src/song frames/to you from 2000 year ago.jpeg'
            songname='Nisen-nen... Moshiku wa...'
            singername='Linked Horizon'
          />}

          {play === 'warriors' && <SongFrame 
            songurl='src/song frames/warriors.jpeg'
            songname='Warriors'
            singername='League of Legends'
          />}

          {play === 'king' && <SongFrame 
            songurl='src/song frames/you can be king again.jpeg'
            songname='You can be king again'
            singername='Lauren Aquillina'
          />}

          {play !== ' ' && 
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{width: '75vh', height: '6vh', backgroundColor: 'black', marginTop: '20px', borderRadius: '50px', display: 'flex',  justifyContent: 'flex-start', alignItems: 'center'}}>
                <input
                type='range'
                min='0.0'
                max='1.0'
                step='0.05'
                onChange={changeVolume}
                className='volumeslider'
                ></input>

                <input 
                type='range'
                min='0'
                max={duration}
                step='0.1'
                value={currentTime}
                onChange={handleSeek} 
                className='customislider'></input>

                <div onClick={() => {
                  setisloop(!isloop)
                  loopaudio();
                  
                }} style={{color: 'white', marginLeft: '105px', cursor: 'pointer'}}>
                  {isloop ? '↳/↰' : '↳ ↰'}
                </div>
              </div>
              <button className='playbutton' onClick={() => {
                if(audio.paused){
                  audio.play();
                }
                else{
                  audio.pause();
                }
              }}>
                {audio.paused ? '▶' : '❚❚' }
              </button>
            </div>
          }
          
          <WaveVisualizer audioRef={audioRef} />
        </div>
        <div className='scroll-box' style={{width: '45vh', height: '90vh', backgroundColor: '#1F1F1F', marginLeft: 15,  display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
          {play === 'akari' && <SingerDetail 
            src='src/song clips/akari.mp4'
            songname="Akari"
            singername='Soushi Sakiyama'
            singerimage='src/singer profile/akari singer.jpg'
            singerdetail='Born in 2002, Soushi Sakiyama is an intriguing singer/songwriter of abundant energy, extraordinary musical senses, and one-of-a-kind verbalism.'
          />}

          {play === 'akuma no ko' && <SingerDetail 
            src='src/song clips/akuma no ko.mp4'
            songname="Akuma no ko"
            singername='Ai Higuchi'
            singerimage='src/singer profile/akuma no ko singer.avif'
            singerdetail='Ai Higuchi was born on 28 November 1989 in Japan. She is an actress and composer, known for Subete Wasurete Shimau kara (2022), Attack on Titan (2013) and A long dream (2023).'
          />}

          {play === 'bliss' && <SingerDetail 
            src='src/song clips/bliss.mp4'
            songname="Bliss"
            singername='Milet'
            singerimage='src/singer profile/bliss singer.webp'
            singerdetail='milet is a Japanese singer signed to SMEJ. She made her major debut in 2019 with Inside You EP. The EP peaked at number 16 on the Oricon Albums Chart. After releasing five EPs, she released first studio album Eyes in 2020.'
          />}

          {play === 'gods' && <SingerDetail 
            src='src/song clips/gods.mp4'
            songname="Gods"
            singername='League of Legends'
            singerimage='src/singer profile/gods singer.jpeg'
            singerdetail="League of Legends, commonly referred to as League, is a multiplayer online battle arena video game developed and published by Riot Games. Inspired by Defense of the Ancients, a custom map for Warcraft III, Riot's founders sought to develop a stand-alone game in the same genre."
          />}

          {play === 'limbo' && <SingerDetail 
            src='src/song clips/limbo.mp4'
            songname="Limbo"
            singername='Freddie Dredd'
            singerimage='src/singer profile/limbo singer.jpeg'
            singerdetail="Ryan Mitchel Chassels, known professionally as Freddie Dredd, is a Canadian rapper, singer, producer and songwriter. He gained prominence on TikTok with several viral songs including 'GTG', 'Opaul', 'Limbo' and 'Cha Cha'."
          />}

          {play === 'nightcall' && <SingerDetail 
            src='src/song clips/nightcall.mp4'
            songname="NightCall"
            singername='Kavinsky'
            singerimage='src/singer profile/nightcall singer.jpeg'
            singerdetail="Vincent Belorgey, known professionally as Kavinsky, is a French musician, producer, DJ, and actor. His production style is reminiscent of the electropop film soundtracks of the 1980s."
          />}

          {play === 'something in the way' && <SingerDetail 
            src='src/song clips/something in the way.mp4'
            songname="Something in the Way"
            singername='Nirvana'
            singerimage='src/singer profile/something in the way singer.jpeg'
            singerdetail="Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers, most notably Chad Channing, before recruiting Dave Grohl in 1990."
          />}

          {play === 'take me to the beach' && <SingerDetail 
            src='src/song clips/take me to the beach.mp4'
            songname="Take Me To The Beach"
            singername='Imagine Dragons, Ado'
            singerimage='src/singer profile/take me to the beach singer.jpeg'
            singerdetail="Imagine Dragons are an American pop rock band formed in 2008, based in Las Vegas, Nevada. The band currently consists of lead singer Dan Reynolds, guitarist Wayne Sermon, and bassist Ben McKee."
          />}

          {play === 'warriors' && <SingerDetail 
            src='src/song clips/warriors.mp4'
            songname="Warriors"
            singername='League of Legends'
            singerimage='src/singer profile/gods singer.jpeg'
            singerdetail="League of Legends, commonly referred to as League, is a multiplayer online battle arena video game developed and published by Riot Games. Inspired by Defense of the Ancients, a custom map for Warcraft III, Riot's founders sought to develop a stand-alone game in the same genre."
          />}

          {play === 'king' && <SingerDetail 
            src='src/song clips/king.mp4'
            songname="You can be king again"
            singername='Lauren Aquilina'
            singerimage='src/singer profile/king singer.jpeg'
            singerdetail="Lauren Amber Aquilina is an English singer-songwriter, and musician. Born in Bristol, she gained popularity by independently releasing a trilogy of EPs whilst studying at school. Her debut album Isn't It Strange? was released on 26 August 2016, after being signed with Island Records and Universal Music Group."
          />}
        </div>
      </div>
    </>
  )
}



export default App
