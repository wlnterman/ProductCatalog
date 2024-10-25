import { Col, Divider, Row, Image } from "antd";
// import { Button, Col, Divider, Dropdown, Image, MenuProps, Row, Space } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { AnDescription, AnImages } from "../AnDat";

interface IADProps {
  RNG: any;
}

export const ImageAndDescription: React.FC<IADProps> = ({ RNG }) => {
  return (
    <Row style={{ flexFlow: "row", textAlign: "center", margin: "auto" }}>
      <Col style={{ width: "176px", height: "250px", backgroundColor: "green", display: "block" }}>
        <a
          className="episode-countdown"
          href="https://www.livechart.me/anime/11873/schedules/1224"
          data-anime-card-target="releaseOverlay"
          data-schedule-id="1224"
          style={{ background: "rgba(0,0,0,.65)", color: "#fff", backdropFilter: "8px", width: "100%", position: "absolute", zIndex: 5 }}
        >
          <div className="release-schedule-info">EP9 · TV (JP)</div>
          <Countdown
            valueStyle={{
              background: "rgba(0,0,0,.65)",
              fontSize: "14px",
              color: "#fff",
              backdropFilter: "8px",
              width: "100%",
              position: "absolute",
              textAlign: "center",
              zIndex: 5,
            }}
            value={Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * RNG}
            //            мсек в сек \сек \ мин \час\
            //2 дня 30 сек
            format=" Dd HH[h] mm[m] ss[s]"
          />
          {/* <time className="text-bold" data-anime-card-target="countdown" data-timestamp="1724855400">

              3d 23h 08m 57s
            </time> */}
        </a>
        <Image width={175} height={250} src={AnImages[RNG]} />
        <div
          style={{
            transition: "opacity .15s linear",
            // top: "210px",
            bottom: 0,
            left: "0",
            position: "absolute",
            fontSize: ".95em",
            color: "#fff",
            zIndex: "5",
          }}
        >
          <div
            style={{
              padding: ".5em 1em",
              background: "rgba(0,0,0,.65)",
              borderRadius: "20em",
              margin: ".5em",
              cursor: "pointer",
            }}
            title="8.60 out of 10 based on 2,601 user ratings"
            data-action="click->anime-card#showLibraryEditor"
          >
            <i className="icon-star"></i>
            8.60
          </div>
        </div>
      </Col>
      <Col style={{ height: "250px", display: "flex", flexFlow: "column", margin: "auto" }}>
        {/* display: "flex", flexFlow: "column" */}
        <Row style={{ backgroundColor: "rgba(255,255,255,.2)" }}>
          <Row style={{ height: 23, margin: "auto" }}>
            <a href="https://www.livechart.me/studios/35">Doga Kobo</a> {" x "}
            <a href="/studios/67" data-anime-card-target="studioLink">
              MAPPA
            </a>
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row style={{ padding: "5 0", color: "#767676", margin: "auto", borderBottom: "1px solid rgba(118, 118, 118, .1)" }}>
            Jul 3, 2024 at 5:30pm +03
          </Row>
          <Divider style={{ margin: 0 }} />
          <Row
            style={{
              padding: "5 0",
              width: "80%",
              margin: "auto",
              justifyContent: "space-around",
              borderBottom: "1px solid rgba(118, 118, 118, .1)",
              color: "#767676",
            }}
          >
            <div>Light Novel</div>
            <div>12 eps × 25m</div>
          </Row>
        </Row>
        <Divider style={{ margin: 0 }} />
        <Row style={{ overflowY: "scroll", textAlign: "left", padding: 6, scrollbarWidth: "thin" }}>
          {AnDescription[RNG]}
          <p>[Source: Crunchyroll]</p>
        </Row>
      </Col>
    </Row>
  );
};
