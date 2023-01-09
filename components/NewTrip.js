import Form from "../styles/Form";
import ButtonGrid from "../styles/ButtonGrid";
import useForm from "../lib/useForm";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";
import { SINGLE_TAIL_QUERY } from "./SingleTailPage";
import { google_maps_key } from "../public/config";
import { useState } from "react";
import Select, { components, PlaceholderProps } from "react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CREATE_TRIP_MUTATION = gql`
  mutation createTrip(
    $StartDate: Date!
    $EndDate: Date!
    $Routing: String!
    $CabinAttendantName: String!
    $Feedback: String!
    $CateringDetails: String!
    $uuid: String!
    $tail_number: ID!
  ) {
    createTrip(
      data: {
        StartDate: $StartDate
        EndDate: $EndDate
        Routing: $Routing
        CabinAttendantName: $CabinAttendantName
        Feedback: $Feedback
        CateringDetails: $CateringDetails
        uuid: $uuid
        tail_number: $tail_number
      }
    ) {
      data {
        attributes {
          StartDate
          EndDate
          Routing
          CabinAttendantName
          Feedback
          CateringDetails
          uuid
          tail_number {
            data {
              attributes {
                TailNumber
              }
            }
          }
        }
      }
    }
  }
`;

const TAIL_ID_QUERY = gql`
  query TAIL_ID_QUERY($Slug: String!) {
    tailNumbers(filters: { Slug: { eq: $Slug } }) {
      data {
        id
        attributes {
          TailNumber
        }
      }
    }
  }
`;

export default function NewTrip({ tail }) {
  const { loading, error, data } = useQuery(TAIL_ID_QUERY, {
    variables: { Slug: tail },
  });

  const tailNumID = data?.tailNumbers?.data[0].id;
  // const [count, setCount] = useState(1);
  // console.log(tailNumID);
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    StartDate: "",
    EndDate: "",
    Routing: "",
    CabinAttendantName: "",
    Feedback: "",
    CateringDetails: "",
    tail_number: tailNumID,
  });

  const newUuid = uuidv4();
  const [createTrip, { ldg, err, dta }] = useMutation(CREATE_TRIP_MUTATION, {
    variables: {
      uuid: newUuid,
      StartDate: inputs.StartDate,
      EndDate: inputs.EndDate,
      Routing: inputs.Routing,
      CabinAttendantName: inputs.CabinAttendantName,
      Feedback: inputs.Feedback,
      CateringDetails: inputs.CateringDetails,
      tail_number: inputs.tail_number,
    },
    refetchQueries: [{ query: SINGLE_TAIL_QUERY, variables: { Slug: tail } }],
  });
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(inputs);
          const res = await createTrip();
          console.log(res);
          clearForm();
          Router.push({ pathname: `/tail/${tail}` });
        }}
      >
        <fieldset>
          <h1>New Trip</h1>
          <ButtonGrid>
            <label htmlFor="StartDate">
              Start Date
              <input
                required
                type="date"
                id="StartDate"
                name="StartDate"
                placeholder=""
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
                placeholder=""
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
              placeholder="ex: KSJC - KEGE - KTEB"
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
          <label htmlFor="CateringDetails">
            Catering Details
            <textarea
              type="text"
              id="CateringDetails"
              name="CateringDetails"
              placeholder="Please explain catering details for each leg of the trip"
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
            <button onClick={clearForm}>Clear Form</button>
          </ButtonGrid>
        </fieldset>
      </Form>
    </div>
  );
}
