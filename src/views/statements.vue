<template>
    <div class="bet_record">
        <div class="header">
            <span class="logo"></span>
        </div>
        <div class="bet_body" v-if="!backMents">
            <div class="bet_from" v-if="!mHistory">
                <div class="form-group">
                    <label class="sr-only">{{$t('lang.statements.from_time')}}</label>
                    <vue-datepicker-local v-model="mentsObj.date" format="YYYY-MM"></vue-datepicker-local>
                </div>
                <div class="form-group">
                    <label class="sr-only">&nbsp;</label>
                    <button type="button" class="btn btn-default" @click="handleListStatementsResult('dy')">{{$t('lang.statements.from_sub')}}</button>
                </div>
            </div>
            <div class="bet_from" v-if="mHistory">
                <div class="form-group">
                    <label class="sr-only">&nbsp;</label>
                    <button type="submit" class="btn btn-default" @click="mHistory =! mHistory">{{$t('lang.statements.from_cxlsjl')}}</button>
                </div>
            </div>
            <h5>
                <span class="note">{{$t('lang.statements.header_note')}}：</span>
                {{$t('lang.betRecord.table_gjsq')}} GMT+08:00 {{$t('lang.betRecord.table_jdrq')}}. {{$t('lang.statements.header_text')}} </h5>
            <table class="info-div-table">
                <thead>
                    <tr>
                        <th class="h date">{{$t('lang.statements.table_date')}}</th>
                        <th class="h remark">{{$t('lang.statements.table_bz')}}</th>
                        <th class="h amt">{{$t('lang.statements.table_jye')}}</th>
                        <th class="h amt">{{$t('lang.statements.table_zcsr')}}</th>
                        <th class="h amt">{{$t('lang.statements.table_ye')}}</th>
                        <th>{{$t('lang.statements.table_cz')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,key) in mentsList" :key="key" @click="handleGetBillDetails(item)" >
                        <td class="statement-date">
                            {{ item.date }}
                        </td>
                        <td>{{ item.type === '930' ? mentsType[item.type][item.betStatus] : mentsType[item.type] }}</td>
                        <td class="remark">
                           {{ item.remit }}
                        </td>
                        <td>{{ item.winloss }}</td>
                        <td >{{ item.account }}</td>
                        <td :class="item.type === '930' || item.type === '555' ? 'caoz more' : 'caoz'">
                        </td>
                    </tr>
                    <tr v-if="mentsList.length === 0">
                        <td colspan="6">
                            {{$t('lang.statements.table_zwjl')}}
                        </td>
                    </tr>
                    <tr v-if="soPage > 0">
                        <td colspan="6">
                            <pagination :pageInfo="pageInfo" :soPage="soPage" @change="handlePageChange"></pagination>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bet_body" v-if="backMents">
            <div class="bet_from">
                <div class="form-group">
                    <label class="sr-only">&nbsp;</label>
                    <button type="submit" class="btn btn-default" @click="backMents =! backMents">{{$t('lang.statements.from_back')}}</button>
                </div>
            </div>
            <h5>
                <span class="note">{{$t('lang.statements.header_note')}}：</span>
                {{$t('lang.betRecord.table_gjsq')}} GMT+08:00 {{$t('lang.betRecord.table_jdrq')}}. {{$t('lang.statements.header_text')}}</h5>
            <table class="info-div-table">
                <thead>
                <tr>
                    <th class="h date">{{$t('lang.statements.table_xh')}}</th>
                    <th class="h remark">{{$t('lang.statements.table_jysj')}}</th>
                    <th class="h amt">{{$t('lang.statements.table_xzxq')}}</th>
                    <th class="h amt">{{$t('lang.statements.table_pl')}}</th>
                    <th class="h amt">{{$t('lang.statements.table_xzje')}}</th>
                    <th>{{$t('lang.statements.table_sy')}}</th>
                    <th>{{$t('lang.statements.table_status')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,key) in detailsList" :key="key" :class="item.liveType === '1' ? 'even' : ''">
                    <td class="statement-date">
                        {{ key + 1}}
                    </td>
                    <td>
                        <p>{{ item.wagerId }}</p>
                        <p>{{ item.betTime }}</p>
                    </td>
                    <td class="remark">
                        <div class="item" v-for="(items, keys) in item.gameWagerInfos" :key="keys">
                            <span class="win loss win_pd">{{ item.liveName }}</span>{{ items.betDetail }}
                            <p>{{ items.teamLeft +'-vs-'+ items.teamRight }}</p>
                            <p class="red_t">{{ betType[items.betType] }}</p>
                            <p>{{ items.category +'-'+ items.league }}</p>
                        </div>

                    </td>
                    <td>
                        <p>{{ item.betOdds }}</p>
                        <p class="red_t">{{$t('lang.statements.table_HKD')}}</p></td>
                    <td >{{ item.betAmount }}</td>
                    <td :class="item.winloss > 0 ? 'win' : 'win loss'">
                        {{ item.winloss }}
                    </td>
                    <td :class="item.winloss > 0 ? 'win' : 'win loss'">
                        <span v-if="item.winloss">
                            {{ item.winloss > 0 ? '赢' : '输' }}
                        </span>
                        <span v-if="!item.winloss">
                            {{ item.betStatus === 2 ? '进行中' : '已结算' }}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                    <td>小计:</td>
                    <td>{{ betTotal }}</td>
                    <td>{{ winLTotal }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                    <td>总计:</td>
                    <td>{{ zjObj.totalAmount ?  zjObj.totalAmount.toFixed(2) : '0.00'}}</td>
                    <td>{{ zjObj.totalWinloss ? zjObj.totalWinloss.toFixed(2) : '0.00'}}</td>
                    <td></td>
                </tr>
                <tr v-if="detailsList.length === 0">
                    <td colspan="7">
                        {{$t('lang.statements.table_zwjl')}}
                    </td>
                </tr>
                <!--<tr v-if="xoPage > 0">-->
                    <!--<td colspan="7">-->
                        <!--<pagination :pageInfo="pageInfo" :soPage="xoPage" @change="handleDPageChange"></pagination>-->
                    <!--</td>-->
                <!--</tr>-->
                </tbody>
            </table>
        </div>
        <layer ref="layer"></layer>
    </div>
</template>

<script>
 import { mapActions } from 'vuex'
 import VueDatepickerLocal from 'vue-datepicker-local'
 import pagination from '@/components/vue-pagination'
 import layer from '@/components/diaoLog'
 import Mixin from '@/utils/Mixin'

 export default {
    name: "statements",
    mixins: [Mixin],
    components : {
        VueDatepickerLocal,
        pagination,
        layer
    },
    data () {
        return {
            mentsObj: {
                pageNum: 1,
                pageSize: 15,
                date: null
            },
            detailsObj: {
                pageNum: 1,
                pageSize: 100
            },
            mHistory: true,
            mentsList: [],
            detailsList: [],
            mentsType: {
                201: '存款作业',
                202: '提款作业',
                930: {
                    2: '未完成交易',
                    3: '投注账目'
                },
            },
            pageInfo: {
                current: 1,
                pagegroup: 5,
                skin: '#0b1422',
            },
            betType: [
                this.$t('lang.statements.hdp'), this.$t('lang.statements.ou'), this.$t('lang.statements.OT')
            ],
            soPage: '',
            // xoPage: '',
            backMents: false,
            winLTotal: 0,
            betTotal: 0,
            zjObj: {}
        }
    },
    mounted () {
        this.handleListStatementsResult()
        if (sessionStorage.getItem('18n')){
            this.$i18n.locale = sessionStorage.getItem('18n')
        }
    },
    methods: {
        ...mapActions([ 'postUserListGameWagerByDateS', 'postListStatementsResultS' ]),
        handleListStatementsResult (dat) {
            this.mentsList = []
            if (dat) {
                if (!this.mentsObj.date) {
                    this.$refs.layer.open('请选择时间',true,false,1000)
                    return false
                }
                this.mentsObj.date = this.formattingTime(this.mentsObj.date,'mm')
            }
             this.postListStatementsResultS(this.mentsObj).then(res => {
                 if (res.length !== 0 && !res.code) {
                     this.mentsList = res.list
                     this.soPage = res.pages
                 }
             }).catch(err => {
                 this.$refs.layer.open(err.msg,true,false,1000)
             })
        },
        handleGetBillDetails(item) {
            this.winLTotal = 0
            this.betTotal = 0
            this.detailsList = []
            if (item.type === '930' || item.type === '555') {
                this.backMents = true
                if (item.type === '555') {
                    this.detailsObj.betStatus = 1
                } else {
                    if (item.betStatus === 3) {
                        this.detailsObj.betStatus = 2
                    }else {
                        this.detailsObj.betStatus = 1
                    }
                }
                    this.detailsObj.date = item.date
                this.postUserListGameWagerByDateS(this.detailsObj).then(res=> {
                    if (res.length !== 0 && !res.code) {
                        this.detailsList = res.pageInfo.list
                        this.detailsList.forEach(arr => {
                            if (arr.winloss) {
                                this.winLTotal += Number(arr.winloss)
                            }
                            this.betTotal += Number(arr.betAmount)
                            if (arr.liveType === '1') {
                                arr.liveName = '滚球'
                                arr.betDetail = arr.betDetail.substr(3)
                            }
                        })
                        // this.xoPage = res.pageInfo.pages
                        this.zjObj = res.gameWagerTotal
                    }
                    this.winLTotal = this.winLTotal.toFixed(2)
                    this.betTotal = this.betTotal.toFixed(2)
                }).catch(err => {
                    this.$refs.layer.open(err.msg,true,false,1000)
                })
            }
        },
        handlePageChange (data) {
            this.mentsObj.pageNum = data
            this.handleListStatementsResult()
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
        .bet_from {
            padding: 10px;
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
                    width: 115px;
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
        h5 {
            padding: 10px 0;
            color: #fff;
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
                border-bottom: 1px solid #bdd9e6;
                background-color: #ededed;
                td.statement-date {
                    border-left: 1px solid #ededed;
                }
                p.red_t{
                    color: #e43040;
                }
            }
            tr.even {
                background-color: #f7d2b9;
            }
            tr.even td {
                border-left: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }
            td.caoz {
                width: 70px;
                cursor: pointer;
            }
            td.caoz.more {
                background: url(../assets/xla.svg) no-repeat center center;
                background-size: 70% 90%;
            }
            td.win {
                color: green;
            }
            td.win.loss,span.win.loss {
                color: red;
            }
            .win_pd {
                padding-right: 10px;
            }
        }
    }
    .logo {
        display: inline-block;
        width: 200px;
        height: 80px;
        background-position: 0 50%;
        background-repeat: no-repeat;
        background-image: url('../assets/bluegreenF.png');
    }
    .title {
        display: inline-block;
        height: 80px;
        padding-top: 40px;
        padding-left: 10px;
        vertical-align: top;
        color: #4fdccb;
    }
    td .item {
        position: relative;
        border-bottom: 1px solid #fff;
        padding: 2px 0;
        .winner {
            position: absolute;
            right: 100px;
            top: 45%;
        }
    }
    td .item:last-child {
        border-bottom: none;
    }
</style>