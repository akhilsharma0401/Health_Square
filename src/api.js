import { openDB } from "idb";
//import {constant} from './pages'
const DB_NAME = "DIGIBIMA";
const STORE_NAME = "digibima";
import constant from "@/src/env";
import axios from "axios";

export async function callApi(url, method = "POST", data = null) {
  // console.log(url, data);
  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify({ data: data });
  }
  try {
    let res = await fetch(url, options);
    if (!res.ok) {
      return { status: false, data: { results: [], total: 0 } };
    }
    return await res.json();
  } catch (e) {
    return { status: false, data: { results: [], total: 0 } };
  }
}


export async function callApiData(url, method = "POST", data = null) {
  console.log(url, data);

  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    let res = await fetch(url, options);
    if (!res.ok) {
      return { status: false, data: null };
    }
    return await res.json();
  } catch (e) {
    return { status: false, data: null };
  }
}


// export async function callApi(url, method = "POST", data = null) {
//   const token = localStorage.getItem("token");

//   try {
//     const res = await axios({
//       method,
//       url,
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `${token}`,
//       },
//       data: data ? { data } : undefined,
//     });

//     return res.data;
//   } catch (err) {
//     console.error("API Error:", err.response?.data || err.message);
//     throw err;
//   }
// }

export async function callApiWithFile(url, method = "POST", payload = null) {
  const token = localStorage.getItem("token");
  const isFormData =
    typeof FormData !== "undefined" && payload instanceof FormData;

  const options = {
    method,
    headers: {},
  };

  // if (token) options.headers.Authorization = `${token}`;

  if (payload != null) {
    if (isFormData) {
      options.body = payload;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload);
    }
  }

  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    const errText = ct.includes("application/json")
      ? JSON.stringify(await res.json())
      : await res.text();
    throw new Error(`API request failed: ${res.status} ${errText}`);
  }

  return ct.includes("application/json") ? res.json() : res.text();
}


