import { useRouter } from "next/router";
import Head from "next/head";
import { API, Server } from "@/api/apiCalls";
import axios from "axios";
import { Value } from "sass";

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
            <img alt="" src="/icons/About.jpg" className="img1" />
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

          <div className="author">
            <h1>Author Of The Trust</h1>
            {Author.map((e) => (
              <div className="Author-box" key={e.name}>
                <img alt={e.name} src={e.src} />
                <span>{e.name}</span>
                <span>{e.Value}</span>
              </div>
            ))}
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
      </div>
    </div>
  );
};



const Author = [
  {
    src: "/servicons/author1.png.jpg",
    name: "S. Selvakumar",
    Value: " Selvakumar is a distinguished individual with an extensive educational background and a wealth of experience in teaching from Salem. His educational journey began with an M.Sc. degree in Information Technology, followed by an M.Phil. and a Ph.D., demonstrating his commitment to advancing knowledge in his field. Having a passion for sharing knowledge and nurturing young minds, He has devoted five years of his career to teaching. His experience as an educator has allowed him to inspire and mentor countless students, instilling a love for computer science and guiding them toward their own academic and professional success. He serves as a Research Associate at the prestigious Nabu Research Academy. In this role, he collaborates with fellow researchers and experts to push the boundaries of computer science, driving innovation and making valuable contributions to the field. Selvakumar actively engages in community initiatives and social causes outside his academic and research pursuits. He believes in using his knowledge and expertise to positively impact society, fostering trust and empowering others through his contributions."
  },
];