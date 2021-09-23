import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

export interface IPokemon {
  id: string;
  name: string;
  types: string[];
  classification: string;
}

export interface IPokemonEdge {
  cursor: string;
  node: IPokemon;
}

export interface IPokemonConnection {
  edges: IPokemonEdge[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export const PokemonTableColumns: ColumnsType<IPokemon> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
  },
  {
    title: "Types",
    dataIndex: "types",
    key: "types",
    render: (types) => (
      <>
        {types.map((type: string, index: number) => {
          return (
            <Tag color="green" key={index}>
              {type.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];
