<template>
    <div v-if="diaoLogShow" class="mask">
        <div class="laymshade" @click="diaoLogShow = false"></div>
        <transition name="fade">
            <div class="layermmain">
                <p class="mask_title">message</p>
                <div class="mask_body">
                    {{ content }}
                </div>
                <div v-if="btnShow" class="s-dialog-footer">
                    <button class="o-button" @click="close('qx')">取消</button>
                    <button class="o-button" @click="close('qd')">确定</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
 export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                content: '',
                diaoLogShow: false,
                btnShow: true,
                // times: 2000
            }
        },
        created () {
        },
        methods: {
            open (text, sh, bsh,tm) {
               this.content = text
               this.diaoLogShow = sh
               this.btnShow = bsh
               // this.times = tm
               if (tm) {
                   setTimeout(()=> {
                       this.diaoLogShow = false
                   },tm)
               }
            },
            close (type) {
                this.diaoLogShow = false
                if (type === 'qx') {
                    this.$emit('fromDiaoLog', false)
                } else {
                    this.$emit('fromDiaoLog', true)
                }
            }
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
    .laymshade {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index:101;
        background:rgba(0,0,0,0.3)
     }
    .layermmain{
         position: fixed;
         top: 30%;
         left: 40%;
         width: 20%;
         border-radius: 5px;
         text-align: center;
         background-color: #fff;
         z-index: 101;
     }
    .mask_title{
         background-color: #151f2b;
         padding: 10px 0;
         color: #fff;
     }
    .mask_body {
         padding: 5px;
         min-height: 60px;
         line-height: 60px;
         overflow: auto;
     }
    .s-dialog-footer {
         padding: 5px;
     }
    .o-button{
        box-shadow: 0 2px 7px 0 rgba(0,0,0,.21);
        outline: 0;
        cursor: pointer;
        position: relative;
        padding: 2px 7px;
        background: linear-gradient(180deg,#01fce1 0,#01d6c8 31.87%,#0299a0 90.06%);
        border-radius: 100px;
        border: 0;
        font-family: geometria,Arial,sans-serif;
        color: #fff;
        z-index: 1;
        transition: background,opacity,color,box-shadow .3s ease-in-out;
        height: 100%;
        width: 60px;
        margin-right: 5px;
    }
    .o-button:hover {
        box-shadow: 0 4px 15px rgba(41,243,219,.7);
    }
</style>