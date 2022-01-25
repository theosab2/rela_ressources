import Head from "next/head";
import Image from "next/image";
import { Children } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";
import Navigation from "./Navigation";
import { GetServerSideProps } from "next";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

setCookies;
setCookies("key", "value", options);

export default function Home() {
  return <Navigation>{Children}</Navigation>;
}
