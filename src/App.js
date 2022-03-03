import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from './AuthPage';
import GamePage from './GamePage';
import Profile from './Profile';
import SelectionPage from './SelectionPage.js';
import LeaderboardPage from './LeaderboardPage';
import About from './About';
// import SpotifyPlaylist from './SpotifyPlaylist';

import { useState, useEffect } from 'react';
import { logout, fetchUserProfile } from './services/fetch-utils';

function App() {
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));
  const [token, setToken] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      let profile;
      const user_id = JSON.parse(user);
      user_id
        ? (profile = await fetchUserProfile(user_id.currentSession.user.id))
        : (profile = null);
      setUserProfile(profile);
    };
    getProfile();
  }, []);

  return (
    <div className="App">
      <Router>
        <header>
          <button onClick={logout}>Log Out</button>
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
          <Route exact path="/profile">
            {user ? <Profile userProfile={userProfile} token={token} /> : <Redirect to="/" />}
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
