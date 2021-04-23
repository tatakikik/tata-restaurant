import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
const api = axios.create({
  baseURL: "http://localhost/api",
});

const Layout = (props) => {
  const [loginName, setLoginName] = useState("");
  const router = useRouter();
  // let userName = localStorage.getItem("user");
  // console.log("username : ", userName);
  useEffect(() => {
    setLoginName(localStorage.getItem("user"));
    console.log(loginName);
  });
  const buttonMenu = () => {
    if (props.token != "" && loginName !== "admin") {
      return (
        <div className={styles.menucontainer}>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/reserve");
            }}
          >
            RESERVING
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              api
                .get("/logout", { withCredentials: true })
                .then((res) => {
                  console.log(res);
                  window.location.reload();
                  localStorage.removeItem("user");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            LOGOUT
          </button>
        </div>
      );
    } else if (props.token != "" && loginName === "admin") {
      return (
        <div className={styles.menucontainer}>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/reserve");
            }}
          >
            RESERVING
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/adminpage");
            }}
          >
            ADMIN
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              api
                .get("/logout", { withCredentials: true })
                .then((res) => {
                  console.log(res);
                  window.location.reload();
                  localStorage.removeItem("user");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            LOGOUT
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.menucontainer}>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/");
            }}
          >
            HOME
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/reserve");
            }}
          >
            RESERVING
          </button>
          <button
            className={styles.menubutton}
            onClick={() => {
              router.push("/login");
            }}
          >
            LOGIN
          </button>
        </div>
      );
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Tata Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.layouttitle}>
            {/* <img className={styles.logo} src={"img/logo.png"}></img> */}
            <h1 className={styles.title}>TATA RESTAURANT</h1>
          </div>
          {buttonMenu()}
        </div>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
