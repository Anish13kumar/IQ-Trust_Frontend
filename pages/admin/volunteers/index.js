import { API, GetCookieToken, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminEvents({ data }) {
  const router = useRouter();
  const [media, setMedia] = useState("exist");
  const changeMenu = (n) => {
    router.push(n);
  };
  const [error, setError] = useState({ message: "", status: false });
  const AcceprVol = async (id) => {
    try {
      const responce = await axios.patch(
        `${Server + API.volunteerId(id)}?uid=${GetCookieToken()}`
      );
      const data = responce.data;
      if (
        !(
          Object.keys(data).findIndex((a) => a.startsWith("status")) >= 0 &&
          data.status == true
        )
      ) {
        setError((a) => ({ ...a, message: data.message, status: true }));
      } else {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const RejectVol = async (id) => {
    try {
      const responce = await axios.delete(
        `${Server + API.volunteerId(id)}?uid=${GetCookieToken()}`
      );
      const data = responce.data;
      if (
        !(
          Object.keys(data).findIndex((a) => a.startsWith("status")) >= 0 &&
          data.status == true
        )
      ) {
        setError((a) => ({ ...a, message: data.message, status: true }));
      } else {
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Admin>
        {error.status && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
            style={{
              width: "fit-content",
              position: "fixed",
              right: "20px",
              top: "20px",
              zIndex: 1000,
            }}
          >
            <strong>Login Error!</strong> {error.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() =>
                setError((a) => ({ ...a, message: "", status: false }))
              }
            ></button>
          </div>
        )}
        <Volunteers
          data={data}
          changeMenu={changeMenu}
          media={media}
          setMedia={setMedia}
          AcceprVol={AcceprVol}
          RejectVol={RejectVol}
        />
      </Admin>
    </>
  );
}

const Volunteers = (props) => {
  const voulenteerExist =
    props.data && props.data.filter((a) => a.status == true);
  const voulenteerNew =
    props.data && props.data.filter((a) => a.status == false);
  return (
    <>
      <div className="con-volunteer">
        {/* <!-- breadcrumb for the current page location  --> */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb d-flex align-items-center">
            <i
              className="bi bi-link fs-4 me-2"
              style={{ color: "#a5adc6" }}
            ></i>
            <li className="breadcrumb-item">
              <a onClick={() => props.changeMenu("/admin")}>Admin</a>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#a5adc6" }}
            >
              volunteer
            </li>
          </ol>
        </nav>
        <div className="volunteer-list">
          <h1>volunteers list</h1>
          <div className="volunteer-select">
            <span
              className={props.media == "exist" ? "active" : ""}
              onClick={() => props.setMedia("exist")}
            >
              exist volunteer
            </span>
            <span
              className={props.media == "new" ? "active" : ""}
              onClick={() => props.setMedia("new")}
            >
              new volunteer
            </span>
          </div>
          <div className="list-of-volunteer">
            {props.media == "exist" &&
              voulenteerExist.map((a, i) => (
                <div className="volunteer-card" key={a.name + i}>
                  <img src={`${Server}/public/volunteers/${a.image_name}`} />
                  <span>
                    name <b>{a.firstname}</b>
                  </span>
                  <span>
                    profession <b>{a.profession}</b>
                  </span>
                  <span>
                    phone <b>{a.phone}</b>
                  </span>
                  <span>
                    district <b>{a.district}</b>
                  </span>
                  <span>
                    start <b>{a.state}</b>
                  </span>
                </div>
              ))}
            {props.media == "new" &&
              voulenteerNew.map((a, i) => (
                <div className="volunteer-card" key={a.name + i}>
                  <img src={`${Server}/public/volunteers/${a.image_name}`} />
                  <span>
                    name <b>{a.firstname}</b>
                  </span>
                  <span>
                    profession <b>{a.profession}</b>
                  </span>
                  <span>
                    phone <b>{a.phone}</b>
                  </span>
                  <span>
                    district <b>{a.district}</b>
                  </span>
                  <span>
                    start <b>{a.state}</b>
                  </span>
                  <div className="appr">
                    <button
                      className="btn deny"
                      onClick={() => props.RejectVol(a._id)}
                    >
                      deny
                    </button>
                    <button
                      className="btn accept"
                      onClick={() => props.AcceprVol(a._id)}
                    >
                      accept
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

const users = [
  {
    name: "sadf",
    src: "/banner/banner2.jpg",
    country: "india",
    state: "TamilNadu",
  },
  {
    name: "sadf",
    src: "/banner/banner2.jpg",
    country: "india",
    state: "TamilNadu",
  },
  {
    name: "sadf",
    src: "/banner/banner2.jpg",
    country: "india",
    state: "TamilNadu",
  },
  {
    name: "sadf",
    src: "/banner/banner2.jpg",
    country: "india",
    state: "TamilNadu",
  },
];

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(`${Server + API.volunteers}?uid=${cookie}`);
  return {
    props: { data: responce.data },
  };
}
