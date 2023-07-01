
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { API, Server } from "@/api/apiCalls";
import { useState } from "react";

export default function Contact() {
  const router = useRouter()
  const [error, setError] = useState({ message: "", status: false });
  const SumbitData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const responce = await axios.post(
        `${Server + API.contact}`,
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
        alert("thank you for your responce")
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Contact - IQ Global Trust</title>
      </Head>
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
      <div className="contact">
        <div className="into">

          <h1>Contact Us</h1>
        </div>
        <div className="dent">
          <div className="details">
            <h1>Send Us a Message</h1>

            <p>
              Your email address will not be published. Required fields are marked{" "}
            </p>
            <form className="box" onSubmit={SumbitData}>
              <input type="text" placeholder="Name*" name="name" required />
              <input type="text" placeholder="E-mail*" name="email" required />
              <input type="number" placeholder="Phone Number*" name="phone" required />
              <input type="text" placeholder="Subject*" name="subject" required />
              <textarea type="text" placeholder="Message*" name="message" required />
              <button className="btn" type="submit" >Send Message</button>
            </form>

          </div>
          <div className="demo">
            <h2>Contact Address</h2>
            <div>

              <i class="bi bi-house-fill msg"></i>
              <span>
                167. V.O.C Nagar, K.N.Colony Post,
                <br /> Salem- 636014
              </span>
            </div>
            <div>
              <i class="bi bi-envelope-at-fill msg"></i>
              <span>iqglobaltrust@gmail.com</span>
            </div>
            <div>
              <i class="bi bi-telephone-fill msg"></i>

              <span>+917904060790</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
