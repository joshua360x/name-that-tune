import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './AuthPage';
import GamePage from './GamePage';
import SelectionPage from './SelectionPage.js';
import LeaderboardPage from './LeaderboardPage';
import About from './About';
import Profile from './Profile';
// import SpotifyPlaylist from './SpotifyPlaylist';

import { useState, useEffect } from 'react';

import { logout, fetchUserProfile } from './services/fetch-utils';

function App() {
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));
  const [token, setToken] = useState('');
  // const [joshFavSong, setJoshFavSong] = useState('');
  // const [gamePlaylists, setGamePlaylists] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const netlifyUrlToken = '/.netlify/functions/spotify-oauth';

  useEffect(() => {
    const getProfile = async () => {
      let profile;
      const user_id = JSON.parse(user);
      user_id
        ? (profile = await fetchUserProfile(user_id.currentSession.user.id))
        : (profile = null);
      // console.log(user_id);
      setUserProfile(profile);
    };
    getProfile();
  }, [user]);

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(netlifyUrlToken);
      const json = await response.json();
      setToken(json);
    };
    getToken();
  }, []);

  return (
    <div className="App" style={{ background: 'url(/background.jpeg)' }}>
      <Router>
        <header>
          {user && (
            <ul className="nav-list">
              <li>
                <NavLink className="link" to="/selection">
                  Selection
                </NavLink>
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </li>
              <li>
                <NavLink className="link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink className="link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink className="link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
          )}
        </header>
        <Switch>
          <Route exact path="/selection">
            {user ? <SelectionPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/game/:id/:name">
            {user ? <GamePage token={token} userProfile={userProfile} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/leaderboard">
            {user ? <LeaderboardPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/about">
            {user ? <About token={token} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile token={token} userProfile={userProfile} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {user ? <Redirect to="/selection" /> : <AuthPage setUser={setUser} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
