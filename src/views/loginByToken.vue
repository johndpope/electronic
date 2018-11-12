<template>
    <div>
        <div v-if="loading" class="login_t"></div>
        <layer ref="layer"></layer>
    </div>

</template>

<script>
    import { mapActions } from 'vuex'
    import layer from '@/components/diaoLog'
    import Mixin from '@/utils/Mixin'

    export default {
        name: "loginByToken",
        components: {
           layer
        },
        mixins: [Mixin],
        data (){
            return {
                w_token: null,
                loading: true
            }
        },
        created (){
            let w_url = window.location.search;
            if (w_url) {
                let token = w_url.split('=')
                this.w_token = token[1]
                this.handleGetToken(this.w_token)
            }
        },
        methods: {
            ...mapActions([ 'postLoginUserByTokenS' ]),
            handleGetToken (tk) {
                if (tk) {
                    let data = '?token=' + this.w_token

                    this.postLoginUserByTokenS(data).then(res => {
                     if (res === 'success') {
                         this.$router.push('/')
                         window.sessionStorage.setItem('Tk', this.w_token)
                         this.handleRefUserInfo()
                     } else {
                         this.loading = false
                         this.$refs.layer.open('请登录',true,false)
                     }
                })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
   .login_t {
       position: absolute;
       top: 32%;
       left: 47%;
       width: 200px;
       height: 200px;
       background: url("../assets/loading.svg") no-repeat center center;
   }
</style>