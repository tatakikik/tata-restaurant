import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      {/* <img className={styles.images} src={"img/tata.jpg"}></img> */}
      <div className={styles.welcomecard}>
        <div>
          <p style={{ color: "#000", fontSize: "64px", fontWeight: "400" }}>
            Welcome
          </p>
          <p
            style={{
              color: "#dd2803",
              fontSize: "90px",
              fontWeight: "bold",
              marginTop: "-60px",
            }}
          >
            Tata Restaurant
          </p>
          <p
            style={{
              color: "#dd2803",
              fontSize: "48px",
              fontWeight: "400",
              marginTop: "-100px",
            }}
          >
            @Phang-nga
          </p>
        </div>
        <img className={styles.images} src={"img/Kung.png"}></img>
      </div>
    </Layout>
  );
};

export default Home;
