import { API, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";

export default function Home(props) {
  return (
    <Admin>
      <Dashboard data={props} />
    </Admin>
  );
}

const Dashboard = ({ data }) => {
  return (
    <div className="con-home">
      {/* <!-- breadcrumb for the current page location  --> */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb d-flex align-items-center">
          <i className="bi bi-link fs-4 me-2" style={{ color: "#a5adc6" }}></i>
          <li className="breadcrumb-item">
            <a>Admin</a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ color: "#a5adc6" }}
          >
            Dashboard
          </li>
        </ol>
      </nav>

      {/* <!-- dashboard list of events --> */}
      <div className="dashboard-card">
        <div className="card-d">
          <div className="icon-place">
            <img src="/admin/icons/event.png" alt="events" />
          </div>
          <div className="dash-detail">
            <span>No of Events</span>
            <b>{data.event < 10 ? `0${data.event}` : data.event}</b>
          </div>
        </div>

        <div className="card-d">
          <div className="icon-place">
            <img src="/admin/icons/volunteer.png" alt="events" />
          </div>
          <div className="dash-detail">
            <span>No of volunteers</span>
            <b>100</b>
          </div>
        </div>

        <div className="card-d">
          <div className="icon-place">
            <img src="/admin/icons/gallery.png" alt="events" />
          </div>
          <div className="dash-detail">
            <span>gallery total</span>
            <b>{data.gallery < 10 ? `0${data.gallery}` : data.gallery}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  let event = await axios.get(`${Server + API.events}?uid=${cookie}&count=1`);
  if (event.data.status == false) {
    return {
      props: { event: 0, gallery: 0 },
    };
  }
  event = event.data.message;
  const events = await axios.get(`${Server + API.events}?uid=${cookie}`);
  let gallery = 0;
  events.data.map((a) => {
    gallery += a.images.length;
    gallery += a.videos.length;
  });
  return {
    props: { event, gallery },
  };
}
