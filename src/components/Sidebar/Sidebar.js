import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const Sidebar = () => {

    const [topStreams, setTopStreams] = useState([]);

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
                stream.truePic = "";
                stream.login = "";

                gamesNameArray.forEach(name => {
                    arrayUsers.forEach(user => {
                        if (stream.user_id === user.id && stream.game_id === name.id) {
                            stream.gameName = name.name;
                            stream.truePic = user.profile_image_url;
                            stream.login = user.login;
                        }
                    })
                });

                return stream;
            })
            setTopStreams(finalArray.slice(0, 6));
        }
        fetchData();
    }, []);

    // console.log(topStreams)


    return (
        <div className='sidebar'>
            <h2 className="titreSidebar">Chaînes recommandées</h2>
            <ul className="listStream">
                {topStreams.map((stream, index) => (
                    <Link
                        key={index}
                        className="lien"
                        to={{
                            pathname: `/live/${stream.login}`
                        }}
                    >
                        <li key={index} className="containerFlexSidebar">
                            <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
                            <div className="streamUser">{stream.user_name}</div>
                            <div className="viewerRight">
                                <div className="pointRouge"></div>
                                <div>{stream.viewer_count}</div>
                            </div>
                            <div className="gameNameSidebar">{stream.gameName}</div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
