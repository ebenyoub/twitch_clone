import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../api';

const GameStreams = () => {

    let location = useLocation();
    let { slug } = useParams();
    slug = slug.replace(/%2F/g, '/')

    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
            let dataArray = result.data.data;
            let finalArray = dataArray.map(stream => {
                let newUrl = stream.thumbnail_url
                    .replace("{width}", "320")
                    .replace("{height}", "180");
                stream.thumbnail_url = newUrl;
                return stream;
            })

            //calcul du total des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);

            //création des urls personnalisés
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";
            let userIDs = dataArray.map(stream => stream.user_id);
            let queryParamsUsers = '';
            userIDs.map(id => queryParamsUsers = queryParamsUsers + `id=${id}&`);
            let finalUrl = baseUrlUsers + queryParamsUsers;

            let getUsersLogin = await api.get(finalUrl);
            let usersLoginArray = getUsersLogin.data.data;

            //création du tableau final
            finalArray = dataArray.map(stream => {
                stream.login = '';
                usersLoginArray.forEach(login => {
                    if (stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                });

                return stream;
            })

            setViewers(totalViewers);
            setStreamData(finalArray);
        }

        fetchData();

    }, [location]);

    return (
        <div>
            <h1 className='titleGameStreams'>Streams : {slug}</h1>
            <h3 className="subTitleGameStreams">
                <strong className="textColored">{viewers}</strong> personnes regardent {slug}
            </h3>
            <div className="flexAccueil">
                {streamData.map((stream, index) => (
                    <div key={index} className="cardGameStreams">
                        <img src={stream.thumbnail_url} alt="jeu carte img" className="imgCard" />
                        <div className="cardBodyGameStreams">
                            <h5 className="titleCardStream">{stream.user_name}</h5>
                            <p className="txtStream">Nombre de viewers : {stream.viewer_count}</p>

                            <Link 
                                className="lien"
                                to={{
                                    pathname : `/live/${stream.login}`
                                }}
                            >
                                <div className="btnCard">Regarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameStreams;
