import React, { useState } from "react";
import { Form, Input, Button, notification, Col, Card, Row, Divider, Space, Flex, Image } from "antd";
import { UserOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
// import { login } from '../services/authService';
import { AxiosError } from "axios";
import { login } from "../../services/authService";
import { useAuth } from "../Context/authContext2";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const token = await login(values);
      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in!",
      });
      authLogin(token);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        notification.error({
          message: "Login Failed",
          description: axiosError.message || "Invalid credentials", //axiosError.response.data.message
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: "An unknown error occurred",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ marginTop: "250px" }}>
        {/* style={{ minHeight: '100vh' }}> */}
        <Card
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            backgroundColor: "#bae0ff",
          }}
        >
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Form.Item>
            <Row align="middle" justify="center">
              Don't have an account?
              <Link to="/register">
                <Button type="link">Register</Button>
              </Link>
            </Row>
          </Form>
        </Card>

        <Card>
          <article
            className="anime"
            data-anime-id="11873"
            data-romaji="Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san"
            data-english="Alya Sometimes Hides Her Feelings in Russian"
            data-native="時々ボソッとロシア語でデレる隣のアーリャさん"
            data-alternate='["ロシデレ","roshidere","Alya-san, who sits besides me and sometimes murmurs affectionately in Russian.","Arya Next Door Sometimes Lapses into Russian","Arya Sometimes Hides Her Feelings in Russian"]'
            data-premiere="1720017000"
            data-premiere-precision="4"
            data-controller="anime-card"
            data-anime-card-list-target="card"
            data-action="anime-card-list:search@window->anime-card#applySearch"
            data-library-status=""
          >
            <div className="anime-card">
              <div
                className="anime-card--mark-menu"
                data-anime-card-target="marksMenu"
                data-action="mouseover->anime-card#showMarkMenu mouseout->anime-card#hideMarkMenu"
              >
                <div
                  className="anime-card--mark-menu--item"
                  data-action="click->anime-card#setLibraryStatus"
                  data-library-status="completed"
                >
                  Completed
                </div>
                <div
                  className="anime-card--mark-menu--item"
                  data-action="click->anime-card#setLibraryStatus"
                  data-library-status="watching"
                >
                  Watching
                </div>
                <div
                  className="anime-card--mark-menu--item"
                  data-action="click->anime-card#setLibraryStatus"
                  data-library-status="planning"
                >
                  Planning
                </div>
                <div
                  className="anime-card--mark-menu--item"
                  data-action="click->anime-card#setLibraryStatus"
                  data-library-status="considering"
                >
                  Considering
                </div>
                <div
                  className="anime-card--mark-menu--item"
                  data-action="click->anime-card#setLibraryStatus"
                  data-library-status="skipping"
                >
                  Skipping
                </div>
              </div>

              {/* <div
              className="mark-icon anime-card--mark-button"
              data-action="click->anime-card#showLibraryInput"
              title="My List"
            >
              <svg
                className="anime-card--mark-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-controller="mark-icon"
                data-mark-icon-viewer-status-value=""
                data-anime-card-target="markIcon"
              >
                <use
                  href="#icon:mark:none"
                  data-mark-icon-target="primaryPath"
                ></use>
              </svg>
            </div> */}
              <h3 className="main-title">
                <a data-anime-card-target="mainTitle" href="/anime/11873">
                  Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san
                </a>
              </h3>
              <ol className="anime-tags">
                <li>
                  <a href="/tags/5">Comedy</a>
                </li>
                <li>
                  <a href="/tags/34">Romance</a>
                </li>
                <li>
                  <a href="/tags/36">School</a>
                </li>
              </ol>
              <div className="poster-container" data-anime-card-target="posterContainer">
                <a
                  className="episode-countdown"
                  href="/anime/11873/schedules/1224"
                  data-anime-card-target="releaseOverlay"
                  data-schedule-id="1224"
                >
                  <div className="release-schedule-info">EP9 · TV (JP)</div>
                  <time className="text-bold" data-anime-card-target="countdown" data-timestamp="1724855400">
                    3d 23h 08m 57s
                  </time>
                </a>
                <img
                  alt="Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san"
                  width="175"
                  height="250"
                  data-anime-card-target="poster"
                  //srcset="https://u.livechart.me/anime/11873/poster_image/9f75494f6094a1c1f863b472d2699507.webp/small.jpg 1x, https://u.livechart.me/anime/11873/poster_image/9f75494f6094a1c1f863b472d2699507.webp/large.jpg 2x"
                  loading="lazy"
                  decoding="async"
                  src="https://u.livechart.me/anime/11873/poster_image/9f75494f6094a1c1f863b472d2699507.webp/small.jpg"
                />
                <div className="anime-extras">
                  <div
                    className="anime-avg-user-rating"
                    title="8.62 out of 10 based on 2,054 user ratings"
                    data-action="click->anime-card#showLibraryEditor"
                  >
                    <i className="icon-star"></i>8.62
                  </div>
                </div>
              </div>
              <div className="anime-info">
                <ul className="anime-studios">
                  <li>
                    <a href="/studios/35" data-anime-card-target="studioLink">
                      Doga Kobo
                    </a>
                  </li>
                </ul>
                <div className="anime-date" data-action="click->anime-card#showPremiereDateTime">
                  Jul 3, 2024 at 5:30pm +03
                </div>
                <div className="anime-metadata">
                  <div className="anime-source">Light Novel</div>
                  <div className="anime-episodes">12 eps × 25m</div>
                </div>
                <div className="anime-synopsis" data-anime-card-target="synopsis">
                  <p>
                    Alya is a transfer student enjoying popularity at her new high school, often sporting a cold shoulder while earning high
                    marks in class. She ignores her nerdy classmate, Kuze Masachika, except for when she blurts out a flirtatious line to
                    him in Russian. Little does she know, Kuze understands Russian, though he pretends not to. Let’s see where this wacky
                    love story takes them!
                  </p>
                  <p className="text-italic">[Source: Crunchyroll]</p>
                </div>
              </div>
              <div className="related-links">
                <div className="icon-buttons-set">
                  <a className="website-icon" href="https://roshidere.com/" target="_blank" rel="noopener nofollow"></a>
                  <a className="preview-icon" href="/anime/11873/videos" data-action="anime-card#showVideos"></a>
                  <a className="watch-icon" href="/anime/11873/streams" data-action="anime-card#showStreams"></a>
                  <a className="twitter-icon" href="https://x.com/roshidere" target="_blank" rel="noopener nofollow"></a>
                  <a className="anilist-icon" href="https://anilist.co/anime/162804" target="_blank" rel="noopener nofollow"></a>
                  <a className="mal-icon" href="https://myanimelist.net/anime/54744" target="_blank" rel="noopener nofollow"></a>
                  <a className="anidb-icon" href="http://anidb.net/a17914" target="_blank" rel="noopener nofollow"></a>
                  <a
                    className="anime-planet-icon"
                    href="http://www.anime-planet.com/anime/alya-sometimes-hides-her-feelings-in-russian"
                    target="_blank"
                    rel="noopener nofollow"
                  ></a>
                  <a className="anisearch-icon" href="https://www.anisearch.com/anime/18275" target="_blank" rel="noopener nofollow"></a>
                  <a className="kitsu-icon" href="https://kitsu.app/anime/47192" target="_blank" rel="noopener nofollow"></a>
                  <a
                    className="crunchyroll-icon"
                    href="https://www.crunchyroll.com/series/G1XHJV0XM"
                    target="_blank"
                    rel="noopener nofollow"
                  ></a>
                </div>
              </div>
            </div>
          </article>
        </Card>
      </Row>
    </>
  );
};

export default Login;
