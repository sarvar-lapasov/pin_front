import axios from "@/plugins/vuex/axios";

export default function(url, id) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url + '/' + id)
            .then((response) => {
                console.log(response)
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