"use client";
import "@/src/styles/globals.css";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/src/layouts/loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const pathNoQuery = router.asPath.split("?")[0].replace(/\/+$/, "") || "/";
  const isAdminRoot = pathNoQuery === "/admin";


  useEffect(() => {
    const handleStart = () => setIsRouteChanging(true);
    const handleComplete = () => setIsRouteChanging(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {isRouteChanging && <PageLoader />}
      {!isAdminRoot && <Header />}
      <Toaster  />
      <Component {...pageProps} />
      {!isAdminRoot && <Footer />}
    </>
  );
}
