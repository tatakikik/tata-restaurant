import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const Home = ({ token }) => {
  const router = useRouter();
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=8.403871527730571&lon=98.24652129783247&exclude=hourly,daily&lang=th&appid=2b8e238c52f39a3090db73edfb1da3c5"
    )
    .then((res) => {
      console.log(res);
      setTemp(parseInt(res.data.current.temp) - 273.15);
      setWeather(res.data.current.weather[0].description);
    })
    .catch((error) => {
      console.log(error);
    });

  const weatherData = () => {
    if (temp != "") {
      return (
        <div className={styles.column}>
          <p className={styles.temp}>{temp.toFixed(2)} °C</p>
          <p className={styles.weather}>{weather}</p>
        </div>
      );
    }
  };

  return (
    <Layout token={token}>
      {/* <img className={styles.images} src={"img/tata.jpg"}></img> */}
      <div className={styles.welcomecard}>
        <div style={{ marginTop: "2vh" }}>
          <p style={{ color: "#000", fontSize: "80px", fontWeight: "400" }}>
            WELCOME
          </p>
          <p
            style={{
              color: "#dd2803",
              fontSize: "60px",
              fontWeight: "900",
              marginTop: "-50px",
            }}
          >
            TATA RESTAURANT
          </p>
          <p
            style={{
              color: "#dd2803",
              fontSize: "32px",
              fontWeight: "600",
              marginTop: "-20px",
            }}
          >
            THAI MUEANG @ PHANG-NGA
          </p>
          <button
            onClick={() => {
              router.push("/reserve");
            }}
            className={styles.reserveBtn}
          >
            RESERVE
          </button>
        </div>
        <img className={styles.images} src={"img/Kung.png"}></img>
      </div>
      <div className={styles.center}>
        <div className={styles.suggestMenu}>
          <div className={styles.center}>
            <p className={styles.menuName} style={{ color: "white" }}>
              -
            </p>
            <img className={styles.suggestImage} src={"img/sug1.jpg"}></img>
            <p className={styles.menuName}>กุ้งชุบแป้งทอด</p>
          </div>
          <div className={styles.center}>
            <p
              style={{
                fontSize: "35px",
                fontWeight: "900",
                marginTop: "15px",
              }}
              className={styles.menuName}
            >
              {" "}
              - SUGGEST MENU-
            </p>
            <img className={styles.suggestImage} src={"img/sug2.jpg"}></img>
            <p className={styles.menuName}>ปลาราดพริก</p>
          </div>
          <div className={styles.center}>
            <p className={styles.menuName} style={{ color: "white" }}>
              -
            </p>
            <img className={styles.suggestImage} src={"img/sug3.jpg"}></img>
            <p className={styles.menuName}>ปูนิ่มทอดกระเทียม</p>
          </div>
        </div>
        <div className={styles.weathercard}>
          <p
            style={{
              fontSize: "36px",
              fontWeight: "900",
              marginTop: "-15px",
            }}
            className={styles.menuName}
          >
            WEATHER @ TATA RESTAURANT
          </p>
          {weatherData()}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
