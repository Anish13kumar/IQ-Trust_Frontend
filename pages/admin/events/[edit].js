import { API, Fetcher, GetCookieToken, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function AdminEvents({ id, data }) {
  const router = useRouter();
  const [form, setForm] = useState(data);
  const [local, setLocal] = useState(false);
  const [error, setError] = useState({ message: "", status: false });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        console.log(imageUrl);
        setForm((a) => ({ ...a, tumbnail: imageUrl }));
        setLocal(() => true);
      };

      reader.readAsDataURL(file);
    }
  };

  const changeMenu = (n) => {
    router.push(n);
  };
  const SumbitData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const responce = await axios.post(
        `${Server + API.events + "/" + form._id}?uid=${GetCookieToken()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
        router.reload()
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
              position: "absolute",
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
              <li className="breadcrumb-item">
                <a onClick={() => changeMenu("/admin/events")}>Events</a>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "#a5adc6" }}
              >
                {id}
              </li>
            </ol>
          </nav>
          {/* <!-- edit Events --> */}
          <div className="new-event">
            <h1>edit event</h1>
            <form
              method="post"
              id="eventform"
              encType="multipart/form-data"
              onSubmit={SumbitData}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((a) => ({
                      ...a,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="event_for" className="form-label">
                  Event For
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event_for"
                  name="event"
                  placeholder="Event for"
                  value={form.event}
                  onChange={(e) =>
                    setForm((a) => ({
                      ...a,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm((a) => ({
                      ...a,
                      [e.target.name]: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tumbnail" className="form-label">
                  Tumbnail
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="tumbnail"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div id="previewthumnail">
                  <div className="selected-img">
                    {/* <span>&times;</span> */}
                    {local ? (
                      <img src={`${form.tumbnail}`} />
                    ) : (
                      <img src={`${Server}/public${form.tumbnail}`} />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="amount_e" className="form-label">
                  Amount Expected
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount_e"
                  name="amount_expected"
                  placeholder="amount expected"
                  value={form.amount_expected}
                  onChange={(e) =>
                    setForm((a) => ({
                      ...a,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="amount_c" className="form-label">
                  Amount Collected
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount_c"
                  name="amount_collected"
                  placeholder="amount Collected"
                  value={form.amount_collected}
                  onChange={(e) =>
                    setForm((a) => ({
                      ...a,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <input type="submit" value="update Event" className="btn" />
            </form>
          </div>
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
            <li className="breadcrumb-item">
              <a onClick={() => props.changeMenu("/admin/events")}>Events</a>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#a5adc6" }}
            >
              New
            </li>
          </ol>
        </nav>
        {/* <!-- add Events --> */}
        <div className="new-event">
          <h1>new event</h1>
          <form
            method="post"
            id="eventform"
            encType="multipart/form-data"
            onSubmit={SumbitData}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                value={props.form.title}
                onChange={(e) =>
                  props.setForm((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="event_for" className="form-label">
                Event For
              </label>
              <input
                type="text"
                className="form-control"
                id="event_for"
                name="event"
                placeholder="Event for"
                maxLength={22}
                value={props.form.event}
                onChange={(e) =>
                  props.setForm((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={props.form.description}
                onChange={(e) =>
                  props.setForm((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tumbnail" className="form-label">
                Tumbnail
              </label>
              <input
                className="form-control"
                type="file"
                id="tumbnail"
                name="file"
                accept="image/*"
              />
              <div id="previewthumnail"></div>
            </div>

            <div className="mb-3">
              <label htmlFor="amount_e" className="form-label">
                Amount Expected
              </label>
              <input
                type="number"
                className="form-control"
                id="amount_e"
                name="amount_expected"
                placeholder="amount expected"
                value={props.form.amount_expected}
                onChange={(e) =>
                  props.setForm((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="amount_c" className="form-label">
                Amount Collected
              </label>
              <input
                type="number"
                className="form-control"
                id="amount_c"
                name="amount_collected"
                placeholder="amount Collected"
                value={props.form.amount_collected}
                onChange={(e) =>
                  props.setForm((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <input type="submit" value="Create Event" className="btn" />

            {/* <div className="gallery-images">
              <h2>Images of the event</h2>
              <div className="mb-3">
                <label htmlFor="event_images" className="form-label">
                  Add Images
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="event_images"
                  name="event_images"
                  multiple
                  accept="image/*"
                />
              </div>
              <div className="gallery-preview" id="gallery-preview"></div>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(
    `${Server + API.eventid(context.query.edit)}?uid=${cookie}`
  );
  return {
    props: { id: context.query.edit, data: responce.data },
  };
}
