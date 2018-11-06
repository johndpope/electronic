<template>
    <div class="bet_record">
        <div class="bet_body">
            <div class="bet_from">
                <div class="form-group">
                    <label class="sr-only">状态</label>
                    <select class="form-control select_w" name="league" v-model="selectVal">
                        <option>未结算</option>
                        <option>已结算</option>
                    </select>
                </div>
                <div class="bet_st" v-if="selectVal === '已结算'">
                    <div class="form-group">
                        <label class="sr-only">选择时间</label>
                        <vue-datepicker-local :popupClass="'set_w'" v-model="range"></vue-datepicker-local>
                    </div>
                    <div class="form-group">
                        <label class="sr-only">&nbsp;</label>
                        <button type="button" class="btn btn-default" @click="handleGetUserListGameWager">查询</button>
                    </div>
                </div>
            </div>
            <table class="info-div-table">
                <thead>
                 <tr>
                  <th class="h num">#</th>
                  <th class="h detail">下注时间</th>
                  <th class="h seletion">详细信息</th>
                  <th class="h odds">赔率</th>
                  <th class="h stake">投注金额 (CNY)&nbsp;</th>
                  <th>输赢</th>
                  <th class="h status">状态</th>
                 </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,key) in gameWagerList.list" :key="key" :class="item.liveType === '1' ? 'gunq' : ''">
                        <td class="count">{{ key+1 }}</td>
                        <td class="bet-detail">
                            <i>{{ item.wagerId }}</i>
                            <h4 class="sport">
                                电子竞技
                            </h4>
                            <span>{{ item.betTime }}</span>
                        </td>
                        <td class="selection">
                            <p>
                                <span class="selection sel">{{ item.betDetail }}</span>
                            </p>
                            <p>
                                <span class="team-name">{{ item.teamLeft }}</span>
                                <span class="vs">-vs-</span>
                                <span class="team-name">{{ item.teamRight }}</span>
                            </p>
                            <p>
                                <span class="betType">
                                    {{ item.betType }}
                                </span>
                            </p>
                            <p class="league">
                                {{ item.category + '-' + item .league}}
                            </p>
                        </td>
                        <td class="odds ">
                            {{ item.betOdds }} <br>
                            <span>
                                <b>香港赔率</b>
                            </span>
                        </td>
                        <td class="stake">
                            <span class="stake">{{ item.betAmount }}</span>
                        </td>
                        <td class="stake">
                            <span :class="item.winloss > 0? 'stake win' : 'stake win loss'" v-if="gameWagerObj.betStatus === 2">{{ item.winloss }}</span>
                            <span class="stake" v-if="gameWagerObj.betStatus === 1">-</span>
                        </td>
                        <td class="status OPEN">
                            <p>
                                <span class="stake">{{ gameWagerObj.betStatus ===1 ? '进行中' : '已结算'}}</span>
                            </p>
                            <p>
                                <span :class="item.winloss > 0? 'stake win' : 'stake win loss'" v-if="gameWagerObj.betStatus === 2" >
                                    {{ item.winloss > 0 ? '赢' : '输' }}
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr v-if="gameWagerObj.betStatus === 2 && gameWagerList.pages !== 0">
                        <td colspan="4"/>
                        <td>
                            小计
                        </td>
                        <td>{{ total }}</td>
                        <td/>
                    </tr>
                    <tr v-if="gameWagerObj.betStatus === 2 && gameWagerList.pages !== 0">
                        <td colspan="4"/>
                        <td>
                            总计
                        </td>
                        <td>{{ winLoss }}</td>
                        <td/>
                    </tr>
                    <tr v-if="!gameWagerList.pages || gameWagerList.pages < 0">
                        <td colspan="7">
                            暂无数据
                        </td>
                    </tr>
                    <tr v-if="gameWagerList.pages > 0">
                        <td colspan="7">
                            <pagination :pageInfo="pageInfo" :soPage="soPage" @change="handlePageChange"></pagination>
                        </td>
                    </tr>
                    <tr class="tz">
                        <td colspan="7">
                            <h6 class="form-inline">
                                <span class="note">请注意：</span>
                                根据时区GMT+8决定日期 。
                            </h6>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <layer ref="layer"></layer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import layer from '@/components/diaoLog'
import pagination from '@/components/vue-pagination'
import VueDatepickerLocal from 'vue-datepicker-local'
import Mixin from '@/utils/Mixin'

