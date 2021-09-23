import React, { FC, useState } from "react";
import card from "../assets/card.png";
import { Card, Col, Empty, List, Row } from "antd";
import { IPokemonEdge } from "../constants";

interface IGridCardComponentProps {
  data: IPokemonEdge[];
}

export const GridCardComponent: FC<IGridCardComponentProps> = (
  props: IGridCardComponentProps
) => {
  const { Meta } = Card;
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");

  return (
    <div style={{ margin: "0px 100px 100px 100px" }}>
      {props.data.length > 0 ? (
        <Row>
          {props.data?.map((p: IPokemonEdge) => (
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
              key={p.cursor}
            >
              {p.cursor === selectedPokemon ? (
                <Card
                  key={p.cursor}
                  hoverable
                  style={{
                    width: 240,
                    minHeight: 350,
                    margin: "20px 0px 20px 0px",
                  }}
                  onClick={() => setSelectedPokemon("")}
                  title={p.node.name}
                >
                  <List
                    size="small"
                    header={<div>Types</div>}
                    bordered
                    dataSource={
                      props.data.find(
                        (elem: IPokemonEdge) => elem.cursor === selectedPokemon
                      )?.node.types
                    }
                    renderItem={(item: string) => <List.Item>{item}</List.Item>}
                  />
                </Card>
              ) : (
                <Card
                  key={p.cursor}
                  hoverable
                  style={{ width: 240, margin: "20px 0px 20px 0px" }}
                  cover={
                    <img
                      alt="example"
                      src={card}
                      style={{
                        maxWidth: "75%",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  }
                  onClick={() => setSelectedPokemon(p.cursor)}
                >
                  <Meta
                    title={p.node.name}
                    description={p.node.classification}
                  />
                </Card>
              )}
            </Col>
          ))}
        </Row>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
