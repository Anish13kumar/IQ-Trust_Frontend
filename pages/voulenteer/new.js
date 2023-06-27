import { API, GetCookieToken, Server } from "@/api/apiCalls";
import axios from "axios";
import { useState } from "react";

export default function newVoulenteer() {
  const [error, setError] = useState({ message: "", status: false });
  const [complete, setcomplete] = useState(false);
  const SubmitVoulenteer = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const responce = await axios.post(
        `${Server + API.volunteers}?uid=${GetCookieToken()}`,
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
        setcomplete(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {complete ? (
        <>
          <div className="voulenter-complete">
            <div className="vou-box">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Well done!
                </h4>
                <p>
                  Thank you for applying to volunteer with us. We have received
                  your application and will review it carefully. We appreciate
                  your patience as we process a high number of applications. We
                  will contact you with a decision soon. Thank you for your
                  interest and support in making a positive impact in our
                  community.
                </p>
                <hr />
                <p className="mb-0">
                  Thank you for your interest in volunteering with our trust. We
                  appreciate your time and commitment to making a difference in
                  our community.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="apply-voulenteer">
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
            <h1>apply for voulenteer</h1>
            <form onSubmit={SubmitVoulenteer}>
              {check.map((a) => (
                <div className="mb-3" key={a.name}>
                  {/* <label htmlFor={a.name} className="form-label">
                {a.name}
              </label> */}
                  <input
                    type={a.type}
                    className="form-control"
                    id={a.name}
                    name={a.name}
                    placeholder={a.name}
                  />
                </div>
              ))}
              <div className="mb-3">
                <label htmlFor="voulenteer" className="form-label">
                  voulenteer pic
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="voulenteer"
                  name="file"
                  accept="image/*"
                />
              </div>
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

const check = [
  { name: "firstname", type: "text" },
  { name: "lastname", type: "text" },
  { name: "address", type: "text" },
  { name: "district", type: "text" },
  { name: "state", type: "text" },
  { name: "country", type: "text" },
  { name: "pincode", type: "number" },
  { name: "email", type: "email" },
  { name: "phone", type: "number" },
  { name: "areaofintrest", type: "text" },
  { name: "profession", type: "text" },
  { name: "availability", type: "text" },
];
