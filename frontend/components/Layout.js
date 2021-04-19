import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();
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
                router.push("/");
              }}
            >
              RESERVE
            </button>
            <button
              className={styles.menubutton}
              onClick={() => {
                router.push("/");
              }}
            >
              LOGIN
            </button>
            <button
              className={styles.menubutton}
              onClick={() => {
                router.push("/");
              }}
            >
              REGISTER
            </button>
          </div>
        </div>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
