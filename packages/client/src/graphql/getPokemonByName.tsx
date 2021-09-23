import { gql } from "@apollo/client";

export const GET_POKEMON_BY_NAME = gql`
  query getPokemonsByName($q: String) {
    pokemons(q: $q) {
      edges {
        cursor
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
