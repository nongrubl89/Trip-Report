/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import MasterGrid from '../styles/MasterGrid';
// import SingleTailCard from './SingleTailCard';
import { styled } from '@mui/material/styles';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import Link from 'next/link';
import ErrorComponent from './ErrorComponent';

export const ALL_TAILS_QUERY = gql`
  query ALL_TAILS_QUERY {
    tailNumbers {
      data {
        id
        attributes {
          TailNumber
          AircraftType
          HomeICAO
          Slug
        }
      }
    }
  }
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3c4c9f',
    color: theme.palette.common.white,
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

export default function Tails({ tailsArray }) {
  console.log('tails', tailsArray);
  const { data, error, loading } = useQuery(ALL_TAILS_QUERY);
  console.log(data?.tailNumbers?.data);
  console.log(error);
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;
  return (
    <Grid item m={5} xs={9} s={12}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tail Number</StyledTableCell>
              <StyledTableCell align="right">Home Base</StyledTableCell>
              <StyledTableCell align="right">Aircraft Make</StyledTableCell>
              <StyledTableCell align="right">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.tailNumbers?.data.map((tail) => (
              <TableRow
                key={tail.attributes.slug}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tail.attributes.TailNumber}
                </TableCell>
                <TableCell align="right">
                  {tail.attributes.AircraftType}
                </TableCell>
                <TableCell align="right">{tail.attributes.HomeICAO}</TableCell>
                <TableCell align="right">
                  <Link href={`/tail/${tail.attributes.Slug}`}>
                    <NorthEastIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
