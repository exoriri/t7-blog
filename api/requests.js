import axios from 'axios';

const getUrlWithParams = (url, params) => {
    const urlWithParams = new URL(url);
   
    for (let key in params) {
        urlWithParams.set(`${key}`,`${params[key]}`)
    }

    return urlWithParams;
};

export const getData = async (url, params={}) => {
    const urlWithParams = getUrlWithParams(url, params);

    const response = await axios.get(urlWithParams);
    return response.data;
}


//Attemp make request with percentage loading
export const getWithLoading = (url, params={}) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', getUrlWithParams(url, params));
    
        xhr.send();

        xhr.onload = e => {
            if (xhr.status !== 200) {
                rej(e)
            } else {
                res(xhr.response);
            }
        };
        
        xhr.onprogress = e => {
            if (e.lengthComputable) {
                res(xhr.loaded / e.total * 100);
            } else {
                res(`Получено ${xhr.loaded}`)
            }
        }
    })
}