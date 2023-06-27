import { API, GetCookieToken, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminEvents() {
  const router = useRouter();
  const changeMenu = (n) => {
    router.push(n);
  };
  const [events, setEvents] = useState(null);
  const [cDelete, setcDelete] = useState({ data: "", status: false });
  useEffect(() => {
    try {
      (async () => {
        const responce = await axios.get(
          `${Server + API.events}?uid=${GetCookieToken()}`
        );
        if (responce.status == 200) {
          setEvents(responce.data);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const ConfrimDelete = (event) => {
    setcDelete((a) => ({ ...a, data: event, status: true }));
  };
  const DelectEvent = async (id) => {
    try {
      const responce = await axios.delete(
        `${Server + API.eventid(id)}?uid=${GetCookieToken()}`
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
      setError((a) => ({ ...a, message: error.message, status: true }));
    }
  };
  return (
    <>
      <Admin>
        {cDelete.status && (
          <div className="event-delete">
            <div className="delete-box">
              <span>are you sure?</span>
              <span>
                wanna delete <b>{cDelete.data._id}</b> event
              </span>
              <div className="confrim-delete">
                <button
                  className="btn"
                  onClick={() => {
                    setcDelete((a) => ({ ...a, data: "", status: false }));
                  }}
                >
                  cancel
                </button>
                <button
                  className="btn"
                  onClick={() => DelectEvent(cDelete.data._id)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="con-event">
          {/* <!-- breadcrumb for the current page location  --> */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb d-flex align-items-center">
              <i
                className="bi bi-link fs-4 me-2"
                style={{ color: "#a5adc6" }}
              ></i>
              <li className="breadcrumb-item">
                <a onClick={() => changeMenu("/admin")}>Admin</a>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#a5adc6" }}
              >
                Events
              </li>
            </ol>
          </nav>
          <div className="event-main">
            {/* <!-- add Events --> */}
            <div
              className="event-new"
              onClick={() => changeMenu("/admin/events/new")}
            >
              <div className="icon">
                <i className="bi bi-plus-circle"></i>
                <span>add Event</span>
              </div>
              <div className="details">
                Welcome, Admin! Manage content, users, and events effortlessly.
                Utilize the admin dashboard for seamless event creation,
                updates, and event management.
              </div>
            </div>
            {/* <!-- end add Events --> */}
          </div>

          {/* <!-- list of Events --> */}
          <div className="event-list">
            <h2>events list</h2>
            <div className="list-of-events">
              {events &&
                events.map((a) => {
                  let percentage =
                    (parseInt(a.amount_collected) /
                      parseInt(a.amount_expected)) *
                    100;
                  percentage = percentage > 100 ? 100 : percentage;
                  return (
                    <div className="event-card" key={a._id}>
                      <div className="advance-tool">
                        <div className="edit">
                          <i
                            className="bi bi-pencil-square"
                            onClick={() => changeMenu(`/admin/events/${a._id}`)}
                          ></i>
                          <span>edit</span>
                        </div>
                        <div className="delete">
                          <i
                            className="bi bi-trash3"
                            onClick={() => ConfrimDelete(a)}
                          ></i>
                          <span>delete</span>
                        </div>
                      </div>
                      <img src={Server + "/public" + a.tumbnail} />
                      <div className="content">
                        <span className="title">{a.title}</span>
                        <span className="dist">{a.event}</span>
                        <p>
                          ₹{a.amount_collected} Donated of ₹{a.amount_expected}
                        </p>
                        <div className="progres">
                          <span
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></span>
                          <span
                            style={{
                              left: `${percentage - 1}%`,
                            }}
                          ></span>
                        </div>
                        <button
                          className="btn"
                          onClick={() => changeMenu(`/admin/gallery/${a._id}`)}
                        >
                          View Gallery
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <!-- end list of Events --> */}
        </div>
      </Admin>
    </>
  );
}

const Events = (props) => {
  return (
    <>
      <div className="con-event">
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
              Events
            </li>
          </ol>
        </nav>
        <div className="event-main">
          {/* <!-- add Events --> */}
          <div
            className="event-new"
            onClick={() => props.changeMenu("/admin/events/new")}
          >
            <div className="icon">
              <i className="bi bi-plus-circle"></i>
              <span>add Event</span>
            </div>
            <div className="details">
              Welcome, Admin! Manage content, users, and events effortlessly.
              Utilize the admin dashboard for seamless event creation, updates,
              and event management.
            </div>
          </div>
          {/* <!-- end add Events --> */}
        </div>

        {/* <!-- list of Events --> */}
        <div className="event-list">
          <h2>events list</h2>
          <div className="list-of-events">
            {[1, 2, 3, 4, 5].map((a) => (
              <div className="event-card" key={a}>
                <div className="advance-tool">
                  <div className="edit">
                    <i className="bi bi-pencil-square"></i>
                    <span>edit</span>
                  </div>
                  <div className="delete">
                    <i className="bi bi-trash3"></i>
                    <span>delete</span>
                  </div>
                </div>
                <img src="/banner/banner4.jpg" />
                <div className="content">
                  <span className="title">EDUCATION</span>
                  <span className="dist">Education for all</span>
                  <p>₹86,800 Donated of ₹310,000</p>
                  <div className="progres">
                    <span></span>
                    <span></span>
                  </div>
                  <button
                    className="btn"
                    onClick={() => props.changeMenu(`/admin/gallery/${a}`)}
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <!-- end list of Events --> */}
      </div>
    </>
  );
};
