import { API, Server } from "@/api/apiCalls";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
export default function EventId({ id, data }) {
  const router = useRouter();
  const [media, setMedia] = useState("image");
  return (
    <>
      <Head>
        <title>Event {id}</title>
      </Head>
      <div className="id-event-list">
        <h1>EDUCATION</h1>
        <div className="media-type">
          <span
            className={media == "image" ? "active" : ""}
            onClick={() => setMedia("image")}
          >
            images
          </span>
          <span
            className={media == "video" ? "active" : ""}
            onClick={() => setMedia("video")}
          >
            videos
          </span>
        </div>

        <div className="list-of-medias">
          {media == "image" &&
            data &&
            data.images.length >= 1 &&
            data.images.map((a) => (
              <div key={a} className="list-gallery">
                <img src={`${Server}/public/gallery/${id}/${a}`} />
              </div>
            ))}
          {media == "video" &&
            data &&
            data.videos.length >= 1 &&
            data.videos.map((a) => (
              <div key={a} className="list-gallery">
                <img src={`${Server}/public/gallery/${id}/${a}`} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

const imglist = [
  "/provide/edu.png",
  "/provide/i2.png",
  "/provide/i4.png",
  "/provide/skill.png",
];

const vidlist = ["/provide/edu.png", "/provide/i2.png"];
export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(
    `${Server + API.eventid(context.query.id)}?uid=${cookie}`
  );
  console.log(responce.data)
  return {
    props: { id: context.query.id, data: responce.data },
  };
}
