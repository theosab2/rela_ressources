import Head from "next/head";
import Image from "next/image";
import { Children } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";
import Navigation from "./Navigation";
import { GetServerSideProps } from "next";
import Home from "./home/Home";

export default function Index() {
  return (
    <>
      <Navigation></Navigation>
      <Home></Home>
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.req.cookies);
  return { props: {} };
};
