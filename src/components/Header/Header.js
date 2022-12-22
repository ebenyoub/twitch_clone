import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';
import croix from './Croix.svg';

const Header = () => {

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallSreen] = useState(false);
    const [searchInput, setSearch] = useState('');

    const toggleNavRes = () => {
        showMenu(!menu);
    }

    const hideMenu = () => {
        if (menu === true) {
            showMenu(!menu);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleKeyPress = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px)");
        // addListener est comme addEventListener pour les medias queries en JS
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, []);

    const handleMediaQueryChange = mediaQuery => {
        if (mediaQuery.matches) {
            setSmallSreen(true);
        } else {
            setSmallSreen(false);
        }
    }

    return (
        <div>
            <nav className="headerTop">
                {(menu || !smallScreen) && (

                    <ul className="listMenu">
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/">
                                <img src={logo} alt="logo twitch" className="logo" />
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/">
                                Top Games
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/top-streams">
                                Top Streams
                            </Link>
                        </li>
                        <li className="liensNav">
                            <form className="formSubmit" onSubmit={handleSubmit}>
                                <input value={searchInput} onChange={(e) => handleKeyPress(e)} type="text" className="inputRecherche" />
                                <Link
                                    className='lien'
                                    to={{
                                        pathname: `/resultats/${searchInput}`
                                    }}
                                >
                                    <button type='submit'>
                                        <img src={search} alt="icone loupe" className="logoLoupe" />
                                    </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                )}

            </nav>
            <div className="menuResBtn">
                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="icone menu responsive" className="menuIco" />
            </div>
        </div>
    );
}

export default Header;
