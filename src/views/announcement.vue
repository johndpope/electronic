<template>
    <div class="bet_record">
        <div class="header">
            <span class="logo"></span>
        </div>
        <div class="bet_body">
            <div class="bet_from">
                <div class="Soccer">最新消息</div>
                <!--<div class="form-group">-->
                    <!--<label class="sr-only">&nbsp;</label>-->
                    <!--<button type="submit" class="btn btn-default">查询</button>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<label class="sr-only">&nbsp;</label>-->
                    <!--<button type="submit" class="btn btn-default">今天</button>-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<label class="sr-only">&nbsp;</label>-->
                    <!--<button type="submit" class="btn btn-default">昨天</button>-->
                <!--</div>-->
            </div>
            <table class="info-div-table">
                <thead>
                <tr>
                    <th class="h date">编号</th>
                    <th class="h period">日期</th>
                    <th class="h msg">信息</th>
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

export default {
 name: "announcement",
 mixins: [Mixin],
 components : {
        layer
    },
 data () {
    return {
    }
 },
 created () {
 },
 mounted () {
     this.handleGetBulletin ()
 },
 methods: {}
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

</style>