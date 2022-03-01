import './App.css';
import { 
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import AuthPage from './AuthPage';
import GamePage from './GamePage';
import SelectionPage from './SelectionPage';
import LeaderboardPage from './LeaderboardPage';
import About from './About';
// import SpotifyPlaylist from './SpotifyPlaylist';

import { useState, useEffect } from 'react';
import { logout } from './services/fetch-utils';



function App() {
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));





  return (
    <div className="App">
      <Router>
        <header>
          <button
            onClick={logout}
          >
            Log Out
          </button>
        </header>
        <Switch>
          <Route exact path='/selection'>
            {
              user
                ? <SelectionPage/>
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/game'>
            {
              user
                ? <GamePage/>
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/leaderboard'>
            {
              user
                ? <LeaderboardPage/>
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/about'>
            {
              user
                ? <About/>
                : <Redirect to='/' />
            }
          </Route>
          <Route exact path='/'>
            {
              user
                ? <Redirect to='/selection' />
                : <AuthPage
                  setUser={setUser}
                />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
