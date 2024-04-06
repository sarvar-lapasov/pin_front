import { createStore } from 'vuex';
import product from "@/plugins/vuex/product";
import user from "@/plugins/vuex/user";

export default createStore({
    modules: {
        product,
        user
    }
})