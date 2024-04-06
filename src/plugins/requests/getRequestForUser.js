import axios from "@/plugins/vuex/axios";

export default function(url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response) => {

                context.commit(mutationName, response.data.data)
                resolve()
            })
            .catch((error) => {
                console.log(error);
                if (error === 'connectionRefused') {
                    reject(error)
                }

                console.log(error.response)
                reject(error.response.data['hydra:description'])
            })
    })
}