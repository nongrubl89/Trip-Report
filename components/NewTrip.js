/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import useForm from '../lib/useForm';
import ButtonGrid from '../styles/ButtonGrid';
import Form from '../styles/Form';
import { SINGLE_TAIL_QUERY } from './SingleTailPage';

const CREATE_TRIP_MUTATION = gql`
  mutation createTrip(
    $StartDate: Date!
    $EndDate: Date!
    $Routing: String!
    $CabinAttendantName: String!
    $CateringRequests: String!
    $PaxCount: Int!
    $PassengerNames: [ComponentNamePaxNameInput]
    $uuid: String!
    $tail_number: ID!
  ) {
    createTrip(
      data: {
        StartDate: $StartDate
        EndDate: $EndDate
        Routing: $Routing
        CabinAttendantName: $CabinAttendantName
        PaxCount: $PaxCount
        PassengerNames: $PassengerNames
        CateringRequests: $CateringRequests
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
          PassengerNames {
            PassengerName
          }
          CateringRequests
          PaxCount
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
          Capacity
        }
      }
    }
  }
`;

export default function NewTrip({ tail }) {
  const { loading, error, data } = useQuery(TAIL_ID_QUERY, {
    variables: { Slug: tail },
  });
  const [paxCount, setPaxCount] = useState(0);
  const [passengerInputs, setPassengerInputs] = useState([]);
  const [passengerNames, setPassengerNames] = useState([]);

  const tailNumID = data?.tailNumbers?.data[0].id;
  const capacity = data?.tailNumbers?.data[0].attributes.Capacity;
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    StartDate: '',
    EndDate: '',
    Routing: '',
    CabinAttendantName: '',
    CateringRequests: '',
    tail_number: tailNumID,
  });

  const newUuid = uuidv4();
  const [createTrip, { ldg, err, dta }] = useMutation(CREATE_TRIP_MUTATION, {
    refetchQueries: [{ query: SINGLE_TAIL_QUERY, variables: { Slug: tail } }],
  });

  const handleInputValue = (event) => {
    const { value } = event.target;
    setPaxCount(value);
    if (paxCount >= 0) {
      const generateArrays = Array.from(
        Array(Number(event.target.value)).keys()
      );
      console.log('g', generateArrays);
      setPassengerInputs(generateArrays);
    } else {
      setPassengerInputs([]);
    }
  };

  const addNameInput = () => {
    return passengerInputs.map((pax, i) => (
      <label htmlFor="PassengerName" key={i}>
        Passenger {pax + 1}
        <input
          type="text"
          className="form-control"
          name="PassengerName"
          onBlur={handlePaxNames}
        />
      </label>
    ));
  };

  const handlePaxNames = (e) => {
    console.log(e.target.value);
    const passenger = {};
    passenger.PassengerName = e.target.value;
    passengerNames.push(passenger);
    console.log(passengerNames);
  };
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log('click');
          const res = await createTrip({
            variables: {
              uuid: newUuid,
              StartDate: inputs.StartDate,
              EndDate: inputs.EndDate,
              Routing: inputs.Routing,
              CabinAttendantName: inputs.CabinAttendantName,
              CateringRequests: inputs.CateringRequests,
              tail_number: inputs.tail_number,
              PaxCount: parseInt(paxCount),
              PassengerNames: passengerNames,
            },
          });
          console.log(res);
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
          <ButtonGrid>
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
            <label htmlFor="quantity">
              Passenger Count:
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={capacity}
                value={paxCount}
                onChange={handleInputValue}
              />
            </label>
          </ButtonGrid>
          <ButtonGrid>
            {passengerInputs.length ? addNameInput() : null}
          </ButtonGrid>
          <label htmlFor="CateringRequests">
            Catering Requests
            <textarea
              type="text"
              id="CateringRequests"
              name="CateringRequests"
              placeholder="Please list any catering requests for the trip"
              value={inputs.CateringRequests}
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
