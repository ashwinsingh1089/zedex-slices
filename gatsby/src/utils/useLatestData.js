import React, { useState, useEffect } from 'react';

const gql = String.raw;
const deets = gql`
  
    slug {
      current
    }
    name

    _id
    image {
      asset {
        metadata{
        lqip
        }
        url 
      }
    }
  
`;
export default function useLatestData() {
  // Hot slices
  const [hotSlices, setHotSlices] = useState([]);
  const [slicemasters, setSlicemasters] = useState([]);
  const [loading, setLoading] = useState(false);

  // use a sideeffect to fetch data from graphql endpoint

  useEffect(() => {
    // fetch data when component loads
    setLoading(true);
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        setHotSlices(res?.data?.StoreSettings?.hotSlices);
        setSlicemasters(res?.data?.StoreSettings?.slicemaster);
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { hotSlices, slicemasters, loading };
}
