import Layout from "../components/Layout";
import Authen from "../components/Authen";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost/api",
});

const Reserve = ({ token }) => {
  // api
  //   .get("/reserve")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  const [reserveName, setReserveName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const addReserve = () => {
    api.post("/addReserve", {
      reserveName: reserveName,
      telephone: telephone,
      date: date,
      time: time,
    });
  };
  return (
    <Layout token={token}>
      <div className={styles.reserveCard}>
        <p className={styles.reserveTitle}>ONLINE RESERVE</p>
      </div>
      <div style={{ marginTop: "50px" }} className={styles.center}>
        <div className={styles.reserveBox}>
          <div className={styles.reserveInputRow}>
            <input
              onChange={(e) => setReserveName(e.target.value)}
              placeholder="Name"
              className={styles.reserveInputField}
            ></input>
            <input
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Telephone"
              className={styles.reserveInputField}
            ></input>
          </div>
          <div className={styles.reserveInputRow}>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              data-date-format="DD MMMM YY"
              placeholder="Date"
              className={styles.reserveInputField}
            ></input>
            <input
              onChange={(e) => setTime(e.target.value)}
              type="time"
              placeholder="Time"
              className={styles.reserveInputField}
            ></input>
          </div>
          <div>
            <button
              onClick={() => addReserve()}
              className={styles.reserveButton}
            >
              RESERVE
            </button>
          </div>
        </div>
        <div>
          <p
            style={{ fontFamily: "Kanit", marginTop: "30px" }}
            className={styles.loginTitle}
          >
            รายการจอง
          </p>
          <p
            style={{
              fontFamily: "Kanit",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            ไม่มีรายการจอง
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Reserve;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
