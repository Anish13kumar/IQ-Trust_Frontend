import { useRouter } from "next/router";
import Head from "next/head";
import { API, Server } from "@/api/apiCalls";
import axios from "axios";
export default function Home({ data }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Event - IQ Global Trust</title>
      </Head>
      <div className="event-home-tab">
        <h1>List of Events</h1>
        <div className="list-of-events">
          {data.map((a) => {
            let percentage =
              (parseInt(a.amount_collected) / parseInt(a.amount_expected)) *
              100;
            percentage = percentage > 100 ? 100 : percentage;
            return (
              <div className="event-card" key={a._id}>
                <img src={Server + "/public" + a.tumbnail} />
                <div className="content">
                  <span className="title">{a.title}</span>
                  <span className="dist">{a.event}</span>
                  <p>
                    ₹{a.amount_collected} Donated of ₹{a.amount_expected}
                  </p>
                  <div className="progres">
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></span>
                    <span
                      style={{
                        left: `${percentage - 1}%`,
                      }}
                    ></span>
                  </div>
                  <button
                    className="btn"
                    onClick={() => router.push(`/events/${a._id}`)}
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="help-events">
          <h1>How you can Help</h1>
          <div className="help-details">
            <p>
              <b>&#9989;</b>
              We want to do more and you can help. By committing a small
              fraction of your income to protect children in need, you can help
              save a child and contribute to humanity. You can donate as low as
              INR 500 per month.
            </p>
            <p>
              <b>&#9989;</b>
              While Save the Children appreciates monthly donations more where
              you choose to donate a small fixed amount monthly for us to be
              able to plan our programs for longer term, a single donation can
              also help save a child.
            </p>
            <p>
              <b>&#9989;</b>
              You will get your tax exemption certificate within 15 days of your
              one time donation (quarterly in case of regular donors, who pledge
              monthly donations, after their first month’s donation). You will
              get quarterly updates on how you are making a difference.
            </p>
          </div>
          <button className="btn" onClick={() => router.push("/donate")}>
            i want to donate
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.cookies.token;
  const responce = await axios.get(`${Server + API.events}?uid=${cookie}`);
  return {
    props: { data: responce.data },
  };
}
