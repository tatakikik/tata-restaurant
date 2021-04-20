import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

const Home = ({ token }) => {
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
              fontSize: "84px",
              fontWeight: "900",
              marginTop: "-60px",
            }}
          >
            TATA RESTAURANT
          </p>
          <p
            style={{
              color: "#dd2803",
              fontSize: "40px",
              fontWeight: "600",
              marginTop: "-70px",
            }}
          >
            THAI MUEANG @ PHANG-NGA
          </p>
          <button className={styles.reserveBtn}>RESERVE</button>
        </div>
        <img className={styles.images} src={"img/Kung.png"}></img>
      </div>
    </Layout>
  );
};

export default Home;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
