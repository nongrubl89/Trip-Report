/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { SINGLE_TRIP_QUERY } from './SingleTrip';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';
import useForm from '../lib/useForm';

const UPDATE_TRIP_MUTATION = gql`
  mutation updateTrip(
    $id: ID!
    $StartDate: Date!
    $EndDate: Date!
    $CabinAttendantName: String!
    $Routing: String!
    $CateringDetails: String!
    $Feedback: String!
  ) {
    updateTrip(
      id: $id
      data: {
        StartDate: $StartDate
        EndDate: $EndDate
        CabinAttendantName: $CabinAttendantName
        Routing: $Routing
        CateringDetails: $CateringDetails
        Feedback: $Feedback
      }
    ) {
      data {
        attributes {
          StartDate
          EndDate
          CabinAttendantName
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
  console.log(data?.trips?.data);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    StartDate: `${tripData?.StartDate}`,
    EndDate: `${tripData?.EndDate}`,
    Routing: `${tripData?.Routing}`,
    CabinAttendantName: tripData?.CabinAttendantName,
    Feedback: '',
    CateringDetails: '',
  });
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(inputs);
          const res = await updateTrip({
            variables: {
              id: data.trips.data.id,
              StartDate: inputs.StartDate,
              EndDate: inputs.EndDate,
              Routing: inputs.Routing,
              CabinAttendantName: inputs.CabinAttendantName,
              Feedback: inputs.Feedback,
              CateringDetails: inputs.CateringDetails,
            },
          });
          console.log(res);
          clearForm();
          //   Router.push({ pathname: `/tail/${tail}` });
        }}
      >
        <fieldset>
          <h1>Review Trip</h1>
          <ButtonGrid>
            <label htmlFor="StartDate">
              Start Date
              <input
                required
                type="date"
                id="StartDate"
                name="StartDate"
                placeholder="{tripData.StartDate}"
                value={inputs.StartDate}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="EndDate">
              End Date
              <input
                required
                type="date"
                id="EndDate"
                name="EndDate"
                placeholder="{tripData.EndDate}"
                value={inputs.EndDate}
                onChange={handleChange}
              />
            </label>
          </ButtonGrid>
          <label htmlFor="Routing">
            Trip Routing
            <input
              required
              type="text"
              id="Routing"
              name="Routing"
              placeholder={inputs.Routing}
              value={inputs.Routing}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="CabinAttendantName">
            Cabin Attendant Name
            <input
              required
              type="text"
              id="CabinAttendantName"
              name="CabinAttendantName"
              value={inputs.CabinAttendantName}
              onChange={handleChange}
            />
          </label>
          <p>
            <strong>Catering Requests: </strong>
            {tripData?.CateringRequests}
          </p>
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
