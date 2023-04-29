/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { SINGLE_TAIL_QUERY } from './SingleTailPage';
import ErrorComponent from './ErrorComponent';
import ButtonGrid from '../styles/ButtonGrid';
import Form from '../styles/Form';
import useForm from '../lib/useForm';

const UPDATE_TAIL_MUTATION = gql`
  mutation updateTailNumber(
    $id: ID!
    $TailNumber: String!
    $Owner: String!
    $PIC: String!
    $SIC: String!
    $CabinAttendant: String!
    $StandardStockNonPerishable: String!
    $StandardStockPerishable: String!
  ) {
    updateTailNumber(
      id: $id
      data: {
        TailNumber: $TailNumber
        Owner: $Owner
        PIC: $PIC
        SIC: $SIC
        CabinAttendant: $CabinAttendant
        StandardStockNonPerishable: $StandardStockNonPerishable
        StandardStockPerishable: $StandardStockPerishable
      }
    ) {
      data {
        attributes {
          TailNumber
          Owner
          PIC
          SIC
          CabinAttendant
          StandardStockNonPerishable
          StandardStockPerishable
        }
      }
    }
  }
`;

export default function UpdateTail({ tail }) {
  const { data, loading, error } = useQuery(SINGLE_TAIL_QUERY, {
    variables: { Slug: tail },
  });
  const [
    updateTail,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_TAIL_MUTATION);
  const tailData = data?.tailNumbers?.data[0].attributes;
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    TailNumber: `${tailData?.TailNumber}`,
    Owner: `${tailData?.Owner}`,
    PIC: `${tailData?.PIC}`,
    SIC: `${tailData?.SIC}`,
    CabinAttendant: `${tailData?.CabinAttendant}`,
    StandardStockPerishable: `${tailData?.StandardStockPerishable}`,
    StandardStockNonPerishable: `${tailData?.StandardStockNonPerishable}`,
  });
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateTail({
            variables: {
              id: data?.tailNumbers?.data[0].id,
              TailNumber: inputs.TailNumber,
              Owner: inputs.Owner,
              PIC: inputs.PIC,
              SIC: inputs.SIC,
              CabinAttendant: inputs.CabinAttendant,
              StandardStockPerishable: inputs.StandardStockPerishable,
              StandardStockNonPerishable: inputs.StandardStockNonPerishable,
            },
            refetchQueries: [
              { query: SINGLE_TAIL_QUERY, variables: { Slug: tail } },
            ],
          }).catch(console.log(error));
          console.log(res);
          //   clearForm();
          Router.push({ pathname: `/tail/${tail}` });
        }}
      >
        <fieldset>
          <h1>Edit Tail Number {`${tail}`.toUpperCase()}</h1>
          <ButtonGrid>
            <label htmlFor="TailNumber">
              Tail Number
              <input
                required
                type="text"
                id="TailNumber"
                name="TailNumber"
                placeholder=""
                value={inputs.TailNumber}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="Owner">
              Owner
              <input
                required
                type="text"
                id="Owner"
                name="Owner"
                placeholder=""
                value={inputs.Owner}
                onChange={handleChange}
              />
            </label>
          </ButtonGrid>
          <ButtonGrid>
            <label htmlFor="PIC">
              PIC
              <input
                required
                type="text"
                id="PIC"
                name="PIC"
                placeholder=""
                value={inputs.PIC}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="SIC">
              SIC
              <input
                required
                type="text"
                id="SIC"
                name="SIC"
                placeholder=""
                value={inputs.SIC}
                onChange={handleChange}
              />
            </label>
          </ButtonGrid>
          <label htmlFor="CabinAttendant">
            Cabin Attendant Name
            <input
              required
              type="text"
              id="CabinAttendant"
              name="CabinAttendant"
              value={inputs.CabinAttendant}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="StandardStockNonPerishable">
            Non-Perishable Standard Stock
            <textarea
              type="text"
              id="StandardStock"
              name="StandardStock"
              placeholder=""
              value={inputs.StandardStockNonPerishable}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="StandardStockPerishable">
            Perishable Standard Stock
            <textarea
              type="text"
              id="StandardStockPerishable"
              name="StandardStockPerishable"
              placeholder=""
              value={inputs.StandardStockPerishable}
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
