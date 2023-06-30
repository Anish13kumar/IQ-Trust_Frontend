import { useRouter } from "next/router";
import axios from "axios";
import { API, Server } from "@/api/apiCalls";


export default function voulnteer(props) {
    const router = useRouter();
    return (
        <div className="peoples">
            <div className="head">
                <h1>Happy volunteers</h1>
            </div>

            <div className="person">
                <div
                    className="apply-voulenteer-box"
                    onClick={() => router.push("/voulenteer/new")}
                >
                    <i className="bi bi-person-plus"></i>
                    <b>apply volunteer </b>
                </div>
                {props.data &&
                    props.data.map((a) => (
                        <img
                            className="perimg"
                            src={`${Server}/public/volunteers/${a.image_name}`}
                        />
                    ))}

            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const cookie = context.req.cookies.token;
    const responce = await axios.get(`${Server + API.volunteers}?uid=${cookie}`);
    return {
        props: { data: responce.data },
    };
}