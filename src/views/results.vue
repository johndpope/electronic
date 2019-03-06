<template>
    <div class="bet_record">
        <div class="header">
            <span class="logo"></span>
        </div>
        <div class="bet_body">
            <div class="bet_from">
                <div class="form-group">
                    <label class="sr-only">{{$t('lang.results.from_date')}}</label>
                    <vue-datepicker-local v-model="time"></vue-datepicker-local>
                </div>
                <div class="form-group" @click="handleGetLeagues()">
                    <label class="sr-only">&nbsp;</label>
                    <button type="submit" class="btn btn-default">{{$t('lang.results.from_xzls')}}</button>
                </div>
                <div class="form-group" @click="handleGetResult()">
                    <label class="sr-only">&nbsp;</label>
                    <button type="submit" class="btn btn-default">{{$t('lang.results.from_cx')}}</button>
                </div>
                <table class=" info-div-table hd">
                    <thead>
                    <tr>
                        <th class="h date">{{$t('lang.results.from_date')}}</th>
                        <th class="h event">{{$t('lang.results.table_event')}}</th>
                        <th>Match</th>
                        <th>Map 1</th>
                        <th>Map 2</th>
                        <th>Map 3</th>
                        <th>Map 4</th>
                        <th>Map 5</th>
                        <th>Map 6</th>
                        <th>Map 7</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <table class="info-div-table bd">
                <tbody v-for="(item,key) in resultList" :key="key" v-if="resultList.length !== 0">
                 <tr class="l">
                    <td colspan="10">{{ item.category + ' - ' + item.league }}</td>
                </tr>
                 <tr class="even" v-for="(items,keys) in item.gameMatches" :key="keys">
                    <td class="h date">
                        <span>{{ items.matchTime }}</span>
                        <span class="cel" v-if="items.matchStatus === 2">Canceled</span>
                    </td>
                    <td class="h event">
                        <h6 class="bold">{{ items.teamLeftCn }}</h6>
                        <h6 class="">{{ items.teamRightCn }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[0] ? items.gameResults[0].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[0] ? items.gameResults[0].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[1] ? items.gameResults[1].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[1] ? items.gameResults[1].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                         <h6>{{ items.gameResults[2] ? items.gameResults[2].scoreLeft : '-' }}</h6>
                         <h6>{{ items.gameResults[2] ? items.gameResults[2].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[3] ? items.gameResults[3].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[3] ? items.gameResults[3].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[4] ? items.gameResults[4].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[4] ? items.gameResults[4].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[5] ? items.gameResults[5].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[5] ? items.gameResults[5].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[6] ? items.gameResults[6].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[6] ? items.gameResults[6].scoreRight : '-' }}</h6>
                    </td>
                    <td class="period" >
                        <h6>{{ items.gameResults[7] ? items.gameResults[7].scoreLeft : '-' }}</h6>
                        <h6>{{ items.gameResults[7] ? items.gameResults[7].scoreRight : '-' }}</h6>
                    </td>
                </tr>
                </tbody>
                <tbody v-if="resultList.length ===0">
                   <tr>
                       <td class="text" colspan="10">
                           {{$t('lang.results.table_zwsg')}}
                       </td>
                   </tr>
                </tbody>
            </table>
        </div>
        <modal :modalShow="sendChild" @listenFromChild="handleFromChild"/>
        <layer ref="layer"></layer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueDatepickerLocal from 'vue-datepicker-local'
import modal from '@/components/modal'
import Mixin from '@/utils/Mixin'
import layer from '@/components/diaoLog'

export default {
    name: "results",
    components: {
        VueDatepickerLocal,
        modal,
        layer
    },
    mixins: [Mixin],
    data () {
      return {
        // time: new Date(),
        eventType: 4,
        sendChild: {
           showModal: false,
           leaguesList: []
        },
        selectLgList: [],
        resultList: [],
        leagueIds: ''
      }
    },
    created () {
        if (sessionStorage.getItem('18n')){
            this.$i18n.locale = sessionStorage.getItem('18n')
        }
    },
    mounted () {
        this.handleGetResult()
    },
    methods: {
       ...mapActions([ 'postListGameEndResultS', 'postChangeLanguagenS' ]),
       handleGetResult () {
           this.resultList = []
           // let lData = {}
           // if (this.$i18n.locale === 'CH') {
           //     lData.language = 'zh'
           // } else {
           //     lData.language = 'en'
           // }
           // this.postChangeLanguagenS(lData).then(res => {
           //     if (res === 'success') {
                   let data = {
                       date: this.formattingTime(this.time,'dd'),
                       TOKEN: sessionStorage.getItem('Tk'),
                   }
                   if (this.leagueIds) {
                       data.leagueIds = this.leagueIds
                   }
                   this.postListGameEndResultS(data).then(res => {
                      if (!res.msg && res) {
                          this.resultList = res
                      }
                   })
               // }
           // }).catch(err => {
           //     this.$refs.layer.open(err.msg, true, false, 1000)
           // })

       },
       handleFromChild (data) {
           this.sendChild.showModal = data.mShow
           if (data.selectLeagues.length !== 0) {
               this.selectLgList = data.selectLeagues
               this.leagueIds = this.selectLgList.join(',')
           }
       },
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
        .bet_from {
            position: fixed;
            top: 80px;
            padding: 10px 0;
            background: linear-gradient(to bottom,#fff 0,#f6f6f6 47%,#ededed 100%);
            width: 100%;
            box-shadow: 0 0 10px #000;
            z-index: 2;
            white-space: nowrap;
            .form-group {
                display: inline-block;
                vertical-align: middle;
                padding: 0 5px;
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
                #datepicker {
                    width: 85px;
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
                    width: 110px!important;
                    border: 0;
                    color: #fff!important;
                    text-align: center!important;
                    background-image: linear-gradient(to bottom,#9c9c9c 100%,#9c9c9c 100%);
                    border-radius: 3px!important;
                    background-color: #9c9c9c!important;
                    box-shadow: 0 2px #767676;
                }
            }
            .hd {
                margin-top: 15px;
            }
        }
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
            th.h,td.h{
                width: 20%;
            }
            td{
                background-color: #ebebeb;
                border-bottom: 1px solid #f9f9f9;
                border-right: 1px solid #f9f9f9;
            }
            td h6{
                padding: 5px;
            }
            td h6:first-child {
                border-bottom: 1px solid #fff;
            }
            .period,.date {
                text-align: center;
                vertical-align: middle;
            }
            .cel {
                padding-left: 15px;
                color: red;
            }
            .l td {
                background: #363d48;
                color: white;
                font-weight: bold;
                font-size: 14px;
            }
            .text {
                text-align: center;
            }
        }
        .bd {
            margin-top: 125px;
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
</style>