import axios from 'axios';

const generateQueryString = (params) => {
    return Object.keys(params).reduce((acc, key, i) => {
        let sym = '';
        if (i === 0){
            sym = '?';
        } else {
            sym = '&';
        }

        return acc + `${sym}${key}=${params[key]}`;
    }, '');
};

export const getData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}