import axios from 'axios'
import { ProfileStore } from '../api/store'
type Methods = "GET" | "SEARCH" | "POST" | "PATCH" | "DELETE"
type Routes = "profile" | "profiles" | "search"


export default async function request(method: Methods, route: Routes, data?: any) {
    try {
        console.log(data)
        let response = method === "GET" ? await axios.get(`https://calvary-api.herokuapp.com/${route}`) :
            method === "SEARCH" ? await axios.get(`https://calvary-api.herokuapp.com/search?${data}`) :
                method === "POST" ? await axios.post(`https://calvary-api.herokuapp.com/${route}`, JSON.parse(JSON.stringify(data))) :
                    method === "PATCH" ? await axios.patch(`https://calvary-api.herokuapp.com/${route}`, JSON.parse(JSON.stringify(data))/* { "name": "Emman", "id": "5ebfaf4363ba99002587e485" } */) :
                        method === "DELETE" ? await axios.delete(`https://calvary-api.herokuapp.com/${route}`, { data: { "id": data } }) : await axios.get(`https://calvary-api.herokuapp.com/${route}`);
        console.log(response);
        if (response) {
            method === "GET" ? ProfileStore.init(response.data) :
                method === "POST" ? ProfileStore.addProfile(response.data) :
                    method === "PATCH" ? ProfileStore.updateProfile(response.data) :
                        method === "DELETE" ? ProfileStore.deleteProfile(response.data) :
                            console.log("Ignoring this one")
        }

        var evt = new CustomEvent('onresponse', {
            detail: {
                status: response.status,
                statusText: response.status >= 200 && response.status <= 299 ?
                    method === "GET" ? "Fetching data is complete" :
                        method === "POST" ? "New member added successfully" :
                            method === "PATCH" ? "Member info updated successfully" :
                                method === "DELETE" ? "Member deleted successfully" : ""
                    : `An error occured ${response.statusText}`
            }
        });
        window.dispatchEvent(evt);
        return response
    } catch (error) {
        var errEvt = new CustomEvent('onresponse', {
            detail: {
                status: 400,
                statusText: error
            }
        })
        window.dispatchEvent(errEvt);
        console.error(error);
    }
}




