import React from 'react';
import { graphql } from 'gatsby';
import { Img } from 'gatsby-image';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;
function SingleBeer({ beer }) {
  const rating = Math.round(beer.rating.average);
  return (
    <SingleBeerStyles>
      <img src={beer.image} alt={beer.name} />
      <h3 className="nam">{beer.name}</h3>
      <span className="price">{beer.price}</span>
      <p>
        {`⭐`.repeat(rating)}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐`.repeat(5 - rating)}
        </span>
      </p>
    </SingleBeerStyles>
  );
}

export default function Beers({ data: { beers } }) {
  return (
    <BeerGridStyles>
      {beers.nodes.map((beer) => (
        <SingleBeer beer={beer} key={beer.id} />
      ))}
    </BeerGridStyles>
  );
}

export const query = graphql`
  query BeersQuery {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
