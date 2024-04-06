<template>
    <div class="sidebar">
        <div class="d-flex">
            <div class="bg-white me-3 box-r">
                <img class="logo" src="../../public/assets/logo.png" alt="">
            </div>
            <h2 class="erp">Enterprise Resource Planning</h2>
        </div>
       

</div>
</template>

<script>
export default {
    name: "SideBar",
}
</script>

<style scoped>
.logo{
    margin: 18px 12px;
    width: 53px;
    background-color:white;
    height: 22px;
}
.box-r{
    border-bottom-right-radius: 20px 20px;
}
.erp{
    color: white;
    font-size: 11px;
    width: 50px;
    margin-top: 7px;
}
.sidebar{
    width: 180px;
    background-color: #374050;
    height: 100vh;
}
</style>
