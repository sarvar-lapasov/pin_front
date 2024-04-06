<template>
    <div class="home">
            <HeaderRow class="bg-white"/>
            <ProductList/>
    </div>  
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import HeaderRow from "@/components/HeaderRow.vue";

export default {
    name: "HomePage",
    components: {
        HeaderRow,
        ProductList,
    },
   
}
</script>
<style>
.home {
    width: 100%;
    background-color:#f2f2f6;
}
</style>