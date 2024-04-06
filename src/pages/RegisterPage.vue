<template>
    <div class="container mx-5 right-panel-active" id="container">
        <div class="form-container sign-up-container">
            <form @submit.prevent="auth">
                <h1 class="fs-2">Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social"
                    ><i class="fab fa-facebook-f"></i
                    ></a>
                    <a href="#" class="social"
                    ><i class="fab fa-google-plus-g"></i
                    ></a>
                    <a href="#" class="social"
                    ><i class="fab fa-linkedin-in"></i
                    ></a>
                </div>
                <span>or use your email for registration</span>
                <input
                    class="form-control"
                    type="text"
                    placeholder="Name"
                    v-model="form.name"
                />
                <input
                    class="form-control"
                    type="email"
                    placeholder="Email"
                    autocomplete
                    v-model="form.email"/>
                <input
                    class="form-control"
                    type="password"
                    placeholder="Password"
                    autocomplete
                    v-model="form.password"
                />
                <input
                    class="form-control"
                    type="password"
                    placeholder="Password"
                    autocomplete
                    v-model="form.password_confirmation"
                />
                <button class="mt-2" type="submit">Sign Up</button>
                <span class="mt-3 w-576">Are you already registered? <router-link to="/login"
                                                                                  class="mx-2 my-0  text-warning link">Sign In</router-link></span>
            </form>
        </div>
        <sign-overlay-row/>
    </div>
    
</template>

<script>
import {mapActions} from "vuex";
import SignOverlayRow from "@/components/core/signOverlayRow.vue";


export default {
    name: "RegisterPage",
    components: {SignOverlayRow},
    data() {
        return {
            form: {
                email: "",
                password: "",
                name: "",
                password_confirmation:"",
            },
        };
    },
    computed: {
      
    },
    methods: {
        ...mapActions(["register", "fetchUserToken","aboutMe"]),
        auth() {
            this
                .register(this.form)
                .then((response) => {
                    console.log(response);
                    this
                        .fetchUserToken(this.form)
                        .then((res) => {
                            console.log(res);
                            this.aboutMe()
                            this.$router.push("/");
                        });
                });
        },
       
        
    },
};
</script>

<style scoped>
h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.container .w-576 {
    display: none;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

.form-control {
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border: 1px solid #cccccc;
    box-shadow: none;
    box-sizing: border-box;
    background-color: #fff !important;
}

.form-control:focus {
    border: 1px solid #cccccc;
    box-shadow: none;
    box-sizing: border-box;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    /*animation: show 0.6s;*/
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

@media (max-width: 576px) {
    .container.right-panel-active {
        position: relative;

    }

    .form-container.sign-up-container {
        width: 100%;
        display: block;
        position: absolute;
        left: -100%;
    }

    .container .w-576 {
        display: block;
    }
}

@media (max-width: 460px) {
    .container .w-576 {
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .container .w-576 .link {
        width: 50%;
    }
}
</style>
