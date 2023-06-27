export default function Footer() {
  return (
    <footer>
      <div className="footercontainer">
        <div className="col">
          <h1>Our Address</h1>
          <span>167. V.O.C Nagar K.N.Colony Post Salem- 636014</span>
        </div>

        <div className="col">
          <h1>Contact Us</h1>
          <span>
            +91 79040 60790<a href="contact">Link to Contact</a>
          </span>
        </div>

        <div className="col">
          <h1>Mail Us</h1>
          <span>iqglobaltrust@gmail.com</span>
        </div>

        <div className="col">
          <h1>Follow Us On</h1>
          <img alt="" src="/icons/twitter.png" className="icons" />
          <img alt="" src="/icons/linkedin.png" className="icons" />
          <img alt="" src="/icons/facebook.png" className="icons" />
          <img alt="" src="/icons/whatsapp.png" className="icons" />
          <img alt="" src="/icons/instagram.png" className="icons" />
        </div>
      </div>

      <div className="copyrights">
        <span>
          &copy;2022 Save Poor. All rights reserved. Design by
          <b>
            <a href="https://bloomskilltech.in">Bloomskill Tech</a>
          </b>
        </span>
      </div>
    </footer>
  );
}