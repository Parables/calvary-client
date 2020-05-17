import { writable } from "svelte/store";
import { fromJS } from 'immutable'
import alasql from 'alasql'

const PROFILE_STORE = writable([]);

function getIndex(Data, data) {
    return Data.findIndex(dt => dt['_id'] === data._id);
}

function updateStore(allData, data) {
    const index = getIndex(allData, data);
    const Data = fromJS(allData);
    const updatedStore = Data.setIn([index], data);
    return updatedStore.toJS()
}

function deleteStore(allData, data) {
    const index = getIndex(allData, data);
    const Data = fromJS(allData);
    const deletedStore = Data.delete(index);
    return deletedStore.toJS()
}

function searchByID(allData, id) {
    let res = alasql("SELECT * FROM ? WHERE _id === ?", [allData, id])
    console.info(`Search for ${id} returned ${JSON.stringify(res)}`)
    return res
}

function profileStore() {
    return {
        init: (data) => PROFILE_STORE.set(data),
        subscribe: PROFILE_STORE.subscribe,
        addProfile: (data) => PROFILE_STORE.update(allProfiles => [...allProfiles, data]),
        updateProfile: (data) => PROFILE_STORE.update(allProfiles => updateStore(allProfiles, data)),
        deleteProfile: (data) => PROFILE_STORE.update(allProfiles => deleteStore(allProfiles, data)),
        getProfileByID: (id) => searchByID(PROFILE_STORE, id)
    };
}


export const currentItem = writable({});
export const ProfileStore = profileStore();