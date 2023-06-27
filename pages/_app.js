import "@/styles/globals.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/scrolltop";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let adm = window.location.pathname.split("/");
    adm.shift(0);
    if (adm[0] === "admin") {
      setAdmin(true);
    }
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        "loading...."
      ) : (
        <>
          {!admin && <Header />}
          <Component {...pageProps} />
          <ScrollToTopButton />
          {!admin && <Footer />}
        </>
      )}
    </>
  );
}
