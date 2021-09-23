import { useLazyQuery, useQuery } from "@apollo/client";
import { Tabs } from "antd";
import React, { FC, useState } from "react";
import { GET_POKEMONS } from "../graphql/getPokemons";
import { IPokemonEdge } from "../constants";
import { GET_POKEMON_BY_NAME } from "../graphql/getPokemonByName";
import { HeaderComponent } from "../components/HeaderComponent";
import { PokemonTable } from "../components/pokemonTable";
import { IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { PaginationComponent } from "../components/paginationComponent";
import { GridCardComponent } from "../components/gridCardComponent";


export const HomeContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPokemonID, setCurrentPokemonId] = useState<string>("000");
  const [pokemonToSearch, setPokemonToSearch] = useState<string>("");
  const { data } = useQuery(GET_POKEMONS, {
    variables: { after: currentPokemonID },
  });
  const { TabPane } = Tabs;

  const [getPokemonDetails, { data: details }] = useLazyQuery(GET_POKEMON_BY_NAME, {
    variables: { q: pokemonToSearch },});

  //console.log("pokemons: ", data?.pokemons?.edges?.map((a:IPokemonEdge) => a.node));

  const handlePageChange = (page: number) => {
    //console.log(page);
    setCurrentPage(page);
    const pokemonID = (page - 1) * 10;
    if (pokemonID <= 99) setCurrentPokemonId("0" + pokemonID.toString());
    else setCurrentPokemonId(pokemonID.toString());
  };

 
  const handleSearchPokemon = (value: string) => {
    console.log(value);
    setPokemonToSearch(value.toLowerCase());
    getPokemonDetails();
  }

  const handleTabChange = (value: string) => {
    console.log("Current Tab: ", value)
    setCurrentPage(1);
    setCurrentPokemonId("000");
  }

  return (
    <>
      <HeaderComponent handleSearch={handleSearchPokemon}/>
      <Tabs defaultActiveKey="2" onChange={handleTabChange}>
      <TabPane
        tab={
          <span>
            <IdcardOutlined />
            Card View
          </span>
        }
        key="1"
      >
        <GridCardComponent data= {pokemonToSearch === "" ? data?.pokemons?.edges || [] : details?.pokemons?.edges || []} />
      </TabPane>
      <TabPane
        tab={
          <span>
            <TableOutlined />
            Tab View
          </span>
        }
        key="2"
      >
        <PokemonTable result ={pokemonToSearch === "" ? data?.pokemons?.edges?.map((a:IPokemonEdge) => a.node) : details?.pokemons?.edges?.map((a:IPokemonEdge) => a.node)}/>
      </TabPane>
    </Tabs>
   {pokemonToSearch === "" && <PaginationComponent currentPage={currentPage} handlePageChange={handlePageChange}/>}
    </>
  );
};
