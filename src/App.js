import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './AuthPage';
import GamePage from './GamePage';
import SelectionPage from './SelectionPage.js';
import LeaderboardPage from './LeaderboardPage';
import About from './About';
// import SpotifyPlaylist from './SpotifyPlaylist';

import { useState, useEffect } from 'react';
import { logout, fetchUserProfile } from './services/fetch-utils'; 

function App() {
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));
  const [token, setToken] = useState('');
  // const [gamePlaylists, setGamePlaylists] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <div className="App" style={{ background: 'url(/background.jpeg)' }}>
      <Router>
        <header>
          { user &&
          <ul className='nav-list'>
            <li>
              <NavLink to='/selection'>Selection</NavLink>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            <li>
              <NavLink to='/leaderboard'>Leaderboard</NavLink>
            </li>
          </ul>
          }
        </header>
        <Switch>
          <Route exact path="/selection">
            {user ? <SelectionPage setToken={setToken} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/game/:id">
            {user ? <GamePage token={token} userProfile={userProfile} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/leaderboard">
            {user ? <LeaderboardPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/about">
            {user ? <About /> : <Redirect to="/" />}
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
