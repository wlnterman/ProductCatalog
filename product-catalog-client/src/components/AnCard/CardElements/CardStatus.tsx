import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";

interface IADProps {
  cardBackground: any;
  setCardBackground: any;
}

export const CardStatus: React.FC<IADProps> = ({ cardBackground, setCardBackground }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div style={{ textAlign: "end" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#6384ca", width: "100%", textAlign: "end" }}
            onClick={() => setCardBackground(cardBackground === "#c6d6f0" ? "#fff" : "#c6d6f0")} //"#8aa3d7")}
          >
            Completed
          </Button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div style={{ textAlign: "end" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#20bf4a" }}
            onClick={() => setCardBackground(cardBackground === "#d3e8ba" ? "#fff" : "#d3e8ba")} //"#58cf77")}
          >
            Watching
          </Button>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div style={{ backgroundColor: "#b05dcd", textAlign: "end" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#b05dcd" }}
            // "#c486da"
            onClick={() => setCardBackground(cardBackground === "#efdff5" ? "#fff" : "#efdff5")} //"#efdff5")} raven
          >
            Planning
          </Button>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div style={{ textAlign: "end" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#eeb211", width: "100%" }}
            onClick={() => setCardBackground(cardBackground === "#ffffcc" ? "#fff" : "#ffffcc")} //"#f2c54d")}
          >
            Considering
          </Button>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div style={{ background: "#ff482b", textAlign: "end" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#ff482b" }}
            onClick={() => setCardBackground(cardBackground === "#ffdad5" ? "#fff" : "#ffdad5")} //"#ff7660")} opacity: .25
          >
            Skipping
          </Button>
        </div>
      ),
    },
  ];
  //  '#ffffff' '#00ba72' '#20bf4a' '#b05dcd' '#eeb211' '#ff8862' '#b58178' '#ff482b'

  return (
    <div
      style={{
        right: "0.7rem",
        top: "2rem",
        lineHeight: "2.8",
        zIndex: "2",
        overflow: "hidden",
        position: "absolute",
        maxWidth: "2rem",
        whiteSpace: "nowrap",
        opacity: 1,
        background: "#aaa",
        transition: "opacity .218s linear",
      }}
    >
      <Dropdown
        menu={{ items }}
        //trigger={["click"]}
        placement="bottomRight"
        destroyPopupOnHide
        //overlayStyle={{ background: "red" }}
        // https://ant.design/components/dropdown
        // https://ant.design/components/badge
        // https://ant.design/components/progress
        // https://ant.design/components/button

        // https://ant.design/components/tree
        dropdownRender={(menu) => (
          <div>
            {React.cloneElement(menu as React.ReactElement)}
            {/* <Divider style={{ margin: 0 }} />
            <Space style={{ background: "#20bf4a", width: "100%", textAlign: "end" }}>
              <div>Click me!</div>
            </Space> */}
          </div>
        )}
      >
        <DownOutlined />
      </Dropdown>
    </div>
  );
};
