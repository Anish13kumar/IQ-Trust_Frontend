import { useRouter } from "next/router";
import Head from "next/head";
import { API, Server } from "@/api/apiCalls";
import axios from "axios";

export default function About({ data }) {
  const router = useRouter();
  const donate = () => {
    router.push("about/adminbio");
  };
  return (
    <>
      <Head>
        <title>About - IQ Global Trust</title>
      </Head>

      <AboutBox donate={donate} router={router} data={data} />
    </>
  );
}

const AboutBox = (props) => {
  return (
    <div className="aboutcontainer">
      <div className="about-box">
        <div className="heading">
          <h1>About us</h1>
        </div>

        <div className="heading1">
          <div className="main">
            <h2>Anytime Anywhere</h2>

            <h1>We Are Leading Community Care Providers</h1>
            <p>
              Welcome to <b>IQ Global Trust</b>, a dynamic platform designed to
              empower learners of all ages and backgrounds. We are passionate
              about providing high-quality education that is accessible,
              engaging, and relevant. Join us on this exciting educational
              journey as we unlock knowledge, foster curiosity, and inspire
              lifelong learning.
            </p>
            <p>
              At <b>IQ Global Trust</b>, our mission is to revolutionize
              education by offering innovative and interactive learning
              experiences. We believe that education should be personalized,
              flexible, and tailored to individual needs. Our goal is to empower
              learners to discover their full potential and equip them with the
              skills, knowledge, and confidence to thrive in a rapidly evolving
              world.
            </p>
            <h3>"Its Our 1st Years of Accomplishments”</h3>

            <div className="button">
              <button className="btn" onClick={props.donate}>
                Learn More about Us
              </button>
            </div>
          </div>

          <div className="image">
            <img alt="" src="/icons/about.png" className="img1" />
          </div>
        </div>

        <div className="content">
          <div className="point">
            <h1>Who we are</h1>
            <p>
              As an educational trustee, we are a dedicated group of individuals
              committed to advancing the field of education and empowering
              future generations. With a strong belief in the transformative
              power of education, we aim to create positive and lasting impacts
              in the lives of learners and communities.
            </p>
          </div>

          <div className="point2">
            <h1>What We provide</h1>

            <span className="emoji">
              <b>&#9989;</b>Empowering learners and advancing education for a
              brighter future.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Driving educational excellence and equity through
              comprehensive support and strategic initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Assistance with Daily Personal Activities
            </span>
            <span className="emoji">
              <b>&#9989;</b>Enabling access, fostering innovation, and
              empowering learners through transformative educational
              initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Assistance with Community and Civic Participation
            </span>
            <span className="emoji">
              <b>&#9989;</b>Innovative Community Participation & Development of
              Daily Living & Life Skills
            </span>
            <span className="emoji">
              <b>&#9989;</b>Empowering education through strategic investments
              and impactful initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Catalyzing educational opportunities and nurturing
              lifelong learning for all.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Elevating education through holistic support and
              transformative initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Igniting educational potential through comprehensive
              support and innovative programs.
            </span>
            <span className="emoji">
              <b>&#9989;</b> educational advancement through strategic
              investments and transformative initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>Fueling educational progress through dedicated
              support and transformative initiatives.
            </span>
            <span className="emoji">
              <b>&#9989;</b>learners, fostering innovation, and shaping the
              future of education.
            </span>
          </div>
        </div>

        <div className="peoples">
          <div className="head">
            <h1>Happy Voulenteers</h1>
          </div>
          <div className="person">
            {props.data &&
              props.data.map((a) => (
                <img
                  className="perimg"
                  src={`${Server}/public/volunteers/${a.image_name}`}
                />
              ))}

            <div
              className="apply-voulenteer-box"
              onClick={() => props.router.push("/voulenteer/new")}
            >
              <i className="bi bi-person-plus"></i>
              <b>apply Voulenteer </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(`${Server + API.volunteers}?uid=${cookie}`);
  return {
    props: { data: responce.data },
  };
}
