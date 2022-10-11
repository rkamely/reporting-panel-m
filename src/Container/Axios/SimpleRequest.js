import axios from "axios";

const SimpleRequest = (apiType, axiosType, url, data) => {
    return new Promise((resolve, reject) => {
        if (apiType === 'login'){
            if (data.username === 'mtnadmin' && data.password === '123456'){
                resolve(true)
            }
            else{
                reject(false)
            }
        }
        else{
            axios({
                method: axiosType,
                url: url,
                headers: {
                    'Pragma': 'no-cache',
                    'Content-Type': 'application/json'
                },
                // data: JSON.stringify({
                //     token: tokenValue
                // })
            })
                .then((response) => {
                    resolve(response)
                })

                .catch((err) => {
                    reject(err)
                });
        }
    })
}

export default SimpleRequest;