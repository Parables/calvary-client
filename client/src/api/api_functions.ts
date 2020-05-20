import axios from 'axios'
import { ProfileStore } from '../api/store'
type Methods = "GET" | "SEARCH" | "POST" | "PATCH" | "DELETE"
type Routes = "profile" | "profiles" | "search" | "signin" | "signup"

// http://0.0.0.0:3000/ https://calvary-api.herokuapp.com
export default async function request(method: Methods, route: Routes, data?: any) {
    try {
        console.log("datas", data)
        let response = method === "GET" ? await axios.get(`http://0.0.0.0:3000/${route}`) :
            method === "SEARCH" ? await axios.get(`http://0.0.0.0:3000/search?${data}`) :
                method === "POST" ? await axios.post(`http://0.0.0.0:3000/${route}`, JSON.parse(JSON.stringify(data))) :
                    method === "PATCH" ? await axios.patch(`http://0.0.0.0:3000/${route}`, JSON.parse(JSON.stringify(data))) :
                        method === "DELETE" ? await axios.delete(`http://0.0.0.0:3000/${route}`, { data: { "id": data } }) : await axios.get(`http://0.0.0.0:3000/${route}`);
        console.log(response);
        if (response) {
            if (response.headers["content-type"] === "text/html; charset=utf-8" && JSON.stringify(response.data).includes("/signin")) {
                window.location.replace("/#/signin")
            } else {
                method === "GET" ? ProfileStore.init(response.data) :
                    method === "POST" ? ProfileStore.addProfile(response.data) :
                        method === "PATCH" ? ProfileStore.updateProfile(response.data) :
                            method === "DELETE" ? ProfileStore.deleteProfile(response.data) :
                                console.log("Ignoring this one")

                var evt = new CustomEvent('onresponse', {
                    detail: {
                        status: response.status,
                        statusText: response.status >= 200 && response.status <= 299 ?
                            method === "GET" ? "Fetching data is complete" :
                                method === "POST" ? `New ${route} added successfully` :
                                    method === "PATCH" ? `${route} info updated successfully` :
                                        method === "DELETE" ? `${route} deleted successfully` : ""
                            : `An error occured ${response.statusText}`
                    }
                });
                window.dispatchEvent(evt);
                if (method === "POST" || method === "PATCH" || method === "DELETE") window.location.replace("/")
                return response
            }
        }
    } catch (error) {
        //   if (JSON.stringify(error).includes("401")) window.location.replace("/#/signin")
        console.log("Error throw", error)
        var errEvt = new CustomEvent('onresponse', {
            detail: {
                status: 401,
                statusText: error
            }
        })
        window.dispatchEvent(errEvt);
        console.error(error);
    }
}




