<template>
    <div :class="maxRight ? 'wc-PageView_R max' : 'wc-PageView_R'">
        <div class="wc-PageView_header">
            <span :class="maxRight ? 'wc-PageView_icon ssuo' : 'wc-PageView_icon'" @click="maxRight = !maxRight" ></span>
            <p v-if="eventType === 3">
                <span class="hm-DropDS_Highlight wc_mr" @click="handleSelectLive('sp')">{{$t('lang.home.pageView_video')}}</span>
                <span class="hm-DropDS_Highlight wc_mr" @click="handleSelectLive('bf')">{{$t('lang.home.pageView_score')}}</span>
            </p>
            <p v-if="eventType < 3">
                <span class="hm-DropDS_Highlight wc_mr cg hm-DropDS_Highlight wc_mr">{{$t('lang.home.pageView_tzd')}}</span>
            </p>
            <p v-if="eventType === 5">
                <span class="hm-DropDS_Highlight wc_mr cg hm-DropDS_Highlight wc_mr">{{$t('lang.home.pageView_cg')}}</span>
            </p>
        </div>
        <div class="bet-rollBall" v-if="eventType !== 5">
            <div :class="!betBoxShow ? 'wc-PageView_i_v' : 'wc-PageView_i_v small'" v-if="eventType === 3">
                <div class="frame" v-if="selectLive === 'bf'">
                        <iframe v-if="matchText" :src="matchText"  class="frame" frameborder="0"></iframe>
                        <div class="frame_child" v-if="!matchText">{{$t('lang.home.table_score')}}</div>
                    </div>
                <div class="frame" v-if="selectLive === 'sp'">
                        <div class="frame_child_f" v-if="liveText" v-html="liveText"></div>
                        <div class="frame_child" v-if="!liveText">{{$t('lang.home.pageView_nVideo')}}</div>
                    </div>
            </div>
            <div :class="betBoxShow  ? 'wc-PageView_R_item_m' : 'wc-PageView_R_item_m big'">
                <div class="bet_info bet_In" v-if="betBoxShow">
                    <p class="wc-PageView_header text_r">{{$t('lang.home.pageView_bztzd')}}</p>
                    <ul class="bet_details" v-if="typeof betLimit === 'object' ">
                        <li>
                            <div class="bet_details_body">
                                <p class="bet_count_down bet_cd_r">
                                    <span class="num">{{ countDown }}</span>
                                    <button class="o-button" @click="handleCountDown('ref')">{{$t('lang.home.pageView_sx')}}</button>
                                </p>
                                <p class="bet_details_body_event"> {{ betLimit.teamLeft }} <span> VS </span>{{ betLimit.teamRight }}</p>
                                <h3 class="bet_details_body_title">{{ betLimit.teamName }}</h3>
                                <p class="bet_details_body_event">{{ betLimit.oddsName }}<b>@</b>{{ betLimit.odds }}</p>
                                <p class="bet_details_body_event"></p>
                                <p class="bet_details_body_event bet_p">
                                    <input type="number" :placeholder="$t('lang.home.pageView_bj')" class="bet_input" v-model="betMoney">
                                    <span class="bet-items-del bet-items-cl_s" @click="handleChangeBetMoney('ET')"></span>
                                </p>
                                <p class="bet_details_body_event">
                                    <button class="o-button btn" @click="handleChangeBetMoney('50')">50</button>
                                    <button class="o-button btn" @click="handleChangeBetMoney('100')">100</button>
                                    <button class="o-button btn" @click="handleChangeBetMoney('500')">500</button>
                                    <button class="o-button btn" @click="handleChangeBetMoney('1000')">1000</button>
                                    <button class="o-button btn" @click="handleChangeBetMoney('MAX')">MAX</button>
                                </p>
                                <p class="bet_details_body_event">
                                    <span class="bet_max">{{$t('lang.home.pageView_zdtz')}}: {{ betLimit.minStake }}</span>
                                    <span class="bet_max">{{$t('lang.home.pageView_zgtz')}}: {{ betLimit.maxStake }}</span>
                                </p>
                                <p class="bet_details_body_event">
                                    <input type="checkbox" id="accept_new_odds" v-model="oddsChoose">
                                    <label for="accept_new_odds">{{$t('lang.home.pageView_rule')}}</label>
                                    <span class="bet_winMoney">{{$t('lang.home.pageView_pcje')}}: {{ winMoney }}</span>
                                </p>
                                <p class="bet_details_body_event">
                                    <button class="wager_btn" @click="handleClickQBet()">{{$t('lang.home.pageView_qr')}}</button>
                                    <button class="wager_btn" @click="handleClickQBet('cl')">{{$t('lang.home.pageView_qx')}}</button>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bet_prompt" v-if="!betBoxShow">
                    {{$t('lang.home.pageView_djpl')}}
                </div>
                <div class="bet_info" v-if="pendBetting">
                    <p class="wc-PageView_header text_r">{{$t('lang.home.pageView_dqszd')}}</p>
                    <ul class="bet_details" >
                        <li>
                            <div class="bet_details_bodys">
                                <div class="bet even  open ">
                                    <div class="wager-id-date wager_f" v-if="pendBetObj.wagerId && pendBetObj.betTime">
                                        <span class="wager-id">{{ pendBetObj.wagerId }}</span>
                                        <span class="wager-date">{{ pendBetObj.betTime }}</span>
                                    </div>
                                    <div class="wager-id-date" v-if="pendBetObj.date && pendBetObj.category">
                                        <span class="event-date">{{ pendBetObj.date + ' ' + pendBetObj.category }}</span>
                                    </div>
                                    <div class="wager-id-date" v-if="pendBetObj.teamLeft && pendBetObj.teamRight">
                                        <span class="team-name sel">{{ pendBetObj.teamLeft }}</span>
                                        <span class="vs">-vs-</span>
                                        <span class="team-name sel">{{ pendBetObj.teamRight }}</span>
                                    </div>
                                    <div class="wager-id-date" v-if="pendBetObj.betDetail && pendBetObj.betOdds">
                                        <span class="selection">{{ pendBetObj.betDetail }}</span>
                                        <span class="at">@</span>
                                        <span class="odds ">{{ pendBetObj.betOdds }}</span>
                                        <span class="of">{{$t('lang.home.pageView_xgpl')}}</span>
                                    </div>
                                    <div class="wager-id-date" v-if="pendBetObj.toWin ">
                                        <span> {{$t('lang.home.pageView_ky')}}:</span>
                                        <span class="stake">{{ pendBetObj.toWin }}</span>
                                    </div>
                                    <div class="wager-id-date" v-if="pendBetObj.betAmount">
                                        <span>{{$t('lang.home.pageView_tzje')}} :</span>
                                        <span class="stake">{{ pendBetObj.betAmount }}</span>
                                    </div>
                                    <div class="wager-id-date">
                                        <button class="wager_btn" @click="handleOpenNewPage('tz')">{{$t('lang.home.pageView_ckgd')}}</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bet-content" v-if="eventType === 5">
            <div v-if="mixParlayObj.oddList" :class="mixParlayObj.oddList ? 'bet_body' : 'bet_body hide'">
                <div class="bet-items" v-if="mixParlayObj.oddList" v-for="(bItem,key) in mixParlayObj.oddList" :key="key">
                    <p class="bet-items-header">
                        {{ bItem.teamLeft +' VS ' + bItem.teamRight }}
                    </p>
                    <div class="bet-items-body" >
                        <span :class="bItem.changeOdds ? 'bet-items-odds change': 'bet-items-odds'">
                            {{ bItem.betOdd }}
                        </span>
                        <span class="bet-items-content">
                            <span>{{ bItem.betTeam ===  '2' ? bItem.teamRight : bItem.teamLeft }}</span>
                            <span>{{ bItem.betDetails }}</span>
                        </span>
                        <span class="bet-items-del" @click="handleDeleteItem(bItem.gid)"></span>
                    </div>
                    <div v-if="bItem.msg" class="prompt_msg">
                        {{ bItem.msg }}
                    </div>
                </div>
            </div>
            <div v-if="mixParlayObj.oddList" class="bet-box">
                <p class="bet-box-list">
                    <span @click="handleChangeBetMoney('10')">10</span>
                    <span @click="handleChangeBetMoney('50')">50</span>
                    <span @click="handleChangeBetMoney('100')">100</span>
                    <span @click="handleChangeBetMoney('200')">200</span>
                    <span @click="handleChangeBetMoney('MAX')">MAX</span>
                </p>
                <P class="bet-box-sum">
                    <span>{{ $t('lang.statements.table_pl') }}</span>
                    {{ mixParlayObj.betOdd }}
                </P>
                <P class="bet-box-sum">
                    <span>{{$t('lang.home.pageView_yxzs')}}:</span>
                    {{ mixParlayObj.oddList.length }}
                </P>
                <P class="bet-box-sum">
                    <span>{{$t('lang.home.pageView_zdtz')}}:</span>
                    {{ mixParlayObj.minStake }}
                </P>
                <P class="bet-box-sum">
                    <span>{{$t('lang.home.pageView_zgtz')}}:</span> {{ mixParlayObj.maxStake }}
                </P>
                <P class="bet-box-sum">
                    <span>{{$t('lang.home.pageView_pcje')}}:</span>
                     {{ typeof winMoney === 'string' && !isNaN(winMoney) ? winMoney : '0.00' }}
                </P>
                <P class="bet-box-sum bet_p">
                    <input type="number" class="bet_input" v-model="betMoney">
                    <span class="bet-items-del cls" @click="betMoney = null"></span>
                </P>
                <p class="bet-box-sum">
                    <button @click="handleConfirmBet()">{{betItemList.length &lt;= 1 ? '最低两注' : '立即下注' }}</button>
                </p>
            </div>
            <div v-if="!mixParlayObj.oddList" class="bet_title">
                {{$t('lang.home.pageView_djpl')}}
            </div>
        </div>
        <layer ref="layer" @fromDiaoLog="handleBetMixParlay"></layer>
    </div>
