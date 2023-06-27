import { Fetcher, API, Server } from "@/api/apiCalls";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Login() {
  const router = useRouter();
  const [log, setLog] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({ message: "", status: false });
  const CheckSubmit = async (e) => {
    e.preventDefault();
    const loginform = document.getElementById("loginform");
    const formData = new FormData(loginform);

    let responce = await axios.post(`${Server + API.signin}`, formData)

    responce = responce.data

    console.log(responce)

    if (
      !(
        Object.keys(responce).findIndex((a) => a.startsWith("status")) >= 0 &&
        responce.status == true
      )
    ) {
      setError((a) => ({ ...a, message: responce.message, status: true }));
      setLog((a) => ({ ...a, username: "", password: "" }));
    } else {
      console.log(responce.data);
      document.cookie = `token=${responce.data}`;
      router.push("/admin");
    }
  };
  return (
    <>
      <div className="admin-login">
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
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={(e) => CheckSubmit(e)} id="loginform">
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                value={log.username}
                onChange={(e) =>
                  setLog((a) => ({ ...a, [e.target.name]: e.target.value }))
                }
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={log.password}
                onChange={(e) =>
                  setLog((a) => ({ ...a, [e.target.name]: e.target.value }))
                }
              />
              <label>Password</label>
            </div>
            <button className="submit" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
