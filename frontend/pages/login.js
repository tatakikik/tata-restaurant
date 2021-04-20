import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

const api = axios.create({
  baseURL: "http://localhost/api",
});

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const login = async () => {
    api
      .post(
        "/login",
        {
          username: username,
          password: password,
          remember: false,
          email: email,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setStatus("Login Success");
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
        setStatus("Login Failed");
      });
  };
  return (
    <Layout token={token}>
      <div className={styles.inputForm}>
        <p className={styles.loginTitle}>LOGIN</p>
        <input
          placeholder="Username"
          className={styles.inputField}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="Email"
          className={styles.inputField}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="Password"
          className={styles.inputField}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className={styles.loginButton} onClick={login}>
          Login
        </button>
        {status}
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
