import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import Live from './components/Live/Live';
import GameStreams from './components/GameStream/GameStreams';
import Resultats from './components/Resultats/Resultats';
import Error from './components/Error/Error';
import './App.css';

function App() {
    return (
        <Router forceRefresh>
            <div className="App">
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Games} />
                    <Route exact path="/top-streams" component={TopStreams} />
                    <Route exact path="/live/:slug" component={Live} />
                    <Route exact path="/game/:slug" component={GameStreams} />
                    <Route exact path="/resultats/:slug" component={Resultats} />
                    <Route exact path="/resultats/" component={Error} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
