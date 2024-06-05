import { API_URL } from "./api.js";

// 전역 캐시 객체
let cache = new Map();

/**
 * 주어진 URL에서 데이터를 비동기적으로 가져오는 함수
 * @param {string} url - 데이터를 가져올 URL
 * @returns {Promise<Object|null>} - 성공 시 JSON 데이터, 실패 시 null 반환
 */
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * 주어진 id에 따라 URL을 설정하고 데이터를 요청하는 함수
 * @param {string} id - 요청할 데이터의 id
 * @returns {Promise<Object|null>} - 성공 시 JSON 데이터, 실패 시 null 반환
 */
export const request = async (id) => {
    const url = id === 'root' ? API_URL : `${API_URL}/${id}`;
    return await fetchData(url);
}

/**
 * 모달과 Breadcrumb을 받아서 노드를 렌더링하는 비동기 함수
 * @param {Object} modal - 모달 객체
 * @param {Object} breadCrumb - Breadcrumb 객체
 * @param {string} id - 요청할 데이터의 id
 * @returns {Promise<Object>} - 상태 객체 반환
 */
export const renderNodes = async (modal, breadCrumb, id) => {
    modal.setModal("./assets/nyan-cat.gif", 'Modal Loading');
    const result = await request(id);
    modal.setModal("", 'hidden');

    return result ? { nodes: result, depth: breadCrumb.state } : { nodes: [], depth: breadCrumb.state };
}

/**
 * 캐시에 해당 id의 데이터가 있는지 확인하는 함수
 * @param {string} id - 데이터의 id
 * @returns {Object|null} - 캐시에 있으면 데이터 반환, 없으면 null 반환
 */
export const checkCache = (id) => cache.get(id) || null;

/**
 * 캐시에 데이터를 추가하는 함수
 * @param {string} id - 데이터의 id
 * @param {Object} data - 캐시에 저장할 데이터
 */
export const addCache = (id, data) => {
    cache.set(id, data);
}