</template>

<script>
import Mixin from '@/utils/Mixin'
import { mapState, mapActions, mapMutations } from 'vuex'
import layer from '@/components/diaoLog'
import _ from 'lodash'

export default {
    name: "betCom",
    mixins: [Mixin],
    components: {
        layer,
    },
    data () {
        return {
            money: null,
            winMoney: null,
            sizeSwitch: true,
            selectLive: 'bf',
            pendBetObj: {},
        }
    },
    computed : {
        ...mapState([ 'eventType', 'liveText', 'matchText', 'betItemList',
            'betLimit', 'countDown', 'mixParlayObj', 'betBoxShow' ]),
        mixParlayOdd () {
            return this.mixParlayObj.betOdd
        }
    },
    mounted(){
        console.log(document.querySelector('.bet_p'))
    },
    methods: {
        ...mapActions([ 'postBetMixParlayS', 'postBetMixParlayS', 'postBetGameS' ]),
        ...mapMutations([ 'handleDelItem', 'setBetObj', 'changeBetBoxShow', 'deleteParlayObj' ]),
        handleSelectLive (type) {
            if (type === 'bf') {
                this.selectLive = 'bf'
                this.sizeSwitch = true
            } else {
                this.selectLive = 'sp'
                this.sizeSwitch = false
                setTimeout(() => {
                    let em = document.getElementsByTagName('embed')
                    if (em.length) {
                        em[0].style.width = '100%'
                        em[0].style.height = '100%'
                    }
                },100)
            }
        },
        handleDeleteItem (index) {
            this.handleDelItem(index)
            this.handleGetMixList()
        },
        handleChangeBetMoney (num) {
            if (num === 'ET') {
                this.betMoney = ''
                return false
            } else if (this.betMoney >= Number(this.betLimit.maxStake)) {
                this.$refs.layer.open(this.$t('lang.home.bet_tzxe'),true,false,2000)
                return false
            } else {
                this.betMoney = Number(this.betMoney)
                switch (num) {
                    case '10' :
                        this.betMoney = 10
                        break
                    case '50' :
                        this.betMoney = 50
                        break
                    case '100' :
                        this.betMoney = 100
                        break
                    case '200' :
                        this.betMoney = 200
                        break
                    case '500' :
                        this.betMoney = 500
                        break
                    case '1000' :
                        this.betMoney = 1000
                        break
                    case 'MAX' :
                        if (this.eventType === 5 ) {
                            this.betMoney = Number(this.mixParlayObj.maxStake)
                        } else {
                            this.betMoney = Number(this.betLimit.maxStake)
                        }
                        break
                }
            }
        },
        handleConfirmBet () {
            this.$refs.layer.open('是否确认下注',true,true)
        },
        handleBetMixParlay (con) {
            if (con) {
                if (Number(this.betMoney) < this.mixParlayObj.minStake) {
                    this.$refs.layer.open(this.$t('lang.home.bet_tzxe'),true,false,2000)
                    return false
                }
                let data = {
                    money: this.betMoney
                }
                let oddList = []
                data.mixParlayInfoList = []
                oddList = _.cloneDeep(this.mixParlayObj.oddList)
                oddList.forEach(arr => {
                    let oddItem = {}
                    oddItem.betOdd = arr.betOdd
                    oddItem.betTeam = arr.betTeam
                    oddItem.oddId = arr.oddId
                    data.mixParlayInfoList.push(oddItem)
                })
                if (oddList.length <= 1) {
                    this.$refs.layer.open('最低选择两注',true,false,1500)
                    return false
                }
                this.postBetMixParlayS(data).then(res => {
                    if (res === 'success') {
                        this.$refs.layer.open(this.$t('lang.home.bet_xzcg'),true,false,1500)
                        this.winMoney = null
                        this.betMoney = null
                        this.deleteParlayObj()
                        this.handleRefUserInfo()
                    } else if(res.code === 200) {
                        this.mixParlayObj.oddList.forEach(arr => {
                            res.msg.data.forEach(arrs => {
                                if (arrs.oddId === arr.oddId) {
                                    if (arrs.betOdd) {
                                      arr.betOdd = arrs.betOdd
                                      arr.changeOdds = true
                                    }
                                      arr.msg = arrs.msg
                                }
                            })
                        })
                    } else if (res.code === 401 ) {
                        this.$refs.layer.open(`${res.msg}`,true,false,1500)
                        this.deleteParlayObj()
                    }
                })
            } else {
                return false
            }
        }
    },
    watch :{
        betMoney (nev) {
            if (this.eventType === 5) {
                if (Number(nev)> this.mixParlayObj.maxStake) {
                    this.$refs.layer.open(this.$t('lang.home.bet_tzxe'),true,false,2000)
                    return false
                } else {
                    this.winMoney =  Number(this.mixParlayObj.betOdd * nev) + Number(nev)
                }
            } else {
                if (Number(nev)> this.betLimit.maxStake) {
                    this.$refs.layer.open(this.$t('lang.home.bet_tzxe'),true,false,2000)
                    return false
                }
                this.winMoney =  Number(this.betLimit.odds * nev) + Number(nev)
                let data = {
                    money: nev
                }
                this.setBetObj(data)
            }
            this.winMoney = this.winMoney.toFixed(2)
        },
        mixParlayOdd (nev) {
            if (this.betMoney) {
                this.winMoney =  Number(nev * this.betMoney) + Number(this.betMoney)
                this.winMoney = this.winMoney.toFixed(2)
            }
        }
    }
 }
