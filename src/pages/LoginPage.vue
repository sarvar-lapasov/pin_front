<template>
    <div id="container" class="container left-panel-active mx-5">
        <div class="form-container sign-in-container ">
            <form @submit.prevent="auth">
                <h1 class="fs-2">Sign in</h1>
                <div class="social-container">
                    <a class="social" href="#"
                    ><i class="fab fa-facebook-f"></i
                    ></a>
                    <a class="social" href="#"
                    ><i class="fab fa-google-plus-g"></i
                    ></a>
                    <a class="social" href="#"
                    ><i class="fab fa-linkedin-in"></i
                    ></a>
                </div>
                <span>or use your account</span>
                <input
                    v-model="form.email"
                    :class="{'error': isLoginerror}"
                    class="form-control"
                    placeholder="Email"
                    type="email"
                    autocomplete
                    @input="errorHide"/>

                <input
                    v-model="form.password"
                    :class="{'error': isLoginerror}"
                    class="form-control"
                    placeholder="Password"
                    type="password"
                    autocomplete
                    @input="errorHide"
                />
                <input
                    v-model="form.password_confirmation"
                    :class="{'error': isLoginerror}"
                    class="form-control"
                    placeholder="Password"
                    type="password"
                    autocomplete
                    @input="errorHide"
                />
                <span v-if="isLoginerror" class="py-2 text-left text-danger w-100">Email or password is incorrect</span>
                <button class="mt-3 mb-3" type="submit">Sign In</button>
                <router-link class="mt-0" to="#">
                    <span>
                        Forgot your password?
                    </span>
                </router-link>
                <span class="w-576 ">Don't you have an account?
                    <router-link class="mx-2 mt-0 text-warning link" to="/register">Sign Up</router-link>
                </span>
            </form>
        </div>
        <sign-overlay-row/>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import SignOverlayRow from "@/components/core/signOverlayRow.vue";


export default {
    name: "LoginPage",
    components: { SignOverlayRow},
    data() {
        return {
            isLoginerror: false,
            form: {
                email: "",
                password: "",
                password_confirmation:"",
            },
        };
    },
    methods: {
        ...mapActions(["fetchUserToken", "aboutMe"]),
        errorHide() {
            this.isLoginerror = false;
        }
        ,
        auth() {
            this
                .fetchUserToken(this.form)
                .then((response) => {
                    console.log(response);
                
                   
                }).then(() => {
                    this.aboutMe()
                    this.$router.push("/");
                })
                .catch((error) => {
                    error(error);
                    this.isLoginerror = true;
                })
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

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
    border-radius: 20px;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
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

.error {
    border: 1px solid red;
    color: red;
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
    animation: show 0.6s;
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
    .container.left-panel-active {
        position: relative;

    }

    .form-container.sign-in-container {
        width: 100%;
        display: block;
        position: absolute;
        left: 100%;
        transform: translateX(-100%)
    }

    .container .w-576 {
        display: block;
        margin-bottom: 12px;

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
        margin: 0 auto;
    }
}
</style>
