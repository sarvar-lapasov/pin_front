<template>
    <div class="d-flex justify-content-between py-3">
        <div class="d-flex flex-column">
            <table class="table">
            <thead>
            <tr>
                <th>АРТИКУЛ</th>
                <th>НАЗВАНИЕ</th>
                <th>СТАТУС</th>
                <th>АТРИБУТЫ</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="product of getProducts"
                :key="product.id" class="product"
                @click="showItem(product)"
                data-bs-toggle="modal" data-bs-target="#exampleModal2"
            >
                <td>{{ product.article }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.status }}</td>
                <td>
                    <ul class="nav" v-for="(item, index) of JSON.parse(product.data)" :key="index">
                        <li class="nav-item">
                            {{ item.attribute_name }}: {{ item.value }}
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
        <PaginationRow :All="getProductTotal" @pageClick="pageClick" />
        </div>
      
        <div class="px-3 py-3">
            <button @click="showModal" type="button" class="btn btn-primary px-5" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Добавить
            </button>
        </div>
    </div>


    <div class="modal fade"  id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-lg ">
            <div class="modal-content w-100 modal-bg-secondary text-white p-4">
                <div class="d-flex justify-content-between">
                    <h5 class="modal-title">Редактировать {{productInfo.name}}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="col-9 mt-5">
                    <form @submit.prevent="editProductById">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label text-light">Артикул</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" required
                                   v-model="productInfo.article">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label text-light">Название</label>
                            <input type="text" class="form-control" id="exampleFormControlInput2" required
                                   v-model="productInfo.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label text-light">Статус</label>
                            <select class="form-select" aria-label="Default select example"
                                    id="exampleFormControlInput3"
                                    v-model="productInfo.status">
                                <option selected >Доступен</option>
                                <option value="available">Доступен</option>
                                <option value="unavailable">Не доступен</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <div v-for="(value, key) in attributes" :key="key" class="d-flex justify-content-between">
                                <div class="mb-3 w-100">
                                    <label for="exampleFormControlInput2" class="form-label text-light">Название</label>
                                    <input type="text" class="form-control" :id="'exampleFormControlInput' + key" required
                                           v-model="attributes[key].attribute_name">
                                </div>
                                <div class="mb-3 w-100 mx-2 ms-4">
                                    <label for="exampleFormControlInput2" class="form-label text-light">Значение</label>
                                    <input type="text" class="form-control" :id="'exampleFormControlInput2' + key" required
                                           v-model="attributes[key].value">
                                </div>
                                <button type="button" class="button border-0 bg-transparent text-primary"
                                        @click="deleteAttribute(key)">
                                    <img src="../../public/assets/delete.png" class="mt-2" width="10px" alt=""
                                         srcset="">
                                </button>
                            </div>
                            <div>
                                <button type="button" class="button border-0 bg-transparent"
                                        @click="addAttribute">
                                        <span class="text-primary underLine_dotted">+ Добавить атрибут</span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary px-5">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


