import Admin from "@/components/adminBase";
import { useRouter } from "next/router";

export default function AdminEvents() {
  const router = useRouter();
  const changeMenu = (n) => {
    router.push(n);
  };
  return (
    <>
      <Admin>
        <Banner changeMenu={changeMenu} />
      </Admin>
    </>
  );
}

const Banner = (props) => {
  return (
    <>
      <div className="con-contact">
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
              contact
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};
