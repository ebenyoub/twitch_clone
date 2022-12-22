import React, { useState, useEffect } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';
import api from '../../api';

const Live = () => {

    let { slug } = useParams();
    console.log(slug)

    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);

    useEffect(() => {


        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);
            // console.log(result)

            if (result.data.data.length === 0) {
                setInfoStream(false);
            } else {
                let gameID = result.data.data.map(gameid => gameid.game_id);
                // console.log(gameID)

                const resultNameGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`);
                // console.log('res', resultNameGame)

                let nomJeu = resultNameGame.data.data.map(gameName => gameName.name);
                // console.log(nameGame)

                
                setInfoGame(nomJeu);
                setInfoStream(result.data.data[0]);

            }
        }
        
        fetchData();

    }, [slug]);

    return (

        infoStream ?

        <div className='containerDecale'>
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="titleStream txtStream">{infoStream.title}</div>
                <div className="viewer">Viewers : {infoStream.viewer_count}</div>
                <div className="infoGame txtStream">Streamer : {infoStream.user_name}, &nbsp; Langue : {infoStream.language}</div>
                <div className="nameGame txtStream">Jeu : {infoGame}</div>
            </div>
        </div>

        :

        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
            <div className="contInfo">
                <div className="titreStream">Le Streamer est offline ! </div>
            </div>
        </div>
    )



}

export default Live;
