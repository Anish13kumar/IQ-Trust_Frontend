
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - IQ Global Trust</title>
      </Head>
      <Info />
    </>
  );
}

const Info = () => {
  return (
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
          <div className="box">
            <input type="text" placeholder="Name*" required />
            <input type="text" placeholder="E-mail*" required />
            <input type="number" placeholder="Phone Number*" required />
            <input type="text" placeholder="Subject*" required />
            <textarea type="text" placeholder="Message*" required />
            <button className="btn">Send Message</button>
          </div>

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
  );
};

