import React, { FC } from "react";
import logo from "../assets/logo.png";
import { PageHeader } from "antd";
import Search from "antd/lib/input/Search";

interface IHeaderProps {
  handleSearch: (value: string) => void;
}

export const HeaderComponent: FC<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <PageHeader
      extra={
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ maxWidth: "15%", height: "auto" }} />
          <Search
            placeholder="Search by name"
            allowClear
            style={{ width: "500px" }}
            onSearch={props.handleSearch}
          />
        </div>
      }
    />
  );
};
