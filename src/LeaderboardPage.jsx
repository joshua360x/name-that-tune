import React, { useEffect, useState } from 'react';
import { fetchLeaders } from './services/fetch-utils';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const getLeaders = async () => {
      const leadersList = await fetchLeaders();
      console.log(leadersList);
      setLeaders(leadersList);
    };
    getLeaders();
  }, []);

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

  return <div>{JSON.stringify(newLeaders)}</div>;
}
