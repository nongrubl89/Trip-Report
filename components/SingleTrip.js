/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import ErrorComponent from './ErrorComponent';
import LargeHeaderCard from '../styles/SingleTail';
import ButtonGrid from '../styles/ButtonGrid';
import { SINGLE_TAIL_QUERY } from './SingleTailPage';

export const SINGLE_TRIP_QUERY = gql`
  query SINGLE_TRIP_QUERY($Slug: String!) {
    trips(filters: { Slug: { eq: $Slug } }) {
      data {
        id
        attributes {
          Routing
          CateringDetails
          CabinAttendantName
          createdAt
          Feedback
          StartDate
          EndDate
          PaxCount
          CateringRequests
          DebriefComplete
          PassengerNames {
            PassengerName
          }
          tail_number {
            data {
              id
              attributes {
                Slug
              }
            }
          }
        }
      }
    }
  }
`;

const DELETE_TRIP_MUTATION = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id) {
      data {
        id
      }
    }
  }
`;

export default function SingleTrip({ Slug }) {
  const { data, loading, error } = useQuery(SINGLE_TRIP_QUERY, {
    variables: { Slug },
  });
  const tripDetails = data?.trips?.data[0]?.attributes;
  const slug = data?.trips?.data[0].attributes.tail_number.data.attributes.Slug;
  const id = data?.trips?.data[0].id;
  const [deleteTrip, { ldg, err, dta }] = useMutation(DELETE_TRIP_MUTATION, {
    variables: { id },
  });
  const tripDelete = async () => {
    const res = await deleteTrip({
      refetchQueries: [{ query: SINGLE_TAIL_QUERY, variables: { Slug: slug } }],
    }).catch(console.log(error));
    Router.push({ pathname: `/tail/${slug}` });
  };
  const paxNames = tripDetails?.PassengerNames.map((passenger, i) => (
    <li key={i}>{passenger.PassengerName}</li>
  ));
  if (error) return <ErrorComponent error={error.message} />;
  if (loading) return <div>Loading...</div>;
  return (
    <LargeHeaderCard>
      <div>
        <h2>
          <strong>{tripDetails.Routing}</strong>
        </h2>
        <h3>
          {tripDetails.StartDate} through {tripDetails.EndDate}
        </h3>
        <hr />
        <p>
          <strong>Cabin Attendant:</strong> {tripDetails.CabinAttendantName}
        </p>
        <p>
          <strong>Passengers:</strong>
        </p>
        <ul>{paxNames}</ul>
        <p>
          <strong>Catering Requests: </strong>
          {'\n'}
          {tripDetails.CateringRequests}
        </p>
      </div>
      {tripDetails.DebriefComplete ? (
        <div>
          <p>
            <strong>Catering Details: </strong>
            {'\n'}
            {tripDetails.CateringDetails}
          </p>
          <p>
            <strong>Feedback from passengers:</strong>
            {'\n'}
            {tripDetails.Feedback}
          </p>
          <ButtonGrid alignItems="end" placeSelf="end">
            <button type="button" onClick={tripDelete}>
              Delete
            </button>
            <Link href={`/tail/${slug}`}>
              <button type="button">Back to Tail</button>
            </Link>
          </ButtonGrid>
        </div>
      ) : (
        <ButtonGrid alignItems="end" placeSelf="end" justifyContent="flexend">
          <button type="button" onClick={tripDelete}>
            Cancel Trip
          </button>
          <Link href={`/tail/${slug}`}>
            <button type="button">Back to Tail</button>
          </Link>
        </ButtonGrid>
      )}
    </LargeHeaderCard>
  );
}
