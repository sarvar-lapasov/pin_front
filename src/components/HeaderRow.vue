<template>
   <div class="px-3">
    <nav
        class="flex"
        style="height: 80px;"
    >
        <div
            class="w-full flex"
        >
            <ul
                class="flex "
            >
                <li class="flex items-center px-3">
                    <router-link
                        :active-class="'active'"
                        class="text-red-500 h-full py-7 border-b-4 border-red-500"
                        to="/"
                    >ПРОДУКТЫ
                    </router-link
                    >
                </li>
            </ul>
        </div>
        <div
            class="flex justify-center items-center"
        >
            <ul
                class="user h-full py-6 px-2"
            >
                <li
                    v-if="getUser"
                   
                    class=" user__item m-0 h-full"
                ><p  class="m-0" >{{ getUser.name }}</p>
                <ul class="user__navbar">
                        <li class="w-full flex border-b-2 border-gray-500 pb-2">
                            <h3
                                class="text-yellow-400 mx-auto text-2xl font-medium"
                            >
                                {{ getUser.name }}
                            </h3>
                        </li>
                        <li class="mt-6">
                            <button
                                class="flex items-center text-start"
                                @click="click()"
                            >
                                <svg
                                    class="mr-2"
                                    fill="none"
                                    style="width: 21px; height: 21px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.331.021a4.435 4.435 0 0 1 4.43 4.227l.005.208v.933a.75.75 0 0 1-1.493.102l-.007-.102v-.933a2.935 2.935 0 0 0-2.763-2.93l-.172-.005H4.456a2.935 2.935 0 0 0-2.929 2.763l-.005.172v11.13a2.935 2.935 0 0 0 2.762 2.93l.172.006h4.885a2.925 2.925 0 0 0 2.92-2.753l.005-.171v-.944a.75.75 0 0 1 1.493-.101l.007.101v.944a4.425 4.425 0 0 1-4.21 4.418l-.215.006H4.456a4.435 4.435 0 0 1-4.43-4.227l-.004-.209V4.456A4.435 4.435 0 0 1 4.247.026l.209-.005h4.875Zm7.995 6.481.084.073 2.928 2.915c.027.026.05.053.071.08l-.07-.08a.75.75 0 0 1 .129.171l.007.015a.695.695 0 0 1 .034.075l.012.034a.659.659 0 0 1 .019.064l.007.036a.638.638 0 0 1 .012.136v.029c0 .015-.002.03-.004.046l.005-.075a.755.755 0 0 1-.013.137l-.008.035a.65.65 0 0 1-.019.068l-.011.03a.68.68 0 0 1-.032.073l-.01.017a.743.743 0 0 1-.127.17l-.002.002-2.928 2.916a.75.75 0 0 1-1.13-.98l.072-.083 1.639-1.636-10.223.001a.75.75 0 0 1-.101-1.493l.101-.007h10.225l-1.641-1.633a.75.75 0 0 1-.075-.977l.073-.084a.75.75 0 0 1 .976-.075Z"
                                        fill="#FFC600"
                                    />
                                </svg>
                                <span class="pb-0.5">
                                    Log out
                                </span>
                            </button>
                        </li>
                    </ul>
                </li>
                <li v-else class="w-full flex justify-end items-center">
                    <router-link
                        class=" text-black sign-in"
                        to="/login"
                    >
                        <svg
                            class="mr-2"
                            style="width: 21px; height: 21px"
                            viewBox="0 0 1692.02 1727.6"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                id="Untitled-2.svg"
                                d="M804.07 0c204.59,0 373.08,160.78 382.68,365.11l0.42 17.96 0 80.6c0,35.75 -29.02,64.74 -64.77,64.74 -32.35,0 -59.78,-23.9 -64.18,-55.96l-0.62 -8.81 0 -80.6c0.03,0.03 0.03,0.03 0.03,0.03 0,-134.24 -104.7,-245.24 -238.68,-253.11l-14.85 -0.42 -421.1 0c-134.21,0.03 -245.14,104.7 -253.01,238.68l-0.42 14.85 0 961.36c0,0 0,0 0,0 0,134.21 104.63,245.21 238.58,253.11l14.85 0.52 421.95 -0.03c0.03,0 0.03,0 0.03,0 133.75,0 244.36,-104.27 252.22,-237.79l0.42 -14.76 0 -81.55c0.07,-35.71 29.06,-64.67 64.77,-64.67 32.35,0 59.78,23.9 64.18,55.96l0.62 8.72 0 81.55c-0.03,203.74 -160.16,371.71 -363.65,381.6l-18.58 0.52 -421.98 0c-204.53,0 -373.01,-160.78 -382.61,-365.11l-0.36 -18.05 -0.03 -961.36c0.03,-204.46 160.72,-372.98 364.95,-382.65l18.05 -0.42 421.07 0zm-2.29 549.66l-7.25 6.3 -252.91 251.8c-2.32,2.25 -4.31,4.57 -6.14,6.92l6.04 -6.92c-4.41,4.37 -8.59,9.37 -11.13,14.76l-0.62 1.31c-1.14,2.09 -2.25,4.41 -2.97,6.46l-1.04 2.94c-0.62,1.83 -1.31,3.82 -1.63,5.55l-0.62 3.1c-0.65,3.53 -1.01,7.12 -1.01,10.71 0,0.36 0,0.88 0,1.04l0 2.51c0,1.31 0.16,2.58 0.36,3.98l-0.42 -6.46c-0.03,3.92 0.23,8.1 1.08,11.79l0.69 3.04c0.46,1.99 1.01,4.15 1.66,5.88l0.95 2.58c0.82,2.15 1.73,4.51 2.81,6.33l0.85 1.47c2.94,5.39 6.66,10.38 10.97,14.66l0.16 0.16 252.91 251.86c12.11,12.05 28.53,18.8 45.61,18.8 35.78,0 64.77,-28.99 64.77,-64.77 0,-13.91 -3.75,-28.17 -12.8,-38.65l-6.24 -7.18 -141.59 -141.33 883.01 0.1c35.81,-0.07 64.74,-29.06 64.74,-64.77 0,-32.35 -23.8,-61.9 -55.96,-64.18l-8.72 -0.62 -883.14 0.03 141.75 -141.06c12.18,-12.14 19.07,-28.7 19.07,-45.93 0,-13.84 -3.62,-28.04 -12.63,-38.42l-6.3 -7.25c-12.18,-12.24 -28.7,-19.1 -45.93,-19.1 -13.81,0 -48.15,22.36 -38.39,12.6l0.03 -0.03z"
                                fill="#FFC600"
                                fill-rule="nonzero"
                            />
                        </svg>
                       Sign In
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
   </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "HeaderRow",
   
    computed: {
        ...mapGetters(['getUser']),
    },
    data() {
        return {
            name: "",
        };
    },
    methods: {
        click() {
            this.$router.push("/login")
                .then(() => {
                    localStorage.setItem("accessToken", "");
                    localStorage.setItem("user", "");
                    window.location.reload();
                });
        },
    },
   
};
</script>

<style scoped>
.user {
    min-width: 120px;
    margin: 0 auto;
}

.user__item {
    position: relative;
    width: auto;
    padding: 0;
    display: flex;
    justify-content: end;
    cursor: pointer;
    transition: all 0.3s ease-in;
}

.user__item:hover .user__navbar {
    display: block;
    transition: all 0.3s ease-in;
}

.user__navbar {
    transition: all 0.3s ease-in;
    display: none;
    position: absolute;
    top: 30px;
    right: 0;
    cursor: default;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #cccccc;
    min-width: 222px;
    padding: 30px;
    list-style: none;
}

.sign-in {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 !important;
    width: auto;
    margin: 0;
}

.user_image {
    width: 40px;
    height: 40px;
    background-color: #ffc600;
    color: white;
}


</style>