export default {
    name: "betRecord",
    components: {
        layer,
        pagination,
        VueDatepickerLocal
    },
    mixins: [Mixin],
    data () {
        return {
            gameWagerObj: {
                pageNum: '1',
                pageSize: '10',
                betStatus: 1,
                TOKEN: sessionStorage.getItem('Tk')
            },
            gameWagerList: [],
            selectVal: '未结算',
            total: 0,
            pageInfo: {
                current: 1,
                pagegroup: 5,
                skin: '#0b1422',
            },
            soPage: '',
            winLoss: '',
            range: [new Date(),new Date()]
        }
    },
    created () {
        this.handleGetUserListGameWager()
    },
    mounted () {
    },
    methods: {
        ...mapActions([ 'postUserListGameWagerS' ]),
        handleGetUserListGameWager () {
            this.total = 0
            if (this.gameWagerObj.betStatus === 2) {
                this.range.forEach((arr,index) => {
                    this.range[index] = this.range[index].getTime()
                })
                if (this.range[1] - this.range[0] > 2592000000) {
                    this.$refs.layer.open('日期范围不能超过30天', true, false, 1000)
                    this.range = [new Date(),new Date()]
                    return false
                } else {
                    this.gameWagerObj.startTime = this.formattingTime(this.range[0],'dd')
                    this.gameWagerObj.endTime = this.formattingTime(this.range[1],'dd')
                }
            }
            this.postUserListGameWagerS(this.gameWagerObj).then(res => {
                if (res && !res.msg) {
                    this.gameWagerList = res.pageInfo
                    this.winLoss = res.winLoss
                    this.soPage = res.pageInfo.pages
                    if (this.gameWagerObj.betStatus === 2)
                    this.gameWagerList.list.forEach(arr => {
                        this.total += arr.winloss
                    })
                } else {
                    this.$refs.layer.open(res.msg, true, false, 1000)
                }
            }).catch(err => {
                this.$refs.layer.open(err.msg, true, false, 1000)
            })
        },
        handlePageChange (data) {
            this.gameWagerObj.pageNum = data
            this.handleGetUserListGameWager()
        }
    },
    watch: {
        selectVal (nev) {
            if (nev === '已结算') {
                this.gameWagerObj.betStatus = 2
            } else {
                this.gameWagerObj.betStatus = 1
            }
            this.handleGetUserListGameWager()
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
     .selection p {
         padding: 3px 0;
     }
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
     .bet_from {
         padding: 10px;
         height: 67px;
         background: linear-gradient(to bottom,#fff 0,#f6f6f6 47%,#ededed 100%);
         width: 100%;
         box-shadow: 0 0 10px #000;
         z-index: 2;
         white-space: nowrap;
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
                 width: 83px!important;
                 border: 0;
                 color: #fff!important;
                 text-align: center!important;
                 background-image: linear-gradient(to bottom,#9c9c9c 100%,#9c9c9c 100%);
                 border-radius: 3px!important;
                 background-color: #9c9c9c!important;
                 box-shadow: 0 2px #767676;
             }
             .select_w {
                 width: 180px;
             }
             /deep/ .datepicker-range .set_w {
                 width: 426px;
             }
             /deep/ .datepicker>input {
                 height: 28px;
             }
         }
         .bet_st {
             display: inline-block
         }
     }
     .info-div-table {
         width: 100%;
         border-left: 8px solid #fff;
         border-right: 8px solid #fff;
         border-bottom: 8px solid #fff;
         th {
             font-weight: bold;
             color: #fff;
             height: 29px;
             background: linear-gradient(to bottom,#132848 1%,#132848 100%);
             border-bottom: 1px solid #fff;
             text-align: center;
         }
         td {
             padding: 4px;
             text-align: center;
             border-right: 1px solid #f9f9f9;
         }
         tr {
             border-top: 1px solid #dcedff;
             border-bottom: 1px solid #c9d1de;
             background-color: #ededed;
             .bet-detail,.odds, .stake,.winloss,tr .status {
                 width: 10%;
                 text-align: center;
             }
             .bet-detail i {
                 color: #000313;
                 font-weight: bold;
             }
            td.status.OPEN {
                 color: #c30;
                 font-weight: 700;
             }
            .odds span {
                 font-size: 10px;
                 color: #c30;
             }
         }
         tr.gunq{
             background-color: #f7d2b9;
         }
         tr.tz td {
             font-size: 14px;
             border-top: 8px solid #fff;
             h6 {
                 text-align: left;
                 padding: 2px;
                 font-size: 14px;
             }
         }
         .sel{
             font-weight: bold;
         }
         .betType {
             color: #e43040;
         }
     }
     .win {
         color: green;
     }
     .win.loss {
         color: red;
     }
     .pages-wrap {
         float: right;
     }
 }
</style>