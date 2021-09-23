import { Pagination } from "antd";
import React, { FC } from "react";

interface IPaginationProps {
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export const PaginationComponent: FC<IPaginationProps> = (
  props: IPaginationProps
) => {
  return (
    <Pagination
      current={props.currentPage}
      pageSize={10}
      total={151}
      style={{ paddingBottom: "100px" }}
      onChange={props.handlePageChange}
    />
  );
};
