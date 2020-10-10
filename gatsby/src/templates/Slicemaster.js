import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemasterPage({ data: { person } }) {
  return (
    <div className="center">
      <Img fluid={person.image.asset.fluid} />
      <div>
        <h2 className="mark">{person.name}</h2>
        <div className="description">{person.description}</div>
      </div>
    </div>
  );
}
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
