import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Error from '../Error/Error';
import api from '../../api';

const Resultats = () => {

    let slug = useParams();
    let cleanSearch = slug.slug.replace(/ /g, '');

    const [result, setResult] = useState(true);
    const [streamerInfo, setStreamerInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);
            console.log(result)
            if (result.data.data.length === 0) {
                setResult(false);
            } else {
                setStreamerInfo(result.data.data);
            }
        }
        fetchData();
    }, [cleanSearch]);

    return (

        result ?

        <div className='containerDecaleResultats'>
            <h4>Resultats de recherche</h4>
            {streamerInfo.map((stream, index) => (
                <div key={index} className="cardResultats">
                    <img src={stream.profile_image_url} alt="resultat profile" className="imgCard" />
                    <div className="cardBodyResult">
                        <h5 className="titleCardStream">{stream.display_name}</h5>
                        <div className="txtResult">
                            {stream.description}
                        </div>

                        <Link
                            className='lien'
                            to={{
                                pathname: `/live/${stream.login}`
                            }}
                        >
                            <div className="btnCard btnResult">Regarder {stream.display_name}</div>
                        </Link>
                    </div>
                </div>
            ))
            }
        </div >

        :

        <Error />   

    )
}

export default Resultats;
