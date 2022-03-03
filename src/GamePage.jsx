import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { insertLeaderBoard } from './services/fetch-utils';

export default function GamePage({ token, userProfile }) {
  console.log(userProfile);
  const netlifyUrl = '/.netlify/functions/spotify-playlist-items';
  const [tracks, setTracks] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [tracksShuffled, setTracksShufffled] = useState([]);
  const [counter, setCounter] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(30);
  const [timer, setTimer] = useState('');
  const [availablePoints, setAvailablePoints] = useState(100);
  const [pointsTimer, setPointsTimer] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const params = useParams();

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  useEffect(() => {
    if (tracks) {
      let trackShuffled = [...tracks];
      shuffleArray(trackShuffled);
      setTracksShufffled(trackShuffled);
    }
  }, [tracks]);

  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      const response = await fetch(`${netlifyUrl}?token=${token}&playlist_id=${params.id}`);
      const json = await response.json();
      setTracks(json.data.items);
    }
    fetchPlayListsFromSpotify();
  }, [token, params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsGameStarted(false);
    if (userGuess === tracks[counter].track.id) {
      setIsCorrectGuess(true);
      setTotalPoints(totalPoints + availablePoints);
    } else {
      setIsCorrectGuess(false);
    }
    setCounter(counter + 1);

    setCountDownSeconds(30);
    setAvailablePoints(100);
    counter + 1 === tracks.length &&
      (await insertLeaderBoard({
        username: userProfile.username,
        user_id: userProfile.user_id,
        score: totalPoints,
        rounds: tracks.length,
      }));
  }

  function handleStartGame() {
    setIsGameStarted(true);
    setTimer(setInterval(decrementAndDisplayTimer, 1000));

    setPointsTimer(setInterval(decrementPoints, 5000));
  }

  function decrementAndDisplayTimer() {
    setCountDownSeconds((countDownSeconds) => countDownSeconds - 1);
  }

  function decrementPoints() {
    setAvailablePoints((availablePoints) => availablePoints - 10);
  }

  useEffect(() => {
    !isGameStarted && clearInterval(timer);
    !isGameStarted && clearInterval(pointsTimer);
  }, [isGameStarted]);

  return (
    <div>
      Welcome to GamePage
      <button onClick={handleStartGame}>Begin Round</button>
      {counter !== 0 && <h2>{isCorrectGuess ? 'CORRECT!!!!' : 'BUMMER YOU FAILED:('}</h2>}
      {counter === tracks?.length ? (
        <div className="completed-game-state">
          <p>{`CONGRATS YOU'VE COMPLETED ${tracks?.length} ROUNDS. Your total points were ${totalPoints}. Great job you nerd!`}</p>
          <button>Choose New Game</button>
          <button>Go to Leader Board</button>
        </div>
      ) : (
        <div className="current-game-state">
          <h2>
            Current Round: {counter + 1}/{tracks?.length}
          </h2>
          <h2>Total Points: {totalPoints}</h2>
          {isGameStarted && <audio src={tracks[counter].track.preview_url} autoPlay></audio>}
          <h2>
            {countDownSeconds < 10
              ? `Countdown Timer: 00:0${countDownSeconds}`
              : `Countdown Timer: 00:${countDownSeconds}`}
          </h2>
          <h2>Avaliable Points : {availablePoints}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label name="userGuess" className="track">
          {tracks &&
            tracksShuffled.map((track, i) => (
              <div key={track + i}>
                <p>{track.track.name}</p>
                <input
                  onChange={(e) => setUserGuess(e.target.value)}
                  type="radio"
                  name="userGuess"
                  value={track.track.id}
                />
              </div>
            ))}
        </label>
        <button>Submit Guess</button>
      </form>
    </div>
  );
}
