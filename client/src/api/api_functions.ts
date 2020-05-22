import axios from 'axios'
import { ProfileStore } from '../api/store'
type Methods = "GET" | "SEARCH" | "POST" | "PATCH" | "DELETE"
type Routes = "profile" | "profiles" | "search" | "signin" | "signup"

export default async function request(method: Methods, route: Routes, data?: any) {
    try {
        let response = method === "GET" ? await axios.get(`https://calvary-api.herokuapp.com/${route}`) :
            method === "SEARCH" ? await axios.get(`https://calvary-api.herokuapp.com/search?${data}`) :
                method === "POST" ? await axios.post(`https://calvary-api.herokuapp.com/${route}`, JSON.parse(JSON.stringify(data))) :
                    method === "PATCH" ? await axios.patch(`https://calvary-api.herokuapp.com/${route}`, JSON.parse(JSON.stringify(data))) :
                        method === "DELETE" ? await axios.delete(`https://calvary-api.herokuapp.com/${route}`, { data: { "id": data } }) : await axios.get(`https://calvary-api.herokuapp.com/${route}`);
        if (response) {
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
                        : `An error occured ${response.statusText}`,
                    data: response.data
                }
            });
            window.dispatchEvent(evt);
            if (method === "POST" || method === "PATCH" || method === "DELETE") window.location.replace("/#/home")
            return response
        }
    } catch (error) {
        console.log("Error throw", error)
        var errEvt = new CustomEvent('onresponse', {
            detail: {
                status: 401,
                statusText: error
            }
        })
        window.dispatchEvent(errEvt);
    }
}




