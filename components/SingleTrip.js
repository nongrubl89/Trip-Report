/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import ErrorComponent from './ErrorComponent';
import LargeHeaderCard from '../styles/SingleTail';
import ButtonGrid from '../styles/ButtonGrid';
import { SINGLE_TAIL_QUERY } from './SingleTailPage';

const SINGLE_TRIP_QUERY = gql`
  query SINGLE_TRIP_QUERY($uuid: String!) {
    trips(filters: { uuid: { eq: $uuid } }) {
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
          TripStatus
          PassengerName {
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

export default function SingleTrip({ uuid }) {
  console.log('uuid', uuid);
  const { data, loading, error } = useQuery(SINGLE_TRIP_QUERY, {
    variables: { uuid },
  });
  console.log(data?.trips?.data[0]);
  const tripDetails = data?.trips?.data[0].attributes;
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
  const paxNames = tripDetails?.PassengerName.map((passenger) => (
    <li>{passenger.PassengerName}</li>
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
        <h3>
          <strong>Trip Status</strong>:
          {tripDetails.TripStatus ? ' Completed' : ' Scheduled'}
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
          <strong>Catering Details: </strong>
          {tripDetails.CateringDetails}
        </p>
      </div>
      <div style={{ display: 'grid' }}>
        <p>
          <strong>Feedback from passengers:</strong>
          {'\n'}
          {tripDetails.Feedback}
        </p>
        <ButtonGrid alignItems="end" placeSelf="end">
          <button type="button" onClick={tripDelete}>
            Delete
          </button>
          <Link href="#">
            <button type="button">Edit Trip Details</button>
          </Link>
        </ButtonGrid>
      </div>
    </LargeHeaderCard>
  );
}
