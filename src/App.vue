<template>
  <div v-if="
            $route.path !== '/login' &&
            $route.path !== '/register' 
        "
   class="flex">
      <SideBar/>
      <router-view />
  </div>
  <div class="flex justify-center items-center" v-else style="height: 100vh">
        <router-view />
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  name: "App",
  components:{
      SideBar
  }
};
</script>
<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    scroll-behavior: smooth;
}

article,
aside,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
    display: block;
}
body {
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #181828;
    text-align: left;
    background-color: #fff;
}
</style>
