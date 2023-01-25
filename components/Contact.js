import Image from 'next/image';
import { useState } from 'react';
import CardItem from '../styles/CardItem';
import MasterGrid from '../styles/MasterGrid';
import WindownoBG from '../public/images/WindownoBG.png';
import Form from '../styles/Form';
import ButtonGrid from '../styles/ButtonGrid';

export default function Contact() {
  const [info, setInfo] = useState({
    Name: '',
    EmailAddress: '',
    Subject: '',
    Message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(info);
  };
  return (
    <MasterGrid justifyContent="center">
      <CardItem
        height="min-content"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={WindownoBG} height="1em" width="1em" />
        {!submitted ? (
          <>
            <h3 style={{ textAlign: 'center' }}>
              Get in touch using the form below!
            </h3>
            <Form onSubmit={handleSubmit} padding="0px">
              <label htmlFor="Name">
                Name
                <input
                  required
                  type="text"
                  id="Name"
                  name="Name"
                  placeholder="Your name"
                  value={info.Name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="EmailAddress">
                Email Address
                <input
                  required
                  type="text"
                  id="EmailAddress"
                  name="EmailAddress"
                  placeholder="ex: jon@gmail.com"
                  value={info.EmailAddress}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="Subject">
                Subject
                <input
                  required
                  type="text"
                  id="Subject"
                  name="Subject"
                  placeholder="Subject"
                  value={info.subject}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="Message">
                Message
                <textarea
                  type="text"
                  id="Message"
                  name="Message"
                  placeholder=""
                  value={info.message}
                  onChange={handleChange}
                />
              </label>
              <ButtonGrid>
                <button type="submit">Submit</button>
                <button type="button">Clear Form</button>
              </ButtonGrid>
            </Form>
          </>
        ) : (
          <div>
            Thanks for getting in touch, {info.Name}. We'll get back to you as
            soon as possible! Happy flying!
          </div>
        )}
      </CardItem>
    </MasterGrid>
  );
}
