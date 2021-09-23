import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons($after: ID) {
    pokemons(after: $after) {
      edges {
        cursor
        node {
          id
          name
          classification
          types
        }
      }
    }
  }
`;
