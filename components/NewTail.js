import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { stateToHTML } from 'draft-js-export-html';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import slugify from 'slugify';
import useForm from '../lib/useForm';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';
import 'draft-js/dist/Draft.css';
import { ALL_TAILS_QUERY } from './AllTailsPage';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CREATE_TAIL_MUTATION = gql`
  mutation createTailNumber(
    $TailNumber: String!
    $AircraftType: String!
    $HomeICAO: String!
    $Owner: String!
    $PIC: String!
    $SIC: String!
    $PICEmail: String!
    $SICEmail: String!
    $Slug: String!
    $CabinAttendant: String!
    $CabinAttendantEmail: String!
    $StandardStockPerishable: String!
    $StandardStockNonPerishable: String!
  ) {
    createTailNumber(
      data: {
        TailNumber: $TailNumber
        AircraftType: $AircraftType
        HomeICAO: $HomeICAO
        CabinAttendant: $CabinAttendant
        CabinAttendantEmail: $CabinAttendantEmail
        Owner: $Owner
        PIC: $PIC
        PICEmail: $PICEmail
        SIC: $SIC
        Slug: $Slug
        SICEmail: $SICEmail
        StandardStockPerishable: $StandardStockPerishable
        StandardStockNonPerishable: $StandardStockNonPerishable
      }
    ) {
      data {
        attributes {
          TailNumber
        }
      }
    }
  }
`;

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default function NewTail() {
  const [perishableEditorState, setPerishableEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const htmlPerishable = stateToHTML(perishableEditorState.getCurrentContent());
  const [nonperishableEditorState, setNonPerishableEditorState] =
    React.useState(() => EditorState.createEmpty());

  const htmlNonPerishable = stateToHTML(
    nonperishableEditorState.getCurrentContent()
  );
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    TailNumber: 'N75GG',
    HomeICAO: 'KVNY',
    AircraftType: 'Gulfstream 550',
    CabinAttendant: 'lisab urgnon',
    CabinAttendantEmail: 'lisab urgnon',
    Owner: 'lisab urgnon',
    PIC: 'lisab urgnon',
    PICEmail: 'lisab urgnon',
    SICEmail: 'lisab urgnon',
    SIC: 'lisab urgnon',
    StandardStockNonPerishable: htmlPerishable,
    StandardStockPerishable: htmlNonPerishable,
  });

  // useEffect(() => console.log(perishableEditorState.getCurrentContent()));
  const [createTail, { ldg, err, dta }] = useMutation(CREATE_TAIL_MUTATION, {
    refetchQueries: [{ query: ALL_TAILS_QUERY }],
  });

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        console.log('click');
        const res = await createTail({
          variables: {
            TailNumber: inputs.TailNumber,
            HomeICAO: inputs.HomeICAO,
            AircraftType: inputs.AircraftType,
            Owner: inputs.Owner,
            CabinAttendant: inputs.CabinAttendant,
            CabinAttendantEmail: inputs.CabinAttendantEmail,
            PIC: inputs.PIC,
            PICEmail: inputs.PICEmail,
            SICEmail: inputs.SICEmail,
            SIC: inputs.SIC,
            StandardStockNonPerishable: htmlNonPerishable,
            StandardStockPerishable: htmlPerishable,
            Slug: slugify(inputs.TailNumber),
          },
        });
        console.log(res);
      }}
    >
      <fieldset>
        <ButtonGrid>
          <label htmlFor="TailNumber">
            Tail Number
            <input
              required
              type="text"
              id="TailNumber"
              name="TailNumber"
              value={inputs.TailNumber}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="AircraftMake">
            Aircraft Make
            <input
              required
              type="text"
              id="AircraftType"
              name="AircraftType"
              value={inputs.AircraftType}
              onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <ButtonGrid>
          <label htmlFor="HomeICAO">
            Home Base ICAO
            <input
              required
              type="text"
              id="HomeICAO"
              name="HomeICAO"
              value={inputs.HomeICAO}
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
              value={inputs.Owner}
              onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <ButtonGrid>
          <label htmlFor="PIC">
            PIC Name
            <input
              required
              type="text"
              id="PIC"
              name="PIC"
              value={inputs.PIC}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="PICEmail">
            PIC Email
            <input
              required
              type="text"
              id="PICEmail"
              name="PICEmail"
              value={inputs.PICEmail}
              onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <ButtonGrid>
          <label htmlFor="SIC">
            SIC Name
            <input
              required
              type="text"
              id="SIC"
              name="SIC"
              value={inputs.SIC}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="SICEmail">
            SIC Email
            <input
              required
              type="text"
              id="SICEmail"
              name="SICEmail"
              value={inputs.SICEmail}
              onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <ButtonGrid>
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
          <label htmlFor="CabinAttendantEmail">
            Cabin Attendant Email
            <input
              required
              type="text"
              id="CabinAttendantEmail"
              name="CabinAttendantEmail"
              value={inputs.CabinAttendantEmail}
              onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <p>Perishable Standard Stock - please use a bulleted list</p>
        <Editor
          editorState={perishableEditorState}
          onEditorStateChange={setPerishableEditorState}
          toolbar={{
            options: ['list'],
            list: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
        <p>
          Non-Perishable Standard Stock - please use a bulleted list and add
          links to any hard to find items
        </p>
        <Editor
          editorState={nonperishableEditorState}
          onEditorStateChange={setNonPerishableEditorState}
          toolbar={{
            options: ['list', 'link'],
            list: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}
