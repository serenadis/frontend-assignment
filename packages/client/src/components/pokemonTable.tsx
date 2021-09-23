import { Table } from "antd";
import React, { FC } from "react";
import { IPokemon, PokemonTableColumns } from "../constants";

interface IPokemonTableProps {
  result: IPokemon[];
}

export const PokemonTable: FC<IPokemonTableProps> = (
  props: IPokemonTableProps
) => {
  return (
    <Table
      columns={PokemonTableColumns}
      dataSource={props.result}
      rowKey="id"
      pagination={{ position: ["none"] }}
      style={{ marginBottom: 100 }}
    />
  );
};
