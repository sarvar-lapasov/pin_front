import axios from "@/plugins/vuex/axios"

export default function(url, data, mutationName = null, context) {
    data = data || {}; // Ensure data is defined and not null
    data.page = data.page || 1;

    if (data && Object.keys(data).length > 0) {
        url += '?';
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                url += `${key}=${encodeURIComponent(value)}&`;
            }
        });
        url = url.slice(0, -1);
    }

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