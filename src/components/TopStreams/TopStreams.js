import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
const TopStreams = () => {

    const [channels, setChannels] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get("https://api.twitch.tv/helix/streams");
            let dataArray = result.data.data;
            // console.log(dataArray);

            let gameIDs = dataArray.map(stream => stream.game_id);
            let userIDs = dataArray.map(stream => stream.user_id);
            // console.log(userIDs, gameIDs);

            // création des urls personalisées
            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamsGames = "";
            let queryParamsUsers = "";

            gameIDs.map(id => queryParamsGames = queryParamsGames + `id=${id}&`);
            userIDs.map(id => queryParamsUsers = queryParamsUsers + `id=${id}&`);

            // URL final
            let urlFinalGames = baseUrlGames + queryParamsGames;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;
            // console.log(urlFinalGames, '\n', urlFinalUsers);

            // appels
            let gamesNames = await api.get(urlFinalGames);
            let getUsers = await api.get(urlFinalUsers);

            let gamesNameArray = gamesNames.data.data;
            let arrayUsers = getUsers.data.data;
            // console.log(arrayUsers, gamesNameArray)

            //création du tableau final
            let finalArray = dataArray.map(stream => {
                stream.gameName = "";
                stream.login = "";

                gamesNameArray.forEach(name => {
                    arrayUsers.forEach(user => {
                        if (stream.user_id === user.id && stream.game_id === name.id) {
                            stream.gameName = name.name;
                            stream.login = user.login;
                        }
                    })
                });

                let newUrl = stream.thumbnail_url
                    .replace("{width}", "320")
                    .replace("{height}", "180");
                stream.thumbnail_url = newUrl;

                return stream;
            })
            setChannels(finalArray);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="titleGames">Streams les plus populaires</h1>
            <div className="flexAccueil">
                {channels && channels.map((channel, index) => (
                    <div key={index} className="cardStream">
                        <img src={channel.thumbnail_url} alt="jeu" className="imgCard" />
                        <div className="cardBodyStream">
                            <h5 className="titleCardStream">{channel.user_name}</h5>
                            <p className="txtStream">Jeu : {channel.gameName}</p>
                            <p className="txtStream viewers">Viewers : {channel.viewer_count}</p>
                            <Link className='lien' to={{ pathname: `/live/${channel.login}` }}>
                                <div className="btnCard">Regarder {channel.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopStreams;
