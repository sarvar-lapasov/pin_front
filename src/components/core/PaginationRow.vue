<template>
    <paginate
        class="pagination justify-content-center fs-1 fs-sm-5"
        v-if="All > 6"
        v-model="page"
        :page-count="Math.ceil(All / 6)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
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
        LastPage: {
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
