<template>
    <div>
        <div class="codes" @click="handleHide"></div>
        <img class="img_qr" :src="'../webApi/v2/gameWeb/getImageCode'" alt="">
    </div>
</template>

<script>
  export default {
    name: "qrcode",
    data () {
        return {
            // code_url: 'http://175.176.192.106:18084',
            code_url: 'https://cnesports.asia'
        }
    },
    methods: {
       handleHide () {
               this.$emit('Hide',false)
       }
    }
 }
</script>

<style scoped lang="scss">
 .codes {
     position: absolute;
     top: 0;
     right: 0;
     left: 0;
     bottom: 0;
     background: #292a2b;
     opacity: 0.4;
     z-index: 100;
 }
 .img_qr {
     position: absolute;
     top: 30%;
     left: 40%;
     z-index: 100;
     width: 300px;
     height: 300px;

 }
</style>