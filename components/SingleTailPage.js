/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import ErrorComponent from './ErrorComponent';
import Trips from './Trips';
import LargeHeaderCard from '../styles/SingleTail';
import ButtonGrid from '../styles/ButtonGrid';

export const SINGLE_TAIL_QUERY = gql`
  query SINGLE_TAIL_QUERY($Slug: String!) {
    tailNumbers(filters: { Slug: { eq: $Slug } }) {
      data {
        id
        attributes {
          TailNumber
          Owner
          PIC
          SIC
          CabinAttendant
          StandardStockNonPerishable
          StandardStockPerishable
          AircraftType
          HomeICAO
          Slug
          trips {
            data {
              id
              attributes {
                StartDate
                EndDate
                Routing
                uuid
                Feedback
                DebriefComplete
                Slug
              }
            }
          }
        }
      }
    }
  }
`;

export default function TailPage({ id }) {
  const { data, loading, error } = useQuery(SINGLE_TAIL_QUERY, {
    variables: { Slug: id },
  });
  const tailData = data?.tailNumbers?.data[0]?.attributes;
  if (loading) return <h3>Loading</h3>;
  if (error) return <ErrorComponent error={error.message} />;

  const styleObj = { display: 'flex', flexDirection: 'column' };
  return (
    <div style={{ background: '#93dbfb' }}>
      <LargeHeaderCard>
        <div>
          <h2>
            <strong>{tailData.TailNumber}</strong>
          </h2>
          <hr />
          <p>
            <strong>Owner:</strong> {tailData.Owner}
          </p>
          <p>
            <strong>PIC:</strong> {tailData.PIC}
          </p>
          <p>
            <strong>SIC:</strong>
            {tailData.SIC}
          </p>
          <p>
            <strong>Cabin Attendant:</strong> {tailData.CabinAttendant}
          </p>
        </div>
        <div style={{ display: 'grid', gap: '1em' }}>
          <p>
            <strong>Non-Perishable Standard Stock:</strong>
          </p>
          {'\n'}
          <div
            dangerouslySetInnerHTML={{
              __html: tailData.StandardStockNonPerishable,
            }}
          />
          <p>
            <strong>Perishable Standard Stock:</strong>
          </p>
          {'\n'}
          <div
            dangerouslySetInnerHTML={{
              __html: tailData.StandardStockPerishable,
            }}
          />
          <ButtonGrid alignItems="end" placeSelf="end">
            <Link
              href={{
                pathname: `/newtrip/${tailData.Slug}`,
                query: {
                  tailNumber: tailData.TailNumber,
                },
              }}
            >
              <button type="button">Add a trip</button>
            </Link>
            <Link href={`/edittail/${tailData.Slug}`}>
              <button type="button">Edit Tail Details</button>
            </Link>
          </ButtonGrid>
        </div>
      </LargeHeaderCard>
      <Trips tailNum={tailData.Slug} trips={tailData.trips} />
    </div>
  );
}
