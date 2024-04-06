import deleteRequest from "@/plugins/requests/deleteRequest";
import getRequest from "@/plugins/requests/getRequest";
import getRequests from "@/plugins/requests/getRequests";
import postRequest from "@/plugins/requests/postRequest";
import putRequest from "@/plugins/requests/putRequest";

export default {
    actions: {
        fetchProducts(context, data) {
            return getRequests('/products', data, 'updateProducts', context)
        },
        fetchProduct(context, productId) {
            return getRequest('/products', productId, 'updateProduct', context);
        },
        deleteProduct(context, productId) {
            return deleteRequest('/products', productId)
        },
        pushProduct(context, data) {
            console.log(data);
            return postRequest('/products', data);
        },
        editProduct(context, { id, data }) {
            console.log(id, data);
            return putRequest('/products/' + id, data)
        },
    },

    mutations: {
        updateProducts(state, products) {
            state.products = products;
        },
        updateProduct(state, product) {
            state.product = product;
        },

    },
    state: {
        products: {
            models: [],
            totalItems: 0,
        },
        product: '',


    },
    getters: {
        getProducts(state) {
            return state.products.models;
        },
        getProduct(state) {
            return state.product;
        },
        getProductTotal(state) {
            return state.products.totalItems;
        },
    },
};