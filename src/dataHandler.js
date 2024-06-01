import { API_URL } from "./api.js";

let cache = new Map(); // 전역 변수 선언

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        return null; // 오류 발생 시 null 반환
    }
}

export const request = async (id) => {
    const url = id === 'root' ? API_URL : `${API_URL}/${id}`;
    return await fetchData(url);
}

export const renderNodes = async (modal, breadCrumb, id) => {
    modal.setModal("./assets/nyan-cat.gif", 'Modal Loading'); // 로딩 모달 띄우기!
    const result = await request(id);
    modal.setModal("", 'hidden'); // 로딩 모달 닫기

    if (result) {
        const states = { nodes: result, depth: breadCrumb.state };
        return states;
    } else {
        return { nodes: [], depth: breadCrumb.state }; // 데이터가 없을 때 빈 배열 반환
    }
}

export const checkCache = (id) => {
    return cache.has(id) ? cache.get(id) : null;
}

export const addCache = (id, data) => {
    cache.set(id, data);
}
