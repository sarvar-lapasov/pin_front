import axios from "@/plugins/vuex/axios"

export default function(url, data, mutationName = null, context) {
    data.page = data.page || 1;
    url += "?page=" + data.page;

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                let contents = {
                    models: response.data.data,
                    totalItems: response.data.meta.total,
                }
                context.commit(mutationName, contents)
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error.response)
                reject(error.response.data['hydra:description'])
            })
    })
}