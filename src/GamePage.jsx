/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { insertLeaderBoard } from './services/fetch-utils';
import './GamePage.css';

export default function GamePage({ token, userProfile }) {
  const [tracks, setTracks] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  // const [tracksShuffled, setTracksShufffled] = useState([]);
  const [counter, setCounter] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(30);
  const [timer, setTimer] = useState('');
  const [availablePoints, setAvailablePoints] = useState(100);
  const [pointsTimer, setPointsTimer] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  const [choiceArr, setChoiceArr] = useState([]);

  const netlifyUrl = '/.netlify/functions/spotify-playlist-items';

  const params = useParams();
  const history = useHistory();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //STRETCH FEATURE
  // CREATE AN ARRAY OF 4 CHOICE
  // 1 is the correct answer
  // 3 are random incorrect answers
  // So we could push the correct answer into an array
  // Then randomly push 3 more that DO NOT MATCH THE FIRST/CORRECT ANSWER
  //THEN RANDOMIZE THE WHOLE ARRAY

  useEffect(() => {
    if (tracks) {
      let copyOfTracks = [...tracks];
      //slice/splice the correct answer out of the array
      const correctTrack = copyOfTracks.splice(counter, 1);
      // console.log(correctTrack);
      
      //now splice 3 random out of the array
      shuffleArray(copyOfTracks); //"shuffles in place"
      const random3Tracks = copyOfTracks.splice(0, 3);
      // console.log(random3Tracks);
      
      // put them all in the same array
      const all4Choices = [...correctTrack, ...random3Tracks];
      // console.log(all4choices);

      //shuffle them
      shuffleArray(all4Choices);
      // console.log('shuffled', all4choices);
      setChoiceArr(all4Choices);
    }
  }, [tracks, counter]);
  

  //TRACKS COUNTDOWN SECONDS AND IF 0 RUNS HANDLE SUBMIT TO END ROUND
  useEffect(() => {
    async function ifTimeRunsOut() {
      if (countDownSeconds <= 0) {
        await handleSubmit();
      }
    }
    ifTimeRunsOut();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDownSeconds]);
  

//OLD 10 MULTIPLE CHOICE TRACKS
  // useEffect(() => {
  //   if (tracks) {
  //     let trackShuffled = [...tracks];
  //     shuffleArray(trackShuffled);
  //     setTracksShufffled(trackShuffled);
  //   }
  // }, [tracks]);

  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      const response = await fetch(`${netlifyUrl}?token=${token}&playlist_id=${params.id}`);
      const json = await response.json();
      setTracks(json.data.items);
    }
    fetchPlayListsFromSpotify();
  }, [token, params.id]);

  useEffect(() => {
    !isGameStarted && clearInterval(timer);
    !isGameStarted && clearInterval(pointsTimer);
  }, [isGameStarted, timer, pointsTimer]);
  

  
  function handleStartGame() {
    setIsGameStarted(true);
    setTimer(setInterval(decrementTimer, 1000));
    setPointsTimer(setInterval(decrementPoints, 5000));
  }
  
  async function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    
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
    setUserGuess('');

    counter + 1 === tracks.length && 
    userProfile &&
    (await insertLeaderBoard({
      username: userProfile.username,
      user_id: userProfile.user_id,
      score: totalPoints,
      rounds: tracks.length,
    }));
  }
  

  const handleLeaderboardClick = () => {
    history.push('/leaderboard');
  };

  const handleChooseNewGameClick = () => {
    history.push('/selection');
  };
  

  function decrementTimer() {
    if (countDownSeconds > 0){ 
      setCountDownSeconds((countDownSeconds) => countDownSeconds - 1);
    }
    else if (countDownSeconds === 0){
      clearInterval(timer);
    }
  }
  
  function decrementPoints() {
    setAvailablePoints((availablePoints) => availablePoints - 10);
  }

  return (
    <div className='game-page'>
      <h2>{`Welcome to ${params.name} trivia!`} <br></br>Now name that tune!</h2>

      {/* GAME COMPLETION MESSAGE + REDIRECT BUTTONS */}
      {counter === tracks?.length &&
        <div className="completed-game-state">
          <h2>{`CONGRATS YOU'VE COMPLETED ${tracks?.length} ROUNDS.`} <br></br>{`Your total points were ${totalPoints}.`} <br></br> Great job you nerd!</h2>
          <button className='final-button' onClick={handleChooseNewGameClick}>Choose New Game</button>
          <button className='final-button' onClick={handleLeaderboardClick}>Go to Leader Board</button>
        </div>
      }

      {/* TOTAL POINTS, ROUNDS, AND AUDIO TAG */}
      {counter !== tracks?.length &&
        <div className="current-game-state">
          <h2>Total Points: {totalPoints}</h2>
          <h2>
            {isGameStarted ? 'Current' : 'Next'} Round: {counter + 1}/{tracks?.length}
          </h2>
          {isGameStarted && 
          <audio src={tracks[counter].track.preview_url} autoPlay></audio>}
        </div>
      }

      {/* BEGIN ROUND BUTTON */}
      {(!isGameStarted && counter !== tracks?.length) && 
      <button className='game-button' onClick={handleStartGame}>Begin Round</button>}

      {/* MULTIPLE CHOICE FORM, COUNTDOWN TIMER, REMAINING POINTS */}
      {isGameStarted ?
      (
      <div className='form-and-stuff'>
        <form onSubmit={handleSubmit}>
          <div name="userGuess" className="choices">
            {tracks &&
              choiceArr.map((track, i) => (
                <div key={track + i} className='radio'>
                  <input
                    onChange={(e) => setUserGuess(e.target.value)}
                    type="radio"
                    name="userGuess"
                    value={track.track.id}
                  />
                  <label htmlFor='label'></label>
                  <p>{track.track.name}</p>
                </div>
              ))}
          </div>
          {userGuess
            ? <button className='game-button'>Submit Guess</button> 
            : <button className='game-button'>Skip</button>}
        </form>
        <h2>
          {countDownSeconds < 10
            ? `Countdown Timer: 00:0${countDownSeconds}`
            : `Countdown Timer: 00:${countDownSeconds}`}
        </h2>
        <h2>Available Points : {availablePoints}</h2>
      </div>
      ) : (
        // DISPLAY CORRECT OR INCORRECT
        (counter === 0) ? null 
        : (isCorrectGuess) 
            ? <div className='correct-wrong'><img src='/king.png'></img><h2>CORRECT!!!! </h2></div>
            : <div className='correct-wrong'><img src='/king.png'></img><h2>WRONG ANSWER! </h2></div>
      )
      

    }

    </div>
  );
}
