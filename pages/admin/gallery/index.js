import { API, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminEvents({ data }) {
  const router = useRouter();
  const changeMenu = (n) => {
    router.push(n);
  };
  return (
    <>
      <Admin>
        <Gallery changeMenu={changeMenu} data={data} />
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
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#a5adc6" }}
            >
              Gallery
            </li>
          </ol>
        </nav>

        <div className="gallery-list-event">
          <h1>Events Gallery</h1>
          <div className="gallery-list-box">
            {props.data.map((a) => (
              <div className="gallery-card" key={a.title}>
                <div className="gallery-details">
                  <img src={`${Server}/public${a.tumbnail}`} />
                  <div className="content">
                    <span className="title">{a.title}</span>
                    <span className="images">
                      images<b>{a.images.length}</b>
                    </span>
                    <span className="videos">
                      videos<b>{a.videos.length}</b>
                    </span>
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={() => props.changeMenu(`/admin/gallery/${a._id}`)}
                >
                  view
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(`${Server + API.events}?uid=${cookie}`);
  return {
    props: { data: responce.data },
  };
}