</script>

<style scoped lang="scss">
    .wc-PageView_R {
        flex: 0 0 auto;
        position: relative;
        transition: width .1s ease-in-out;
        width: 300px;
        max-width: 592px;
        height: 100%;
        overflow: hidden;
    }
    .wc-PageView_R.max {
        width: 500px;
        transition: width .1s ease-in-out;
    }
    .bet-rollBall {
        height: 97%;
    }
    .wc-PageView_header{
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #cffbff;
        span.wc-PageView_title{
            display: inline-block;
            height: 100%;
            border-bottom: 2px solid #0299a0;
        }
        span.wc-PageView_icon {
            height: 100%;
            width: 30px;
            display: inline-block;
            float: left;
            cursor: pointer;
            background: url(../assets/fda.svg) no-repeat 50% 50%;
            background-size: 20px 15px;
        }
        span.wc-PageView_icon.ssuo {
            background: url(../assets/sxiao.svg) no-repeat 50% 50%;
            background-size: 20px 15px;
        }
        .wc_mr{
            margin-right: 20px;
        }
    }
    .wc-PageView_header.cg {
        border-bottom: 1px solid #25d4bf;
    }
    .text_r {
        background-color: #151f2b;
        text-align: right;
        padding-right: 5px;
        border-bottom: 1px solid #0299a0;
    }
    .bet {
        padding-left:15%;
        border-bottom: 1px solid #0299a0;
    }
    .bet-content:after {
        position: absolute;
        content: '';
        right: 0;
        top: 0;
        width: 17px;
        height: 600px;
        background-color: #581f63;

    }
    .bet_title {
        height: 100%;
        width: 100%;
        text-align: center;
        padding-top: 60px;
        color: #fff;
    }
    .bet_body {
        position: relative;
        height: 600px;
        width: 100%;
        padding-top: 5px;
        padding-left: 15px;
        overflow: auto;
        color: #cffbff;
        opacity: .8;
        transition:height .3s  ease-in-out;
        .bet-items {
           margin-bottom: 10px;
        }
        .bet-items-header {
           background-color: #100d10;
           padding: 5px 15px;
        }
        .bet-items-body {
            display: flex;
            padding: 5px 15px;
            background-color: #f5f5f5;
            color: #f2f2f2;
            .bet-items-odds,.bet-items-content,.bet-items-inp,.bet-items-cl {
                height: 38px;
                line-height: 38px;
                text-align: center;
            }
            .bet-items-odds {
                width: 20%;
                font-size: 16px;
                background-color: #1761ca;
            }
            .bet-items-odds.change {
                background-color: #e91e63;
            }
            .bet-items-content {
                display: flex;
                flex-direction: column;
                width: 65%;
                padding: 0 10px;
                color: #2f2e2e;
            }
            .bet-items-content>span {
                height: 50%;
                line-height: 1.6;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .bet-items-inp {
                width: 25%;
            }
            .bet-items-cl {
                width: 9%;
                cursor: pointer;
                background: url("../assets/betSlipClose.png") no-repeat 50% 50%;
            }
        }
        .bet-items-modal {
              position: absolute;
              top:0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index:150;
              text-align: center;
              background-color: #000;
              opacity: .3;
        }
    }
    .bet_body.hide{
        height: 0;
        transition:height .3s  ease-in-out;
    }
    .bet-box {
        height: 20.5%;
        .bet-box-list {
            text-align: center;
            border-bottom: 1px solid #333;
            span{
                display: inline-block;
                width: 20%;
                height: 30px;
                line-height: 30px;
                color: #fff;
                border-right: 1px solid #333;
            }
            span:hover {
                background-color: #6b7177;
            }
        }
        .bet-box-sum {
            position: relative;
            padding: 2px 15px;
            font-size: 15px;
            color: #f2f2f2;
            span {
                color:#67cf35;
            }
            button {
                width: 100%;
                height: 35px;
                background-color: #67cf35;
                border: none;
                outline: none;
            }
            input {
                display: inline-block;
                height: 30px;
                outline: none;
                text-indent: 10px;
            }
        }
    }
    span.bet-items-del{
        position: absolute;
        width: 30px;
        height: 35px;
         right: 40px;
        cursor: pointer;
        background: url("../assets/betSlipClose.png") no-repeat 50% 50%;
    }
    span.bet-items-del.bet-items-cl_s {
        left: 142px;
        height: 25px;
    }
    span.bet-items-del.cls {
        left: 190px;
        height:30px;
    }
    .wager-id-date {
        padding: 2px 0;
        .wager-id{
            padding-right: 20px;
            color: #cffbff;
        }
        .vs ,.at,.stake{
            color: #f60;
        }
        .status {padding-left: 10px}
        .of {padding-left: 5px}
    }
    .prompt_msg {
        text-align: center;
        font-size: 15px;
        padding: 2px 0;
        background-color: #ded9d9;
        color: red;
    }
    .bet_details_body{
        padding-left:15%;
        position: relative;
        .bet_details_body_title,.bet_details_body_event,.bet_count_down{
            position: relative;
            padding: 3px 0;
            b {
                display: inline-block;
                padding: 0 3px;
                font-size: 13px;
                font-weight: bold;
                color: #f60;
            }
            input.bet_input {
                width: 40%;
                height: 25px;
                outline: none;
                margin-right: 5px;
            }
            #accept_new_odds {
                vertical-align: middle;
            }
            span.num {
                display: inline-block;
                width: 25px;
                color: red;
                font-size: 16px;
                font-weight: bold;
                padding-right: 10px;
            }
            button.o-button {
                width: 60px;
                color: #fff;
            }
            button.o-button.btns {
                width: 50px;
            }
            .bet_winMoney {
                display: inline-block;
                margin-left: 20px;
            }
            .bet_max {
                display: inline-block;
                width: 129px;
            }
        }
        .bet_cd_r {
            position: absolute;
            right: 5px;
        }
    }
    .wc-PageView_R_item_m {
        color: #fff;
        /*height: 13%;*/
        /*overflow-y: scroll;*/
    }
    .wc-PageView_R_item_m.big {
        height: 52.3%;
        overflow-y: auto;
    }
    .frame,.frame_child,.frame_child_f {
        width: 100%;
        height: 100%;
    }
    .frame_child{
        text-align: center;
        line-height: 25;
        color: #fff;
    }
    .wc-PageView_i_v {
        width: 100%;
        height: 67%;
        transition: height .2s ease-in-out;
    }
    .wc-PageView_i_v.small {
        height: 41%;
        transition: height .2s ease-in-out;
    }
</style>