<template>
    
    <div class=" py-5">
       <div v-if="getUser ? 
       getUser.roles.find((e) => e.name === 'admin') : false" 
       class="px-5 mb-5 flex">
        <select v-model="filters.status" @change="applyFilter" class="rounded-md border-0  py-2 px-3  text-gray-500">
            <option value="">Все</option>
            <option value="available">Доступен</option>
            <option value="unavailable">Недоступен</option>
        </select>
        <label for="isActive" class="ml-4 flex items-center">
            <input v-model="filters.onlyTrashed" type="checkbox" @change="applyFilter" id="isActive"/>
            <span class="ml-2">Корзина</span>
        </label>
       </div>
        <div class="flex flex-col-reverse items-end md:flex-row md:items-start justify-between">
            <div class="flex flex-col w-full md:w-3/4 lg:w-2/3">
                <div v-if="getProducts.length < 1" class="w-full border-2 ml-4 text-center border-gray-500 rounded-lg p-10">Здесь пока нет товара...</div>
            <table v-else >
            <thead>
            <tr class="grid grid-cols-4">
                <th>АРТИКУЛ</th>
                <th>НАЗВАНИЕ</th>
                <th>СТАТУС</th>
                <th>АТРИБУТЫ</th>
            </tr>
            </thead>
            <tbody>
            <tr
            class="grid grid-cols-4 product"
                v-for="product of getProducts"
                :key="product.id"
                @click="showItem(product, 1)"
            >
                <td>{{ product.article }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.status }}</td>
                <td>
                    <ul class="">
                        <li class="block " v-for="(item, index) of JSON.parse(product.data)" :key="index">
                            {{ item.attribute_name }}: {{ item.value }}
                        </li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
        <PaginationRow :All="getProductTotal" @pageClick="pageClick" />
        </div>
      
        <div class="px-3 py-5">
            <button @click="onToggle(0)" type="button" class="p-2 px-10 rounded-md text-white bg-[#0FC5FF]">
                Добавить
            </button>
        </div>
        </div>
    </div>

    <transition name="fade">
      <div v-if="isModalVisible(0)" > 
        <div
          @click="onToggle(0)"
          class="absolute bg-black opacity-50 inset-0 z-10"
        ></div>
        <div
          class="w-full text-white max-w-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl  z-20  bg-[#374050] " 
        >    
                <div class="flex justify-between mb-6">
                    <h5 class="text-2xl">Добавить продукт</h5>
                    <button type="button" class="focus:text-white" @click="onToggle(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-[#c2c2c2]">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="mt-6 grid grid-cols-4">
                    <form @submit.prevent="addProduct" class="col-span-3">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="block text-sm mb-2">Артикул</label>
                            <input type="text" class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" id="exampleFormControlInput1" required
                                   v-model="product.article">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="block text-sm mb-2">Название</label>
                            <input type="text" class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" id="exampleFormControlInput2" required
                                   v-model="product.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="block text-sm mb-2">Статус</label>
                            <select class="w-full rounded-md border-0  py-2 px-2.5  text-gray-500" 
                                    id="exampleFormControlInput3"
                                    v-model="product.status">
                                <option disabled value="" hidden>Доступен</option>
                                <option value="available">Доступен</option>
                                <option value="unavailable">Не доступен</option>

                            </select>
                        </div>
                        <div class="mb-3 ">
                            <h4 class="py-3 pb-6 text-xl">Атрибуты</h4>
                           <div class="max-h-40 overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-border-1 scrollbar-track-gray-100">
                            <div v-for="(value, key) in attributes" :key="key" class="flex mb-3 justify-between  items-end">
                                <div class="flex flex-col w-full">
                                    <label for="exampleFormControlInput2" class="block text-sm mb-2">Название</label>
                                    <input type="text" class=" rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" :id="'exampleFormControlInput' + key" required
                                           v-model="attributes[key].attribute_name">
                                </div>
                                <div class="flex flex-col mx-2 w-full">
                                    <label for="exampleFormControlInput2" class="block text-sm mb-2">Значение</label>
                                    <input type="text" class=" rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" :id="'exampleFormControlInput2' + key" required
                                           v-model="attributes[key].value">
                                </div>
                                <button type="button" class="button mx-2 grid content-center h-10 border-0 bg-transparent"
                                    @click="deleteAttribute(key)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#c4c4c4]">
                                         <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>                               
                                </button>
                            </div>
                           </div>
                            <div>
                                <button type="button" class="mt-3 border-0 bg-transparent"
                                        @click="addAttribute">
                                        <span class="text-[#0FC5FF] underLine_dotted">+ Добавить атрибут</span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="mt-7 p-2 px-10 rounded-md text-white bg-[#0FC5FF]">Добавить</button>
                    </form>
                </div>
            </div>
      </div>
    </transition>
      <transition name="fade">
      <div v-if="isModalVisible(1)"> 
        <div
          @click="onToggle(1)"
          class="absolute bg-black opacity-50 inset-0 z-10"
        ></div>
        <div
          class="w-full h-2/3 text-white max-w-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl  z-20  bg-[#374050]" 
        >    
                <div class="flex justify-between mb-6">
                    <h5 class="text-2xl">{{productInfo.name}}</h5>
                    <div class="grid grid-cols-3 gap-1">

                        <button 
                            v-if="filters.onlyTrashed" 
                            type="button"  
                            class="bg-slate-950 p-1 focus:text-white w-8 h-8 flex justify-center items-center"
                            @click="restoreProductById(productInfo.id, 1)"
                            data-twe-toggle="tooltip"
                            data-twe-placement="top"
                            title="Восстановить продукт">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#c4c4c4]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                        <button 
                        v-else 
                        type="button" 
                        class="bg-slate-950 p-1 focus:text-white w-8 h-8 flex justify-center items-center" 
                        @click="editProductToModal(2)"
                        data-twe-toggle="tooltip"
                            data-twe-placement="top"
                            title="Редактировать продукт">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#c4c4c4]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button 
                        type="button" 
                        class="bg-slate-950 p-1 focus:text-white w-8 h-8 flex justify-center items-center" 
                        @click="deleteProductById(productInfo.id, 1)"
                        data-twe-toggle="tooltip"
                            data-twe-placement="top"
                            title="Удалить продукт">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#c4c4c4]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>     
                        </button>
                        <button type="button" class="focus:text-white w-8 h-8" @click="onToggle(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full text-[#c2c2c2]">
                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="col-6 mt-5">
                    <div class="grid grid-cols-5 mt-5">
                        <span class=" text-gray-400 text-lg">Артикул: </span>
                        <p class="text-md">{{productInfo.article}}</p>
                    </div>
                    <div class="grid grid-cols-5 mt-5">
                        <span class=" text-gray-400 text-lg">Название: </span>
                        <p class="text-md">{{productInfo.name}}</p>
                    </div>
                    <div class="grid grid-cols-5 mt-5">
                        <span class=" text-gray-400 text-lg">Статус: </span>
                        <p class="text-md">{{productInfo.status =='available' ? 'Доступен':'Не доступен' }}</p>
                    </div>
                    <div class="grid grid-cols-5 mt-5">
                        <span class=" text-gray-400 text-lg">Атрибуты: </span>
                        <ul class="nav flex flex-col">
                            <li class="" v-if="productInfo.data">
                                <template v-if="isJSONString(productInfo.data)">
                                    <li v-for="(item, index) of JSON.parse(productInfo.data)" :key="index">
                                        {{ item.attribute_name }}: {{ item.value }}
                                    </li>
                                </template>
                                <template v-else>
                                     Invalid JSON data
                                </template>
                            </li>
                            <li class="" v-else>
                                No data available
                            </li>
                        </ul>
                    </div>

                </div>
                </div>
            </div>
      </div>
    </transition>
      <transition name="fade">
      <div v-if="isModalVisible(2)"> 
        <div
          @click="onToggle(2)"
          class="absolute bg-black opacity-50 inset-0 z-10"
        ></div>
        <div
          class="w-full text-white max-w-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl  z-20  bg-[#374050]" 
        >    
                <div class="flex justify-between mb-6">
                    <h5 class="text-2xl">Редактировать {{productInfo.name}}</h5>
                        <button type="button" class="focus:text-white w-8 h-8" @click="onToggle(2)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full text-[#c2c2c2]">
                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                </div>
                <div class="mt-6 grid grid-cols-4">
                    <form @submit.prevent="editProductById(2)" class="col-span-3">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="block text-sm mb-2">Артикул</label>
                            <input type="text" class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" id="exampleFormControlInput1" required
                                   v-model="productInfo.article">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="block text-sm mb-2">Название</label>
                            <input type="text" class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" id="exampleFormControlInput2" required
                                   v-model="productInfo.name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="block text-sm mb-2">Статус</label>
                            <select class="w-full rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:none" aria-label="Default select example"
                                    id="exampleFormControlInput3"
                                    v-model="productInfo.status">
                                <option value="available">Доступен</option>
                                <option value="unavailable">Не доступен</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <h4 class="py-3 pb-6 text-xl">Атрибуты</h4>
                            <div class="max-h-40 overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-border-1 scrollbar-track-gray-100">
                            <div v-for="(value, key) in attributes" :key="key" class="flex mb-3 justify-between items-end">
                                <div class="flex flex-col w-full">
                                    <label for="exampleFormControlInput2" class="block text-sm mb-2">Название</label>
                                    <input type="text" class="rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:nonel" :id="'exampleFormControlInput' + key" required
                                           v-model="attributes[key].attribute_name">
                                </div>
                                <div class="flex flex-col w-full mx-2 ms-4">
                                    <label for="exampleFormControlInput2" class="block text-sm mb-2">Значение</label>
                                    <input type="text" class="rounded-md py-2 px-2.5 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:nonel" :id="'exampleFormControlInput2' + key" required
                                           v-model="attributes[key].value">
                                </div>
                                <button type="button" class="button mx-2 grid content-center h-10 border-0 bg-transparent"
                                    @click="deleteAttribute(key)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#c4c4c4]">
                                         <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>                               
                                </button>
                            </div>
                            </div>
                            <div>
                                <button type="button" class="mt-3 border-0 bg-transparent"
                                        @click="addAttribute">
                                        <span class="text-[#0FC5FF] underLine_dotted">+ Добавить атрибут</span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="mt-7 p-2 px-10 rounded-md text-white bg-[#0FC5FF]">Сохранить</button>
                    </form>
                </div>
            </div>
      </div>
    </transition>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PaginationRow from "./core/PaginationRow.vue";

