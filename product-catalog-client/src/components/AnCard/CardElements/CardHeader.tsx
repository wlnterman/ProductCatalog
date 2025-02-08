import { Divider, Row, Space } from "antd";
import { AnLinks, AnNames } from "../AnDat";
import { UpSquareOutlined } from "@ant-design/icons";

interface IADProps {
  RNG: any;
}

export const CardHeader: React.FC<IADProps> = ({ RNG }) => {
  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          //backgroundColor: "rgba(#767676, 0.7)", //cardBackground, //"#fff",
          backgroundColor: "#fff",
          display: "block",
          position: "absolute",
          alignContent: "center",
          zIndex: 5,
          right: ".1em",
          top: "-.9em",
          width: "2em",
          height: "2em",
          boxShadow: "0 1px 1px 1px rgba(0,0,0,.1)",
        }}
      >
        <UpSquareOutlined />
        {/* <TagOutlined /> */}
        {/* [/\] */}
      </div>

      <Row
        style={{
          height: 36,
          paddingInline: 20,
          fontSize: "1.1em",
          fontWeight: 600,
          lineHeight: 1.1,
          color: "#3b97fc",
          alignItems: "center",
        }}
      >
        {/* <a href="https://www.livechart.me/anime/11873">Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san</a> */}
        <a href={AnLinks[RNG]} style={{ margin: "0 auto" }}>
          {AnNames[RNG]}
        </a>
      </Row>
      {/* janers */}
      <Row>
        <Space style={{ height: 21, justifyContent: "space-between", textAlign: "center", margin: "auto", color: "#767676" }} split=" · ">
          <div>
            <a href="https://www.livechart.me/tags/5">Comedy</a>
          </div>

          <div>
            <a href="https://www.livechart.me/tags/34">Romance</a>
          </div>
          <div>
            <a href="https://www.livechart.me/tags/36">School</a>
          </div>
        </Space>
      </Row>
      <Divider style={{ margin: 0 }} />
    </>
  );
};
