<template>
    <div class="model" v-if="modalShow.showModal">
        <div class="models" @click="handleSendParent()"></div>
        <div class="league-select">
            <div class="s-dialog-header">
                <i class="fa icon league-header"></i>
                <h4>选择联赛</h4>
                <a class="s-dialog-close btn-cancel" @click="handleSendParent()">
                    <i class="icon close"></i>
                </a>
            </div>
            <div class="button-panel">
                <label  class="all-leagues-container">
                    <input class="all-leagues" type="checkbox" value="1" :checked="checkEd" @change="handleSelectLeagues('qx')" data-all-sports="29">
                    <label class="icon-all-leagues" for="all-leagues">
                    </label>
                    全选
                </label>
            </div>
            <div class="s-dialog-body">
                <label class="league-opt" v-for="(item,key) in modalShow.leaguesList" :key="key" >
                    <input class="league" type="checkbox" :value="item.id" :checked="checkEd" :id="'check' + key" @change="handleSelectLeagues('dx', item.lid)">
                    <label :for="'check' + key">{{ item.category + '-' + item.league }}</label>
                </label>
            </div>
            <div class="s-dialog-body" v-if="modalShow.leaguesList.length === 0">
                 <div class="s-dialog-title">暂无数据</div>
            </div>
            <div class="s-dialog-footer">
                <button class="o-button" @click="handleSendParent()">取消</button>
                <button class="o-button" @click="handleSendParent('qd')">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
 // import { mapActions } from 'vuex'
 export default {
    name: "modal",
    props: {
        modalShow: Object
    },
    data () {
        return {
            checkEd: false,
            selectLeagues: []
        }
    },
    mounted () {
    },
    methods: {
        // ...mapActions([ 'postLeaguesS' ]),
        handleSelectLeagues (type,lid) {
            if (type === 'qx') {
                this.checkEd = !this.checkEd
                if (this.checkEd) {
                    this.selectLeagues = this.modalShow.leaguesList.map(arr => arr.lid)
                } else {
                    this.selectLeagues = []
                }
            } else {
                this.selectLeagues.push(lid)
            }
        },
        handleSendParent (type) {
            let data = {
                mShow: false,
                selectLeagues: this.selectLeagues
            }
            if (type) {
                data.selectLeagues = this.selectLeagues
            }
            this.$emit('listenFromChild',data)
            this.selectLeagues = []
        }
    }
 }
</script>

<style scoped lang="scss">
    .models{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        opacity: .6;
        background-color: #000;
        transition: opacity .6s ease-in-out;;
        z-index: 50;
    }
    .league-select{
        position: fixed;
        min-width: 600px;
        max-width: 40%;
        left: 30%;
        top: 28%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        background-color: #fff;
        z-index: 100;
        .s-dialog-header{
            clear: both;
            line-height: 32px;
            background-color: #0d1116;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#189970 ',endColorstr='#189970 ',GradientType=0);
            padding-left: 10px;
            h4 {
                font-weight: bold;
                color: #fff;
            }
            .s-dialog-close {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                i {
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                    background: url(../assets/betSlipClose.png) no-repeat center center;
                }
            }
        }
        .msg-header {
            background-color: #0299a0;
            h4{
                text-align: center;
                font-size: 16px;
                color: #fff;
            }
        }
        .button-panel {
            background-color: #e1e1e1;
            text-align: left;
            font-weight: 700;
            color: #0b1422;
            padding: 8px 8px 8px 10px;
            border: 1px solid #e1e9ff;
            label {
                position: relative;
                padding-left: 10px;
                cursor: pointer;
                input {
                    position: absolute;
                    top: 2px;
                    left: 0;
                    bottom: 0;
                    cursor: pointer;
                }
            }
        }
        .s-dialog-body {
            height: auto;
            max-height: 300px;
            max-width: 97.5%;
            padding: 5px 11px 11px 11px;
            overflow-y: auto;
            clear: both;
            label.league-opt {
                display: inline-block;
                width: 46%;
                position: relative;
                padding: 4px 0 4px 18px;
                color: #0b1422;
                input{
                    vertical-align: middle;
                }
            }
        }
        .s-dialog-footer {
            clear: both;
            padding: 6px 0;
            text-align: center;
            button {
                height: 25px;
                line-height: 25px;
                margin-right: 16px;
            }
        }
    }
    .s-dialog-title {
        text-align: center;
    }
    .o-button{
        box-shadow: 0 2px 7px 0 rgba(0,0,0,.21);
        outline: 0;
        cursor: pointer;
        position: relative;
        padding: 0 7px;
        background: linear-gradient(180deg,#01fce1 0,#01d6c8 31.87%,#0299a0 90.06%);
        border-radius: 100px;
        border: 0;
        font-family: geometria,Arial,sans-serif;
        color: #fff;
        z-index: 1;
        transition: background,opacity,color,box-shadow .3s ease-in-out;
        height: 100%;
        width: 80px;
    }
    .o-button:hover {
        box-shadow: 0 4px 15px rgba(41,243,219,.7);
    }
</style>