export default {
    name: "ProductList",
    components: {
        PaginationRow,
    },
    data() {
        return {
            modals: [false, false, false],
           filters:{
            status: '',
            onlyTrashed: 0,
           },
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
        isModalVisible() {
            return index => this.modals[index];
        },
        ...mapGetters(["getProducts",'getAccessToken','getProductTotal','getUser']),
    },
    methods: {
        ...mapActions([   
            'fetchProducts',
            'pushProduct',
            "aboutMe",
            'fetchProduct',
            'editProduct',
            'deleteProduct',
            'restoreProduct']),
        pageClick(pageNum) {
           const data ={...this.filters, page: pageNum} 
            this.fetchProducts(data)
                .then(() => {
                })
        },
        onToggle(index) {
            if(index == 0) {
                this.resetForm();
            }
            this.modals[index] = !this.modals[index];
        },
        showItem(item, index) {
            this.onToggle(index)
            this.productInfo = (item)
        },
        addProduct(){
            this.product.data = (this.attributes)
            this.pushProduct(this.product)
            .then((response) => {
                console.log(response);
                this.fetchProducts(this.filters);
                this.resetForm();
            });
        },
        editProductById(index){
            this.productInfo.data = (this.attributes)
            this.editProduct({id:this.productInfo.id, data:this.productInfo})
            .then((response) => {
                console.log(response);
                this.fetchProducts(this.filters);
                this.onToggle(index)
            });
        },
        editProductToModal(index){
            this.onToggle(index-1)
            this.onToggle(index)
            if (this.productInfo) {
                this.attributes = JSON.parse(this.productInfo.data);
            } else {
                this.resetForm();
            }
        },
        deleteProductById(id, index){
                this.deleteProduct(id)
                .then(()=>{
                    this.fetchProducts(this.filters)
                    this.onToggle(index)
                })
        },
        restoreProductById(id, index){
            console.log(id);
            this.restoreProduct(id)
            .then(()=>{
                this.fetchProducts(this.filters)
                    this.onToggle(index)
            })
        },
        applyFilter() {
            this.fetchProducts(this.filters);
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
    watch:{
        
    },
    mounted() {
        this.fetchProducts(this.filters);
    },
};
</script>
<style scoped>
body{
    position: relative;
}
.table_width {
    width: 800px;
}

thead th {
    color: #6E6E6F;
    background-color: transparent;
    font-weight: normal;
}
tbody tr td{
    padding:12px 0;
}
thead th:first-child,
tbody tr td:first-child{
    padding-left: 20px;
}

.product {
    color: #6E6E6F;
    font-weight: normal;
    background-color: white;
    border-bottom: 2px solid #cccccc;
    cursor: pointer;
}
.product:first-child{
    border-top: 2px solid #cccccc;
}
.underLine_dotted{
    border-bottom: 1px dashed;
    border-color:#0FC5FF ;
  padding-bottom: 2px;
}


.fade-enter,
.fade-leave-to {
    
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {

  transition: opacity .5s ease-out;
}
</style>