import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCharacters = async (page = 1, name = '', status = '') => {
    const response = await client.get('/characters', {
        params: { page, name, status },
    });
    return response.data;
};

export const getCharacter = async (id: number) => {
    const response = await client.get(`/characters/${id}`);
    return response.data;
};

export const getEpisodes = async (page = 1, name = '') => {
    const response = await client.get('/episodes', {
        params: { page, name },
    });
    return response.data;
};

export const getLocations = async (page = 1, name = '') => {
    const response = await client.get('/locations', {
        params: { page, name },
    });
    return response.data;
};

export default client;
