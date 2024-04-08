<template>
    <paginate
        class="flex justify-center mt-5"
        v-if="All > 6"
        v-model="page"
        :page-count="Math.ceil(All / 6)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'<<'"
        :disabled-class="'bg-gray-200  hover:bg-gray-200'"
        :prev-class="'rounded-full w-12 h-12 flex justify-center text-xl items-center ease-in-out duration-300 border-2 border-dark-500 hover:bg-gray-100'"
        :next-class="'rounded-full w-12 h-12 flex justify-center text-xl items-center ease-in-out duration-300 border-2 border-dark-500 hover:bg-gray-100'"
        :next-text="'>>'"
        :prev-link-class="'w-full h-full flex justify-center items-center'"
        :next-link-class="'w-full h-full flex justify-center items-center'"
        :container-class="'flex gap-2 items-center cursor-pointer'"
        :page-link-class="'w-full h-full flex justify-center items-center'"
        :page-class="'rounded-full w-12 h-12 flex justify-center text-xl  items-center ease-in-out duration-300 border-2 border-dark-500 hover:bg-gray-100'"
        :active-class="'bg-[#0FC5FF] text-white hover:bg-[#0FC5FF]'"
    >
    </paginate>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "PaginationRow",
    data() {
        return {
            page: 1,
        };
    },
    props: {
        All: {
            type: Number,
            required: true,
        },
    },
    components: {
        paginate: Paginate,
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapActions([]),
        clickCallback(pageNum) {
            this.$emit("pageClick", pageNum);
        },
    },
    watch: {
        'page'() {
            window.scrollTo(0, 0);
        },
        'LastPage'() {
            return (this.page = 1);
        },
    },
    mounted() {},
};
</script>

<style scoped>
.pagination {
    cursor: pointer;
}

.page-link {
    color: #23a036 !important;
}
</style>
