<template>
    <div class="bet_record">
        <div class="header">
            <span class="logo"></span>
        </div>
        <div class="bet_body">
            <div class="Soccer">{{$t('lang.announcement.from_zx_info')}}</div>
            <div class="bet_from">
                <div class="form-group">
                    <label class="sr-only">{{$t('lang.announcement.from_start')}}</label>
                    <vue-datepicker-local v-model="startTime" format="YYYY-MM-DD"></vue-datepicker-local>
                </div>
                <div class="form-group">
                    <label class="sr-only">{{$t('lang.announcement.from_end')}}</label>
                    <vue-datepicker-local v-model="endTime" format="YYYY-MM-DD"></vue-datepicker-local>
                </div>
            </div>
            <table class="info-div-table">
                <thead>
                <tr>
                    <th class="h date">{{$t('lang.announcement.from_bh')}}</th>
                    <th class="h period">{{$t('lang.announcement.from_date')}}</th>
                    <th class="h msg">{{$t('lang.announcement.from_info')}}</th>
                </tr>
                </thead>
                <tbody>
                  <tr class="even" v-for="(item,key) in msgList" :key="key">
                    <td class="date">{{ key + 1 }}</td>
                    <td class="period"> {{ item.createtime }} </td>
                    <td class="period"> {{ item.content }} </td>
                </tr>
                </tbody>
            </table>
        </div>
        <layer ref="layer"></layer>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import Mixin from '@/utils/Mixin'
import layer from '@/components/diaoLog'
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
 name: "announcement",
 mixins: [Mixin],
 components : {
        layer,
        VueDatepickerLocal
    },
 data () {
    return {
    }
 },
 created () {
 },
 mounted () {
     this.handleGetBulletin ()
     if (sessionStorage.getItem('18n')){
         this.$i18n.locale = sessionStorage.getItem('18n')
     }
 },
 methods: {},
 watch: {
     startTime(nev) {
         this.bulletinObj.startDate = this.formattingTime(nev,'dd')
         this.bulletinObj.endDate = this.formattingTime(this.endTime,'dd')
         this.handleGetBulletin()
     },
     endTime (nev) {
         this.bulletinObj.startDate = this.formattingTime(this.startTime(),'dd')
         this.bulletinObj.endDate = this.formattingTime(nev,'dd')
         this.handleGetBulletin()
     }
 }
}
</script>

<style scoped lang="scss">
    .bet_record {
        background: #0b1422;
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .bet_body {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        clear: both;
        top: 81px;
        padding: 10px;
        .info-div-table {
            width: 100%;
            margin-bottom: 10px;
            box-shadow: 0 0 5px;
            th {
                font-weight: bold;
                color: #fff;
                height: 29px;
                border-right: 1px solid;
                background: linear-gradient(to bottom,#132848 1%,#132848 100%);
                border-bottom: 1px solid #fff;
                text-align: center;
            }
            td {
                padding: 5px;
                background-color: #ebebeb;
                border-bottom: 1px solid #f9f9f9;
                border-right: 1px solid #f9f9f9;
            }
            .period,.date {
                width: 100px;
                text-align: center;
                vertical-align: middle;
            }
            .l td {
                background: #132848;
                color: white;
                font-weight: bold;
                font-size: 14px;
            }
        }
        .form-group {
            display: inline-block;
            vertical-align: middle;
            padding-right: 5px;

            label {
                overflow: auto;
                display: block;
                position: relative;
                width: auto;
                height: auto;
                margin: 0;
                text-align: center;
                color: #0b1d3b;
                font-weight: bold;
            }
            .form-control {
                display: inline-block;
                width: auto;
                vertical-align: middle;
                padding: 3px 8px;
                height: 25px;
                border-radius: 0;
                font-size: 14px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
            .btn {
                display: inline-block;
                margin-bottom: 0;
                font-weight: normal;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                background-image: none;
                border: 1px solid transparent;
                white-space: nowrap;
                padding: 6px 12px;
                font-size: 14px;
                line-height: 1.42857143;
                border-radius: 4px;
                user-select: none;
            }
            .btn-default {
                width: 105px;
                border: 0;
                color: #fff;
                text-align: center;
                background-image: linear-gradient(to bottom,#9c9c9c 100%,#9c9c9c 100%);
                border-radius: 3px!important;
                background-color: #9c9c9c!important;
                box-shadow: 0 2px #767676;
            }
            .select_w {
                width: 180px;
            }
        }
    }
    .Soccer {
        color: #0c5790;
        text-indent: 10px;
        font-size: 13px;
        font-weight: bold;
        padding: 5px 0;
        position: relative;
        background-color: #EFEFEF;
    }
    .msg {
        width: 75%;
    }
    .logo {
        display: inline-block;
        width: 200px;
        height: 80px;
        background-position: 0 50%;
        background-repeat: no-repeat;
        background-image: url('../assets/bluegreenF.png');
    }
    .bet_from{
        padding: 10px;
        height: 67px;
        background: linear-gradient(to bottom, #fff 0, #f6f6f6 47%, #ededed 100%);
        width: 100%;
        -webkit-box-shadow: 0 0 10px #000;
        box-shadow: 0 0 10px #000;
        z-index: 2;
        white-space: nowrap;
    }

</style>