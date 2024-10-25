import React from "react";
import { Col, Divider, Row } from "antd";
import AnCard from "../AnCard/AnCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const LiveChart: React.FC = () => {
  // new Date().getFullYear()
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 2;
  var header1 = "";
  var header2 = "";

  if (curMonth >= 0 && curMonth <= 2) {
    header1 = "January " + curYear + "–March " + curYear;
    header2 = "Winter " + curYear + "Anime";
  } else if (curMonth >= 3 && curMonth <= 5) {
    header1 = "April " + curYear + "-June " + curYear;
    header2 = "Spring " + curYear + "Anime";
  } else if (curMonth >= 6 && curMonth <= 8) {
    header1 = "July " + curYear + "-September " + curYear;
    header2 = "Summer " + curYear + "Anime";
  } else if (curMonth >= 9 && curMonth <= 11) {
    header1 = "October " + curYear + "-December " + curYear;
    header2 = "Fall " + curYear + "Anime";
  }

  return (
    <>
      <div
        style={{
          display: "inline-flex",
        }}
      >
        <div style={{ alignSelf: "end" }} title="Previous season">
          <a
            style={{
              color: "#3b97fc",
              fontWeight: 400,
              fontSize: "2rem",
            }}
            className="svg-icon-button"
            href="https://www.livechart.me/spring-2024/tv"
          >
            {/* &lt;
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-icon" width="1em" height="1em">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg> */}
            <LeftOutlined />
          </a>
        </div>
        <div className="page-header-box__content">
          <div>
            {header1}
            {header2}
          </div>
          <div>July 2024–September 2024</div>
          <div
            style={{
              background: "#f5f5f5",
              fontFamily: "helvetica neue,Helvetica,Roboto,Arial,sans-serif",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "2rem",
            }}
          >
            <a href="https://www.livechart.me/summer-2024/tv" target="blank">
              Summer 2024 Anime
            </a>
          </div>
        </div>
        <div style={{ alignSelf: "end" }} title="Previous season">
          <a style={{ color: "#3b97fc", fontWeight: 400, fontSize: "1.7rem" }} href="https://www.livechart.me/fall-2024/tv">
            <RightOutlined />
          </a>
        </div>

        <div className="page-header-box__navigation-button -next" title="Following season">
          <a className="svg-icon-button" href="https://www.livechart.me/fall-2024/tv">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-icon" width="1em" height="1em">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </a>
        </div>
      </div>

      <Divider style={{ marginTop: "6px" }} />

      <Row gutter={[16, 16]}>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>

        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>

        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>

        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
        <Col lg={12} xl={8} xxl={6}>
          <AnCard />
        </Col>
      </Row>
    </>
  );
};

export default LiveChart;
