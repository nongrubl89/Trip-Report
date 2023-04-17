import { useState } from 'react';
import useForm from '../lib/useForm';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';

export default function NewTail() {
  const [prevLength, setPrevLength] = useState();
  const [preferenceList, setPreferenceList] = useState('');
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    TailNumber: '',
    HomeICAO: '',
    AircraftType: '',
    CabinAttendantName: '',
    PIC: '',
    SIC: '',
    StandardStockNonPerishable: '',
    StandardStockPerishable: '',
  });
  const CRLF = 10;
  const BULLET = String.fromCharCode(45);

  const onTextAreaChange = (e) => {
    addBullet(e);
    setPreferenceList(e.target.value);
    console.log(preferenceList);
  };

  const addBullet = (e) => {
    const char = e.target.value.substr(-1).charCodeAt(0);
    const newLen = e.target.value.length;

    if (newLen > prevLength) {
      if (char === CRLF) e.target.value = `${e.target.value + BULLET} `;
      if (newLen === 1) e.target.value = `${BULLET} ${e.target.value}`;
    }
    setPrevLength(newLen);
  };
  return (
    <Form>
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
              id="AircraftMake"
              name="AircraftMake"
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
              // value={inputs.CabinAttendantName}
              // onChange={handleChange}
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
              // value={inputs.CabinAttendantName}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="SICEmail">
            SIC Email
            <input
              required
              type="text"
              id="SICEmail"
              name="SICEmail"
              // value={inputs.CabinAttendantName}
              // onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <ButtonGrid>
          <label htmlFor="CabinAttendantName">
            Cabin Attendant Name
            <input
              required
              type="text"
              id="CabinAttendantName"
              name="CabinAttendantName"
              // value={inputs.CabinAttendantName}
              // onChange={handleChange}
            />
          </label>
          <label htmlFor="CabinAttendantEmail">
            Cabin Attendant Email
            <input
              required
              type="text"
              id="CabinAttendantEmail"
              name="CabinAttendantEmail"
              // value={inputs.CabinAttendantName}
              // onChange={handleChange}
            />
          </label>
        </ButtonGrid>
        <label>
          Perishable Standard Stock
          <textarea
            id="txt"
            rows="30"
            cols="40"
            onChange={onTextAreaChange}
            value={preferenceList}
            placeholder="-"
          />
          <input type="hidden" id="prevLen" value={prevLength} />
        </label>
        <label>
          Non-Perishable Standard Stock
          <textarea
            id="txt"
            rows="30"
            cols="40"
            onChange={onTextAreaChange}
            value={preferenceList}
            placeholder="-"
          />
        </label>
        <input type="hidden" id="prevLen" value={prevLength} />
      </fieldset>
    </Form>
  );
}
