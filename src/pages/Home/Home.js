import React  from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Home.scss";
import Layout from "../../components/_layout/Layout";

const Home = () => (
  <Layout
    contentHasBackground
  >
    <div className={s.root}>
      Hey
    </div>
  </Layout>
);

export default withStyles(s)(Home);