<!-- Modal -->
<div class="modal fade"  id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" >
            <div class="modal-content modal-bg-secondary text-white p-4" style="padding-bottom: 200px !important;">
                <div class="d-flex justify-content-between">
                    <h5 class="modal-title">{{productInfo.name}}</h5>
                    <div>
                        <button 
                            type="button" class="button border-0 bg-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal3"
                            @click="editProductToModal()"
                            >  
                            <img src="../../public/assets/edit.png" width="8px" height="8px" alt="">
                        </button>
                        <button 
                            type="button" class="button border-0 bg-dark ms-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"
                            @click="deleteProductById(productInfo.id)"
                            >  
                            <img src="../../public/assets/delete.png" width="10px" height="11px" alt="">
                        </button>
                        <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
                <div class="col-6 mt-5">
                    <div class="d-flex">
                        <span class="col-5 text-white-50">Артикул: </span>
                        <p>{{productInfo.article}}</p>
                    </div>
                    <div class="d-flex">
                        <span class="col-5 text-white-50">Название: </span>
                        <p>{{productInfo.name}}</p>
                    </div>
                    <div class="d-flex">
                        <span class="col-5 text-white-50">Статус: </span>
                        <p>{{productInfo.status =='available' ? 'Доступен':'Не доступен' }}</p>
                    </div>
                    <div class="d-flex">
                        <span class="col-5 text-white-50">Атрибуты: </span>
                        <ul class="nav d-flex flex-column">
                            <li class="nav-item" v-if="productInfo.data">
                                <template v-if="isJSONString(productInfo.data)">
                                    <li v-for="(item, index) of JSON.parse(productInfo.data)" :key="index">
                                        {{ item.attribute_name }}: {{ item.value }}
                                    </li>
                                </template>
                                <template v-else>
                                     Invalid JSON data
                                </template>
                            </li>
                            <li class="nav-item" v-else>
                                No data available
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg ">
            <div class="modal-content w-100 modal-bg-secondary text-white p-4">
                <div class="d-flex justify-content-between">
                    <h5 class="modal-title">Добавить продукт</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="col-9 mt-5">
                    <form @submit.prevent="addProduct">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label text-light">Артикул</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" required
                                   v-model="product.article">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label text-light">Название</label>
                            <input type="text" class="form-control" id="exampleFormControlInput2" required
                                   v-model="product.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label text-light">Статус</label>
                            <select class="form-select" aria-label="Default select example"
                                    id="exampleFormControlInput3"
                                    v-model="product.status">
                                <option selected disabled value="">Доступен</option>
                                <option value="available">Доступен</option>
                                <option value="unavailable">Не доступен</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <div v-for="(value, key) in attributes" :key="key" class="d-flex justify-content-between">
                                <div class="mb-3 w-100">
                                    <label for="exampleFormControlInput2" class="form-label text-light">Название</label>
                                    <input type="text" class="form-control" :id="'exampleFormControlInput' + key" required
                                           v-model="attributes[key].attribute_name">
                                </div>
                                <div class="mb-3 w-100 mx-2 ms-4">
                                    <label for="exampleFormControlInput2" class="form-label text-light">Значение</label>
                                    <input type="text" class="form-control" :id="'exampleFormControlInput2' + key" required
                                           v-model="attributes[key].value">
                                </div>
                                <button type="button" class="button border-0 bg-transparent text-primary"
                                        @click="deleteAttribute(key)">
                                    <img src="../../public/assets/delete.png" class="mt-2" width="10px" alt=""
                                         srcset="">
                                </button>
                            </div>
                            <div>
                                <button type="button" class="button border-0 bg-transparent"
                                        @click="addAttribute">
                                        <span class="text-primary underLine_dotted">+ Добавить атрибут</span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary px-5">Добавить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PaginationRow from "./core/PaginationRow.vue";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
    name: "ProductList",
    components: {
        PaginationRow,
    },
    data() {
        return {
            dayjs,
            productInfo:'',
            product: {
                article:'',
                name:'',
                status:'',
                data:[],
            },
            attributes: [],
        };
    },
    computed: {
        ...mapGetters(["getProducts",'getAccessToken','getProductTotal']),
    },
    methods: {
        ...mapActions(['fetchProducts','pushProduct',"aboutMe",'fetchProduct','editProduct','deleteProduct']),
        pageClick(pageNum) {
            this.fetchProducts({
                page: pageNum,
            })
                .then(() => {
                })
               
        },
        showItem(item) {
            this.productInfo = (item)
            this.fetchProduct(item.id)
            console.log(item);
        },
        addProduct(){
            this.product.data = (this.attributes)
            this.pushProduct(this.product)
            .then((response) => {
                console.log(response);
                this.fetchProducts({});
                this.resetForm();
            });
        },
        editProductById(){
            this.productInfo.data = (this.attributes)
            this.editProduct({id:this.productInfo.id, data:this.productInfo})
            .then((response) => {
                console.log(response);
                this.fetchProducts({});
            });
        },
        editProductToModal(){
            if (this.productInfo) {
                this.attributes = JSON.parse(this.productInfo.data);
            } else {
                this.resetForm();
            }
        },
        deleteProductById(id){
                this.deleteProduct(id)
                .then(()=>{
                    this.fetchProducts({})
                })
        },
        showModal(){
            this.resetForm();
        },
        closeModal() {
             this.resetForm();
             this.fetchProducts({});
         },
        resetForm() {
            this.attributes=[];
            this.product = {
            article: '',
            name: '',
            status: '',
            data: [],
            }
        },
       
        addAttribute() {
            this.attributes.push({ attribute_name: '', value: '' });
        },
        deleteAttribute(index) {
             this.attributes.splice(index, 1);
        },
        isJSONString(str) {
            try {
                JSON.parse(str);
                return true;
             } catch (e) {
            return false;
            }
        }
    },
    mounted() {
        this.fetchProducts({});
    },
};
</script>
<style scoped>
.table {
    width: 800px;
}

thead th {
    color: #6E6E6F;
    background-color: transparent;
    font-weight: normal;
}
.modal-bg-secondary{
    background-color: #374050;
}
.product {
    color: #6E6E6F;
    font-weight: normal;
    background-color: white;
    border-top: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
    cursor: pointer;
}
.underLine_dotted{
    border-bottom: 1px dashed;
    border-color: #0d6efd ;
  padding-bottom: 2px;
}

</style>