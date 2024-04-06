import axios from "@/plugins/vuex/axios";

export default function(url, id, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .get(url + '/' + id)
            .then((response) => {
                context.commit(mutationName, response.data)
                resolve()
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