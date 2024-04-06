import axios from "@/plugins/vuex/axios";

export default function(url, data, mutationName = null, context) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response) => {
                if (mutationName !== null) {
                    context.commit(mutationName, response.data)
                }
                resolve(response.data)
            })
            .catch((error) => {
                if (error === 'connectionRefused') {
                    reject(error)
                }

                console.log(error.response)
                reject(error.response.data['hydra:description'])
            })
    })
}