import Layout from "../components/Layout";
import Authen from "../components/Authen";
const Reserve = ({ token }) => {
  console.log("token :::", token);
  return <Layout token={token}>TEST</Layout>;
};

export default Authen(Reserve);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
