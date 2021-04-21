import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const Home = ({ token }) => {
  const router = useRouter();
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
                fontSize: "48px",
                fontWeight: "900",
                marginTop: "-15px",
              }}
              className={styles.menuName}
            >
              {" "}
              - เมนูแนะนำ -
            </p>
            <img className={styles.suggestImage} src={"img/sug2.jpg"}></img>
            <p className={styles.menuName}>ปลาราดพริก</p>
            <button
              style={{ fontFamily: "Kanit" }}
              className={styles.reserveBtn}
            >
              เมนูทั้งหมด
            </button>
          </div>
          <div className={styles.center}>
            <p className={styles.menuName} style={{ color: "white" }}>
              -
            </p>
            <img className={styles.suggestImage} src={"img/sug3.jpg"}></img>
            <p className={styles.menuName}>ปูนิ่มทอดกระเทียม</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
