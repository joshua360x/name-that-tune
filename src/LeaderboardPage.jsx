import React, { useEffect, useState } from 'react';
import { fetchLeaders } from './services/fetch-utils';
import './LeaderboardPage.css';
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
  const [loading, setLoading] = useState(true);



  // default table information 

  // const CompactCell = props => <Table.Cell {...props} style={{ padding: 4 }} />;
  // const CompactHeaderCell = props => (
  //   <Table.HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
  // );

  // const defaultColumns = [
  //   {
  //     key: 'totalPoints',
  //     label: 'Total Points',
  //     fixed: true,
  //     width: 130
  //   },
  //   {
  //     key: 'rounds',
  //     label: 'Rounds',
  //     width: 123
  //   },
  //   {
  //     key: 'totalGames',
  //     label: 'Total Games',
  //     width: 123
  //   }
  // ];



  // // TABLE Information
  // const data = mungedLeaders;
  // const [loading, setLoading] = React.useState(false);
  // const [compact, setCompact] = React.useState(true);
  // const [bordered, setBordered] = React.useState(true);
  // const [noData, setNoData] = React.useState(false);
  // const [showHeader, setShowHeader] = React.useState(true);
  // const [autoHeight, setAutoHeight] = React.useState(false);
  // const [hover, setHover] = React.useState(true);
  // const [columnKeys, setColumnKeys] = React.useState(defaultColumns.map(column => column.key));

  // const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
  // const CustomCell = compact ? CompactCell : Table.Cell;
  // const CustomHeaderCell = compact ? CompactHeaderCell : Table.HeaderCell;


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



    console.log(newLeaders);
    const mungedData = Object.entries(newLeaders);
    console.log(mungedData);



    const newData = mungedData.map((mungedDataPoint, i) => {
      return {
        username: mungedDataPoint[0],
        totalPoints: mungedDataPoint[1].totalPoints,
        totalGames: mungedDataPoint[1].totalGames,
        rounds: mungedDataPoint[1].rounds
      };
    });

    console.log(newData);

    const sortedData = newData.sort((a, b) => a.totalPoints - b.totalPoints).reverse();
    console.log(sortedData);





    setMungedLeaders(sortedData);
    setLoading(false);
  }, [leaders]);



  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <div className="leader-div">


        {
          mungedLeaders &&


          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Rounds</TableCell>
                  <TableCell align="right">Total Games</TableCell>
                  <TableCell align="right">Total Points</TableCell>
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
