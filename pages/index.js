import Head from "next/head";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Donate from "./donate";
export default function Home() {

  const router = useRouter();

  const changeroute = (donate) => {
    router.push(donate);
  };
  const [imageList, setImageList] = useState([
    {
      name: "image1",
      src: "/banner/banner5.jpg",
      title: "Education",
      details: "Donate with Kindness. Every amount Donated by you Counts - Empowering Education, Minds, and Inspiring Futures Through IQ Global Trust.",
    },
    {
      name: "image2",
      src: "/banner/banner6.jpg",
      title: "Skill Development",
      details: "Donate with Kindness. Every amount Donated by you Counts - Building Potential Skills for a Successful Future Through IQ Global Trust.",
    },
    {
      name: "image3",
      src: "/banner/banner7.jpg",
      title: "Eco-Friendly",
      details: "Donate with Kindness. Every amount Donated by you Counts -  Preserving the Planet with Greener and Cleaner Through IQ Global Trust.",
    },
    {
      name: "image4",
      src: "/banner/banner8.jpg",
      title: "Welfare",
      details: "Donate with Kindness. Every amount Donated by you Counts -  Building Stronger Communities by Supporting and Nurturing Welfare Initiatives.",
    },
    {
      name: "image5",
      src: "/banner/banner9.jpg",
      title: "Social and Cultural Spheres",
      details: "Donate with Kindness. Every amount Donated by you Counts -  Enriching Social and Cultural Experiences by Connecting Hearts, Cultivating Unity.",
    },
  ]);

  useEffect(() => {
    let current = 0;
    const images = setInterval(() => {
      const imagelis = document.getElementById("imageContainer").childNodes;
      console.log(imagelis[0].childNodes);
      const imagelength = imagelis.length;
      imagelis[current].style.opacity = "0";
      imagelis[current].childNodes[0].style.animation =
        "homeh6c 1s ease-in-out forwards";
      imagelis[current].childNodes[1].style.animation =
        "homeh6c 1s ease-in-out forwards";
      imagelis[current].childNodes[3].style.animation =
        "homeh6c 1s ease-in-out forwards";
      current = (current + 1) % imagelength;
      imagelis[current].style.opacity = "1";
      imagelis[current].childNodes[0].style.animation =
        "homeh6 1s 1s ease-in-out forwards";
      imagelis[current].childNodes[1].style.animation =
        "homeh6 1s 1.7s ease-in-out forwards";
      imagelis[current].childNodes[3].style.animation =
        "homeh6 1s 2.5s ease-in-out forwards";
    }, 5000);

    return () => {
      clearInterval(images);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Home - IQ Global Trust</title>
      </Head>
      <div className="trust-home">
        <HomeImageGallery imageList={imageList} />
        <HomeSecction2 donate={changeroute} />
        <Mission donate={changeroute}/>
        <Goals />
      </div>
    </>
  );
}
const HomeImageGallery = (props) => {
  return (
    <>
      <div id="imageContainer" className="section">
        {props.imageList.map((a) => (
          <div className="img-col" key={a.name}>
            <h6>{a.title}</h6>
            <h1>{a.details}</h1>
            <img key={a.name} src={a.src} alt={a.name} />
            <button className="btn"><a href="#weprovide">read more</a></button>
          </div>
        ))}
      </div>
    </>
  );
};

const HomeSecction2 = (props) => {
  return (
    <div className="trust-home2 section">
      <section>
        <div className="be-box">
          <div className="box-b">Trust</div>
          <div className="box-b">Expertise</div>
          <div className="box-b">Global Reach</div>
        </div>
        <div className="sec-1">
          <h1>Over 93% of all Donations go directly to Projects.</h1>
          <span>Under 7% for admin, fundraising, and salaries.</span>
          <b>Thank you for your continued Support</b>
          <button className="btn" onClick={() => props.donate("donate")}>
            <i className="bi bi-emoji-heart-eyes-fill"></i>donate now
          </button>
        </div>
        <div className="we-provide" id="weprovide">
          <h1>We Provide</h1>
          <div className="provide-box">
            {weProvide.map((a) => (
              <div className="pro-sub-box" key={a.name}>
                <img src={a.src} alt={a.name} />
                <main>
                  <b>{a.name}</b>
                  <span>{a.dis}</span>
                </main>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};



const Mission = (props) => {
  return (
    <>
      {/* misson */}
      <div className="mission">
        <h1>
          Our mission is to help people by distributing Money and Service
          globally.
        </h1>
        <div className="mission-box"></div>
      </div>
      {/* help home less */}
      <div className="help-home-less">
        <div className="help-box">
          <b>
            <i className="bi bi-suit-heart"></i>
          </b>
          <h1>Help the Homeless & Hungry People.</h1>
          <button className="btn"  onClick={() => props.donate("donate")}>
            <i className="bi bi-emoji-heart-eyes-fill" style={{ cursor: "pointer" }}></i>donate now
          </button>
        </div>
      </div >
    </>
  );
};

const Goals = () => {
  return (
    <div className="trust-home2 section">
      <section>
        <div className="we-provide">
          <h1>Our Mission and Goals</h1>
          <div className="provide-box">
            {goals.map((a) => (
              <div className="pro-sub-box goals" key={a.name}>
                <img
                  src={a.src}
                  alt={a.name}
                  style={{ width: "40px", height: "40px" }}
                />
                <main>
                  <b>{a.name}</b>
                  <span>{a.dis}</span>
                </main>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const weProvide = [
  {
    name: "High Quality Education",
    dis: "Empowering Education, Minds, and Inspiring Futures Through IQ Global Trust.",
    src: "/provide/edu.png",
  },
  {
    name: "Eco-Friendly",
    dis: "Preserving the Planet with Greener and Cleaner Through IQ Global Trust.",
    src: "/provide/i2.png",
  },
  {
    name: "Skill Developments",
    dis: "Building Potential Skills for a Successful Future Through IQ Global Trust.",
    src: "/provide/skill.png",
  },
  {
    name: "Welfare",
    dis: "Building Stronger Communities by Supporting and Nurturing Welfare Initiatives.",
    src: "/provide/i4.png",
  },
  {
    name: "Social and Cultural Spheres",
    dis: "Enriching Social and Cultural Experiences by Connecting Hearts, Cultivating Unity.",
    src: "/provide/union.png",
  },
];

const mission = [
  { src: "", count: "1,500", title: "total volunteers" },
  { src: "", count: "2,500", title: "Meals Served" },
  { src: "", count: "1,000", title: "Got Shelter" },
  { src: "", count: "1,500", title: "Adapted Children" },
];

const goals = [
  {
    name: "Mission",
    dis: "The mission of IQ Global Trust is to leverage our expertise, global reach, and innovative thinking to deliver exceptional value and build long-term partnerships with our People.",
    src: "/goals/home.png",
  },
  {
    name: "People Success",
    dis: "Iq Global Trust's primary goal is to help our people succeed by providing them with tailored financial solutions that align with their unique objectives and risk tolerance.  ",
    src: "/goals/home.png",
  },
  {
    name: "Trust and Integrity",
    dis: " Iq Global Trust is committed to maintaining the highest standards of trust and integrity in all aspects of our operations",
    src: "/goals/education.png",
  },
  {
    name: "Global Expertise",
    dis: " Iq Global Trust's goal is to provide our People with access to diverse and innovative investment options that can optimize their portfolio returns.",
    src: "/goals/health.png",
  },
  {
    name: "Innovation and Adaptability",
    dis: " Iq Global Trust aims to provide our People with innovative solutions that meet their evolving needs and deliver sustainable growth.",
    src: "/goals/animal.png",
  },
  {
    name: "Long-term Partnerships",
    dis: " Iq Global Trust aim to build enduring partnerships with our People based on mutual trust, transparency, and shared success.  ",
    src: "/goals/food.png",
  },
  {
    name: "Social Responsibility",
    dis: " Iq Global Trust's goal is to integrate environmental, social, and governance (ESG) factors that drive positive change in our communities.",
    src: "/goals/eco.png",
  },
];
