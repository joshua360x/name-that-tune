import React, { useEffect, useState } from 'react';
import { fetchLeaders } from './services/fetch-utils';
// import { Table, Column, HeaderCell, Cell } from 'rsuite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




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
    // cool reduce, but a bit tough to read and uses some non-standard ternaries.
    const newLeaders = leaders.reduce((acc, curr) => {
      // in my opinion, it feels weird to have assignment as the final statement of a ternery.
      // here's some conversation with varying opinions on the issue: https://github.com/rubocop/ruby-style-guide/issues/704
      if (!acc[curr.username]) {
        acc[curr.username] = {};
      }
       
      // seems like this would work, since obj would point to the same object? Either way, for readability i'd want to find a way to get rid of all the acc[curr.username]
      const userData = acc[curr.username];
      // as a rule, only use ternaries for assignment or return values. these should be refactored as assignments, or rewritten as if/else blocks. no assignment should occur within the final statement of a ternery. a ternery is itself a decision about how to do assignment
      userData.totalPoints = 
        userData.totalPoints
          ? userData.totalPoints + curr.score
          : curr.score;
      
      userData.totalGames = 
        userData.totalGames
          ? userData.totalGames + 1
          : 1;

      userData.rounds = 
        userData.rounds
        ? userData.rounds + curr.rounds
        : userData.rounds = curr.rounds;


      return acc;
    }, {});

    const mungedData = Object.entries(newLeaders);

    const newData = mungedData.map((mungedDataPoint) => {
      return {
        username: mungedDataPoint[0],
        totalPoints: mungedDataPoint[1].totalPoints,
        totalGames: mungedDataPoint[1].totalGames,
        rounds: mungedDataPoint[1].rounds,
        pointsPerRound: Math.round((mungedDataPoint[1].totalPoints / (mungedDataPoint[1].rounds * 100)) * 100)
      };
    });

    const sortedData = newData.sort((a, b) => a.pointsPerRound - b.pointsPerRound).reverse();

    setMungedLeaders(sortedData);
  }, [leaders]);


  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leader-div">
        {
          mungedLeaders &&
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell align="right">Rounds</TableCell>
                    <TableCell align="right">Total Games</TableCell>
                    <TableCell align="right">Total Points</TableCell>
                    <TableCell align="right">Percentage Points Per Round</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mungedLeaders.map((row) => (
                    <TableRow
                      key={row.username}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.username}
                      </TableCell>
                      <TableCell align="right">{row.rounds}</TableCell>
                      <TableCell align="right">{row.totalGames}</TableCell>
                      <TableCell align="right">{row.totalPoints}</TableCell>
                      <TableCell align="right">{row.pointsPerRound}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        }

      </div>

    </div>
  );
}
