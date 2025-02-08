import { Space } from "antd";

export const LinkFooter: React.FC = () => {
  const siteLink = {
    borderRadius: "50%",
    display: "inline-block",
    height: "30px",
    width: "30px",
    // background:
    //   "url(https://s.livechart.me/assets/light-theme-sprites@2x-85a5b1f3eff75668ef4450847ae131bc96026567490218fb3eca5898e79ae6d5.png)",
    background:
      "image-set(url(https://s.livechart.me/assets/light-theme-sprites@1x-0e57c1123f7ff33048c754794f556911de516d1b8b00a9bcddce72890f4413c2.png) 1x",
    // backgroundPosition: "0 -270px",
  };

  return (
    <Space
      style={{
        justifyContent: "center",
        verticalAlign: "middle",
        gap: ".3rem",
        margin: "auto",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,.2)",
      }}
    >
      {/* <a className="website-icon" href="https://roshidere.com/" target="blank">
          <GlobalOutlined />
        </a> */}
      {/* className="website-icon" */}
      <a href="https://roshidere.com/" target="blank" style={{ ...siteLink, backgroundPosition: "0 -270px" }} />
      {/* className="preview-icon" */}
      <a href="/anime/11873/videos" data-action="anime-card#showVideos" style={{ ...siteLink, backgroundPosition: "0 -330px" }} />
      {/* className="watch-icon" */}
      <a href="/anime/11873/streams" data-action="anime-card#showStreams" style={{ ...siteLink, backgroundPosition: "0 -60px" }} />
      {/* className="twitter-icon" */}
      <a href="https://x.com/roshidere" target="blank" style={{ ...siteLink, backgroundPosition: "0 -210px" }} />
      {/* className="anilist-icon" */}
      <a href="https://anilist.co/anime/162804" target="blank" style={{ ...siteLink, backgroundPosition: "0 -90px" }} />
      {/* className="mal-icon" */}
      <a href="https://myanimelist.net/anime/54744" target="blank" style={{ ...siteLink, backgroundPosition: "0 -390px" }} />
      {/* className="anidb-icon" */}
      <a href="http://anidb.net/a17914" target="blank" style={{ ...siteLink, backgroundPosition: "0 -360px" }} />
      {/* className="anime-planet-icon" */}
      <a
        href="http://www.anime-planet.com/anime/alya-sometimes-hides-her-feelings-in-russian"
        target="blank"
        style={{ ...siteLink, backgroundPosition: "-30px -240px" }}
      />
      {/* className="anisearch-icon" */}
      <a href="https://www.anisearch.com/anime/18275" target="blank" style={{ ...siteLink, backgroundPosition: "0 -120px" }} />
      {/* className="kitsu-icon" */}
      <a href="https://kitsu.app/anime/47192" target="blank" style={{ ...siteLink, backgroundPosition: "-30px -300px" }} />
      {/* className="crunchyroll-icon" */}
      <a href="https://www.crunchyroll.com/series/G1XHJV0XM" target="blank" style={{ ...siteLink, backgroundPosition: "-30px -420px" }} />
      {/* <a href="/anime/11873/videos" style={{ ...siteLink, backgroundPosition: "0 -30px" }} /> */}
    </Space>
  );
};
