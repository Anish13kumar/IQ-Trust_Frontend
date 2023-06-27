// admin page is an single page application without routing
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fetcher, API } from "@/api/apiCalls";

export default function Admin({ children }) {
  const [adminMenu, setAdminMenu] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const menuChange = (n) => {
    router.push(n);
  };
  useEffect(() => {
    let cookies = document.cookie.split(";");

    if (cookies[0] == "") {
      router.push("/admin/login");
    } else {
      (async () => {
        cookies.filter((a) => a.startsWith("token="));
        if (cookies.length >= 1) {
          console.log(cookies[0].split("=")[1]);
          const responce = await Fetcher({
            route: API.usercheck(cookies[0].split("=")[1]),
            method: "GET",
          })
            .then((res) => res.json())
            .catch((e) => console.log(e));
          if (
            !(
              Object.keys(responce).findIndex((a) => a.startsWith("status")) >=
              0 && responce.status == true
            )
          ) {
            router.push("/admin/login");
          } else {
            setLoading(() => false);
          }
        } else {
          router.push("/admin/login");
        }
      })();
    }

    let path = window.location.pathname.split("/");
    path.shift(0);
    if (path.length > 1 && path[0] == "admin") {
      setAdminMenu(path[1]);
    } else if (path[0] == "admin") {
      setAdminMenu("home");
    }

    const resiz = (e) => {
      const ele = e.target;
      if (
        ele.tagName != "MENU" &&
        ele.className != "bi bi-list" &&
        window.innerWidth <= 970
      ) {
        const menu = document.getElementById("menu");
        menu.style.left = "-250px";
      }
    };

    window.addEventListener("click", resiz);
    const menuclick = document.getElementById("menuclick");

    menuclick.addEventListener("click", menuOpen);

    function menuOpen() {
      const menu = document.getElementById("menu");
      menu.style.left = "0";
    }
    return () => {
      window.removeEventListener("click", resiz);
      menuclick.removeEventListener("click", menuOpen);
    };
  }, [menuChange]);

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <div className="admin-home">
        <div className="container-home">
          <menu id="menu">
            <div className="logo">
              <img src="/logo/logo.png" alt="" />
              <h2>iq global trust</h2>
            </div>
            <div className="menu-link">
              <a
                onClick={() => menuChange("/admin")}
                className={adminMenu == "home" ? "menulink active" : "menulink"}
              >
                <i className="bi bi-speedometer2"></i>dashboard
              </a>
              <a
                onClick={() => menuChange("/admin/events")}
                className={
                  adminMenu == "events" ? "menulink active" : "menulink"
                }
              >
                <i className="bi bi-calendar2-event"></i>events
              </a>
              <a
                onClick={() => menuChange("/admin/volunteers")}
                className={
                  adminMenu == "volunteers" ? "menulink active" : "menulink"
                }
              >
                <i className="bi bi-badge-vo"></i>Volunteers
              </a>
              <a
                onClick={() => menuChange("/admin/gallery")}
                className={
                  adminMenu == "gallery" ? "menulink active" : "menulink"
                }
              >
                <i className="bi bi-columns-gap"></i>gallery
              </a>
              <a
                onClick={() => menuChange("/admin/banner")}
                className={
                  adminMenu == "banner" ? "menulink active" : "menulink"
                }
              >
                <i className="bi bi-card-image"></i>banner
              </a>
            </div>
          </menu>
          <div className="right-body">
            <header>
              <div className="menu-click" id="menuclick">
                <i className="bi bi-list"></i>
              </div>
              <h1 className="fs-3">
                <span>Welcome back,</span> <b>Admin</b>
              </h1>
              <div className="admin-details">
                <i className="bi bi-bell" title="notification"></i>
                <a href="/admin/logout" title="logout">
                  <i className="bi bi-box-arrow-right"></i>
                </a>
              </div>
            </header>
            {/* {% block content %} {% endblock %} */}
            {children}
            <footer className="admin-footer">
              <span>
                &copy; 2023 All rights reserved | made with &hearts; by
                <b>
                  <a href="https://bloomskilltech.in"> bloomSkillTech</a>
                </b>
              </span>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
