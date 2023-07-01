export const Server = "https://apitrust.youngstorage.in";

export const API = {
  usercheck: (uid) => `/auth/usercheck?uid=${uid}`,
  signin: "/auth/signin",
  signout: "/auth/signout",
  events: "/events",
  eventid: (eventid) => `/events/${eventid}`,
  gallery: (eventid) => `/gallery/${eventid}`,
  volunteers: "/volunteers",
  volunteerId: (id) => `/volunteers/${id}`,
  contact: "/contact",
};

// route = routing method
// method = [GET,POST,PATCH,DELETE]
// body = body data
// datatype = [form,json]
export const Fetcher = async (props) => {
  const responce = await fetch(Server + props.route, {
    method: props.method,
    headers: {
      "Content-Type": props.datatype,
    },
    body: props.body,
  })
    .then((re) => re)
    .catch((e) => e);
  return responce;
};

export const GetCookieToken = () => {
  let cookies = document.cookie.split(";");
  cookies.filter((a) => a.startsWith("token="));
  if (cookies.length >= 1) {
    cookies = cookies[0].split("=")[1];
  } else {
    cookies = "";
  }
  return cookies;
};
