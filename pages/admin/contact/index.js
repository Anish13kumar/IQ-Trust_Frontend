import { API, Server } from "@/api/apiCalls";
import Admin from "@/components/adminBase";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminEvents({ event }) {
  const router = useRouter();
  const changeMenu = (n) => {
    router.push(n);
  };
  return (
    <>
      <Admin>
        <div className="con-contact">
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
                contact
              </li>
            </ol>
          </nav>
          <div className="table-col">
            <table className="table-contact">
              <tr>
                <th>S.No</th>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>subject</th>
                <th>message</th>
              </tr>
              {event.map((a, i) => <tr key={a._id} className="contact-list" >
              <i class="bi bi-trash3" onClick={()=>alert(`deleted id ${a._id}`)}></i>
                <td>{i + 1}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.subject}</td>
                <td>{a.message}</td>
              </tr>)}
            </table>
          </div>
        </div>
      </Admin>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  let event = await axios.get(`${Server + API.contact}?uid=${cookie}`);
  event = event.data
  return {
    props: { event }
  };
}