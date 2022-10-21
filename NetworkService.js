/**
 * Retries a fetch to the database and fails after a set number of retries above
 * @param {*} url
 * @param {*} req
 * @param {*} source
 * @return Promise
 */        
const fetchAPI = (url, req, source) => new Promise((resolve, reject) => {
    console.log("fetchAPI url " + url);
    console.log("fetchAPI req " + JSON.stringify(req));
    fetch(url)
        .then(res => {
            console.log("fetchAPI then ");
            if (res?.status >= 400) {
                console.log("fetchAPI " + res.status);
                reject(false);
            } else {
                console.log("fetchAPI " + res);
                resolve(res);
            }
        })
        .catch(error => {
            console.error("fetchAPI " + error);
            reject(error);
        });
  });

// Default fetch data function
const fetchData = async ({ url, payload, headers, method, source }) => {
    let req = {
        method: method ? method : "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    };

    // Append body if payload is passed
    if (payload) {
        const body = { body: payload };
        req = Object.assign({ ...req }, body);
    }

    const data = await fetchAPI(url, req, source);
    return await data.json();
};

/**
 * Demo a request that is expected to fail.
 * 
 * @param {*} payload 
 * @returns 
 */
 const badRequest = async payload => {
    const res = await fetchData({
        url: "https://dsjkdjskdjskdusidj.com/edsewiofsk/",
        payload: JSON.stringify({ payload: payload }),
        source: payload?.source
    });
    if (res && res.user) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(res);
    }
};

/**
 * Demo a request that is expected to resolve successfully.
 * 
 * @param {*} payload 
 * @returns 
 */
const goodRequest = async payload => {
    const obj = {
        url: "https://www.fullstackoasis.com/rnb/movies.php",
        method: "GET"
    };
    if (payload) {
        obj.payload = JSON.stringify({ user: payload });
        if (payload.source) {
            obj.source = payload.source;
        }
    }
    const res = await fetchData(obj);
    if (res) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(res);
    }
};

export default {
    fetchData,
    badRequest,
    goodRequest
};