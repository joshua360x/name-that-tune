import React, { useEffect, useState } from 'react';
import { fetchLeaders } from './services/fetch-utils';
import './LeaderboardPage.css';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [mungedLeaders, setMungedLeaders] = useState([]);

  useEffect(() => {
    const getLeaders = async () => {
      const leadersList = await fetchLeaders();
      setLeaders(leadersList);
    };
    getLeaders();
  }, []);

  useEffect(() => {
    const newLeaders = leaders.reduce((acc, curr) => {
      !acc[curr.username] && (acc[curr.username] = {});
      acc[curr.username].totalPoints
        ? (acc[curr.username].totalPoints = acc[curr.username].totalPoints + curr.score)
        : (acc[curr.username].totalPoints = curr.score);

      acc[curr.username].totalGames
        ? (acc[curr.username].totalGames = acc[curr.username].totalGames + 1)
        : (acc[curr.username].totalGames = 1);

      acc[curr.username].rounds
        ? (acc[curr.username].rounds = acc[curr.username].rounds + curr.rounds)
        : (acc[curr.username].rounds = curr.rounds);

      return acc;
    }, {});

    const mungedData = Object.entries(newLeaders);
    // console.log(mungedData);
    setMungedLeaders(mungedData);
  }, []);

  return (
    <div className="leaderboard">
      {mungedLeaders.map((leader, i) => {
        return (
          <div key={i} className="leader-div">
            <h3>{leader[0]}</h3>
            <p>{`Total Points ${leader[1].totalPoints}`} </p>
            <p>{`Total Games ${leader[1].totalGames}`} </p>
            <p>{`Total Rounds ${leader[1].rounds}`} </p>
          </div>
        );
      })}
    </div>
  );
}
