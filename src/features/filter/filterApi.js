import axios from "axios";
import { api } from "../../config/index";
export const getFilterDoctors = async (experts, fees, genders, ratingss, status) => {
    let queryString = '';
    if (experts?.length > 0) {
        queryString += experts.map(tag => `expert=${tag}`).join("&");
    }
    if (fees?.length > 0) {
        queryString += fees.map(fee => `&fees=${fee}`).join("&");
    }
    if (genders?.length > 0) {
        queryString += genders.map(gen => `&gender=${gen}`).join("&");
    }
    if (ratingss?.length > 0) {
        queryString += ratingss.map(rating => `&ratings=${rating}`).join("&");
    }
    if (status?.length > 0) {
        queryString += status.map(active => `&isActive=${active}`).join("&");
    }
    // if (search !== '') {
    //     queryString += `&q=${search}`;
    // }
    const response = await axios.get(`${api}/doctors/?${queryString}`);
    return response.data;
}
export const getFilterNurses = async (expert, gender, location) => {
    let link = `${api}/get/nurses`;
    if (location) {
        link = `${api}/get/nurses?location=${location}`
    }
    const response = await axios.get(link);
    return response.data;
}

export const getSingleNurse = async (id) => {
    const response = await axios.get(`${api}/get/nurse/${id}`);
    return response.data;
}