import { API, GetCookieToken, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminEvents({ id, data }) {
  const router = useRouter();
  const [media, setMedia] = useState("image");
  const [error, setError] = useState({ message: "", status: false });
  const [gallery, setGallery] = useState(data);
  const changeMenu = (n) => {
    router.push(n);
  };
  const GallerySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const responce = await axios.post(
        `${Server + API.gallery(id)}?uid=${GetCookieToken()}`,
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
        router.reload();
      }
    } catch (error) {
      setError((a) => ({ ...a, message: error.message, status: true }));
    }
  };
  const DelectImage = async (imgname) => {
    try {
      const responce = await axios.delete(
        `${Server + API.gallery(id)}?uid=${GetCookieToken()}&image=${imgname}`
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
        <div className="gallery-event">
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
                <a onClick={() => changeMenu("/admin/gallery")}>Gallery</a>
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

          <div className="gallery-list-media">
            <h1>Gallery Media</h1>
            <div className="media-type">
              <span
                className={media == "image" ? "active" : ""}
                onClick={() => setMedia("image")}
              >
                images
              </span>
              <span
                className={media == "video" ? "active" : ""}
                onClick={() => setMedia("video")}
              >
                videos
              </span>
            </div>
            <div className="gallery-images">
              <div className="mt-3">
                <form onSubmit={GallerySubmit}>
                  <label htmlFor="event_images" className="form-label">
                    Add Images
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file"
                    name="file"
                    multiple
                    accept="image/*"
                  />
                  <button className="btn primary">add</button>
                </form>
              </div>
              <div className="gallery-preview" id="gallery-preview"></div>
            </div>
            <div className="list-of-medias">
              {media == "image" &&
                gallery &&
                gallery.images.length >= 1 &&
                gallery.images.map((a) => (
                  <div key={a} className="list-gallery">
                    <div className="delete">
                      <i
                        className="bi bi-trash3"
                        onClick={() => DelectImage(a)}
                      ></i>
                      <span>delete</span>
                    </div>
                    <img src={`${Server}/public/gallery/${gallery._id}/${a}`} />
                  </div>
                ))}
              {media == "video" &&
                vidlist.map((a) => (
                  <div key={a} className="list-gallery">
                    <img src={a} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Admin>
    </>
  );
}

const Gallery = (props) => {
  return (
    <>
      <div className="gallery-event">
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
              <a onClick={() => props.changeMenu("/admin/gallery")}>Gallery</a>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#a5adc6" }}
            >
              {props.id}
            </li>
          </ol>
        </nav>

        <div className="gallery-list-media">
          <h1>Gallery Media</h1>
          <div className="media-type">
            <span
              className={props.media == "image" ? "active" : ""}
              onClick={() => props.setMedia("image")}
            >
              images
            </span>
            <span
              className={props.media == "video" ? "active" : ""}
              onClick={() => props.setMedia("video")}
            >
              videos
            </span>
          </div>
          <div className="gallery-images">
            <div className="mt-3">
              <form onSubmit={props.GallerySubmit}>
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
                <button className="btn primary">add</button>
              </form>
            </div>
            <div className="gallery-preview" id="gallery-preview"></div>
          </div>
          <div className="list-of-medias">
            {props.media == "image" &&
              props.gallery &&
              props.gallery.images.length >= 1 &&
              props.gallery.images.map((a) => (
                <div key={a} className="list-gallery">
                  <div className="delete">
                    <i className="bi bi-trash3"></i>
                    <span>delete</span>
                  </div>
                  <img
                    src={`${Server}/public/gallery/${props.gallery._id}/${a}`}
                  />
                </div>
              ))}
            {props.media == "video" &&
              vidlist.map((a) => (
                <div key={a} className="list-gallery">
                  <img src={a} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

const imglist = [
  "/provide/edu.png",
  "/provide/i2.png",
  "/provide/i4.png",
  "/provide/skill.png",
];

const vidlist = ["/provide/edu.png", "/provide/i2.png"];

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(
    `${Server + API.eventid(context.query.id)}?uid=${cookie}`
  );
  return {
    props: { id: context.query.id, data: responce.data },
  };
}
