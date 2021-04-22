import Layout from "../components/Layout";
import Authen from "../components/Authen";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost/api",
});

const Reserve = ({ token }) => {
  let loginName;
  useEffect(() => {
    loginName = localStorage.getItem("user");
    console.log(loginName);
  });
  const [reserveName, setReserveName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reserveList, setReserveList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const addReserve = () => {
    api
      .post("/addReserve", {
        reserveName: reserveName,
        telephone: telephone,
        date: date,
        time: time,
        username: loginName,
      })
      .then((res) => {
        console.log(res);
        getReserve();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getReserve = () => {
    api
      .get("/reserve", {
        headers: {
          search: loginName,
        },
      })
      .then((res) => {
        console.log(res);
        setReserveList(res.data.newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveEdit = async () => {
    console.log("save edit");
    await api
      .put("/updateReserve", {
        reserveName: reserveName,
        telephone: telephone,
        date: date,
        time: time,
        editID: editID,
      })
      .then((res) => {
        getReserve();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const listItem = reserveList.map((res) => (
    <div key={res.id} className={styles.reserveList}>
      <div>
        <div>Name : {res.data.reserveName}</div>
        <p>Date : {res.data.date}</p>
        <p>Time : {res.data.time}</p>
        <div>
          <button onClick={() => edit(res.id)} className={styles.miniButton}>
            EDIT
          </button>
          <button className={styles.miniButton}>DELETE</button>
        </div>
      </div>
    </div>
  ));
  const editeForm =
    isEdit == true ? (
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
            <button onClick={() => saveEdit()} className={styles.reserveButton}>
              SAVE EDIT
            </button>
          </div>
        </div>
      </div>
    ) : (
      console.log(isEdit)
    );
  const edit = (id) => {
    console.log(id);
    setEditID(id);
    setIsEdit(true);
  };
  return (
    <Layout token={token}>
      <div className={styles.reserveCard}>
        <p className={styles.reserveTitle}>ONLINE RESERVE</p>
        <button onClick={() => getReserve()} className={styles.reserve2Button}>
          SHOW RESERVE
        </button>
      </div>

      <div>{editeForm}</div>

      <div className={styles.center}>
        <div className={styles.reserveListRow}>{listItem}</div>
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
      </div>
    </Layout>
  );
};

export default Authen(Reserve);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
