const BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : 'https://react-redux-heroes-api.onrender.com';

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(BASE_URL + url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}