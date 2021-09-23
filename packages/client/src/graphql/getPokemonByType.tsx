import { gql } from "@apollo/client";

export const GET_POKEMON_BY_TYPE = gql`
  query getPokemonsByType($type: String) {
    pokemonsByType(type: $type) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
    }
  }
`;
