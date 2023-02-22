/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SINGLE_TRIP_QUERY } from './SingleTrip';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';
import useForm from '../lib/useForm';
import LargeHeaderCard from '../styles/SingleTail';
import ErrorComponent from './ErrorComponent';

const UPDATE_TRIP_MUTATION = gql`
  mutation updateTrip($id: ID!, $CateringDetails: String!, $Feedback: String!) {
    updateTrip(
      id: $id
      data: { CateringDetails: $CateringDetails, Feedback: $Feedback }
    ) {
      data {
        attributes {
          CateringDetails
          Feedback
        }
      }
    }
  }
`;

export default function UpdateTrip({ uuid }) {
  const { data, loading, error } = useQuery(SINGLE_TRIP_QUERY, {
    variables: { uuid },
  });
  const [
    updateTrip,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_TRIP_MUTATION);
  const tripData = data?.trips?.data[0]?.attributes;
  console.log(data?.trips?.data[0]);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    Feedback: '',
    CateringDetails: '',
  });
  if (loading) {
    <div>Loading</div>;
  }
  if (error) {
    <ErrorComponent error={error} />;
  } else
    return (
      <div>
        <LargeHeaderCard>
          <div>
            <h2>
              <strong>{tripData?.Routing}</strong>
            </h2>
            <h3>
              {tripData?.StartDate} through {tripData?.EndDate}
            </h3>
            <h3>
              <strong>Trip Status</strong>:
              {tripData?.TripStatus ? ' Completed' : ' Scheduled'}
            </h3>
            <hr />
            <p>
              <strong>Cabin Attendant:</strong> {tripData?.CabinAttendantName}
            </p>
            <p>
              <strong>Passengers:</strong>
            </p>
            {/* <ul>{paxNames}</ul> */}
            <p>
              <strong>Catering Requests: </strong>
              {tripData?.CateringRequests}
            </p>
          </div>
        </LargeHeaderCard>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(inputs);
            const res = await updateTrip({
              variables: {
                id: data.trips.data[0].id,
                Feedback: inputs.Feedback,
                CateringDetails: inputs.CateringDetails,
              },
              refetchQueries: [
                { query: SINGLE_TRIP_QUERY, variables: { uuid } },
              ],
            });
            console.log(res);
            clearForm();
            Router.push({ pathname: `/trip/${uuid}` });
          }}
        >
          <fieldset>
            <h1>Review Trip</h1>
            <label htmlFor="CateringDetails">
              Catering Details
              <textarea
                type="text"
                id="CateringDetails"
                name="CateringDetails"
                placeholder="Please explain catering details for each leg of the trip and how they differed from any requested items"
                value={inputs.CateringDetails}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="Feedback">
              Feedback
              <textarea
                type="text"
                id="Feedback"
                name="Feedback"
                placeholder="Please give any feedback from passengers on service, catering, etc"
                value={inputs.Feedback}
                onChange={handleChange}
              />
            </label>

            <ButtonGrid>
              <button type="submit">Submit</button>
              <button type="button" onClick={clearForm}>
                Clear Form
              </button>
            </ButtonGrid>
          </fieldset>
        </Form>
      </div>
    );
}
