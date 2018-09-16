<template>
    <div class="home">
        <div class="hm-HeaderModule ">
            <div class="hm-HeaderModule_Primary ">
                <a class="hm-HeaderModule_Logo ">
                </a>
                <div class="hm-BigButtons">
                    <nav class="hm-BigButtons_Inner ">
                        <a class="hm-BigButton ">今日</a>
                        <a class="hm-BigButton hm-BigButton_Highlight ">早盘</a>
                        <a class="hm-BigButton ">滚球</a>
                    </nav>
                </div>
            </div>
            <div class="hm-HeaderModule_Secondary ">
                <div class="hm-HeaderModule_TimeLastLogin ">
                    <time class="hm-Clock ">{{ times }} GMT+8</time>
                </div>
                <div class="hm-HeaderModule_Menus ">
                    <div></div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <span class="hm-DropDownSelections_Highlight ">我的投注</span>
                    </div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <span class="hm-DropDownSelections_Highlight ">账目</span>
                    </div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <span class="hm-DropDownSelections_Highlight ">账户</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wc-PageView ">
            <div class="wc-PageView_Main wc-InPlayPage_MainContainer ">
                <div class="ip-ControlBar ">
                    <div class="ip-ControlBar_BBarItem wl-ButtonBar_Selected ">
                        Dota 2 今日赛事
                    </div>
                    <div class="ip-ControlBar_msg">
                        公告：
                        <marquee class="ip-msg" behavior="scroll" direction="left"  onmouseover=this.stop() onmouseout=this.start()>
                            2018年9月8日下午，大方县公安局接到群众报警称，猫场镇碧脚村有人被杀伤。接警后，民警立即赶到现场，
                            将伤者陈某(男，40岁，纳雍锅圈岩乡人，)送到医院救治，陈某经送医后因伤势过重抢救无效死亡。
                            该案发生后，我局高度重视，迅速成立专案组，全力开展侦破工作，迅速锁定犯罪嫌疑人沙某(男，37岁，居住大方县猫场镇前进村)并组织多个追捕组进行抓捕。
                            9月9日上午10时许，犯罪嫌疑人迫于强大压力，向我局投案自首。目前，犯罪嫌疑人沙某已被依法刑事拘留，案件还在进一步办理中。
                        </marquee>
                    </div>
                    <div @click="showModal = true" class="ip-ControlBar-btn">
                        <button>选择联赛</button>
                    </div>
                </div>
                <div class="ipe-EcventViewView ">
                        <div :class="sidebar?'ipn-EventViewNavigation ipn-EventViewNavigation-expanded':'ipn-EventViewNavigation ipn-EventViewNavigation-expanded ipn_w'">
                            <div :class="sidebar ? 'ipn-EventViewNavigation_Classifications ipn-Scroller_Content' : 'ipn-EventViewNavigation_Classifications ipn-Scroller_Content ipn-EventViewNavigation-scrollcollapse'">
                                <div :class="sidebar ?'ipn-ControlBar ' :'ipn-ControlBar ipn-closed'">
                                    <span :class="sidebar?'ipn-ControlBar_CollapseButton':'ipn-ControlBar_CollapseButton ipn_right'" @click="sidebar = !sidebar"></span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-closed'" v-for="(item,key) in eventBarList" :key="key">
                                    <span class="ipn-Classification-num">
                                        <span class="ci-ClassificationIcon ci-ClassificationIcon-12 "></span>
                                        <span class="ipn-Class-num">{{ item.count }}</span>
                                    </span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">
                                        {{ item.category }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="ipe-EventViewDetail ">
                            <div class="ipe-EventViewDetailNativeScroller ipe-EventViewDetailNativeScroller-scrollable  ">
                                <div class="ipe-EventViewDetailNativeScroller_ContentContainer ">
                                    <div class="ipe-EventViewDetail_MarketGrid gl-MarketGrid ">
                                        <table class="ipe-table">
                                            <thead>
                                              <tr>
                                                <td class="col-time" rowspan="2">
                                                    <span>时间</span>
                                                </td>
                                                <td class="col-name"  rowspan="2">
                                                    <span>赛事</span>
                                                </td>
                                                <td class="ipe-bor" colspan="3">比赛</td>
                                                <td colspan="3" class="ipe-bor">地图1 </td>
                                                <td class="col-more" rowspan="2">+</td>
                                             </tr>
                                              <tr>
                                                <td class="col-1x2">胜负盘</td>
                                                <td class="col-hdp">让分盘</td>
                                                <td class="col-ou">大小盘</td>
                                                <td class="col-1x2">胜负盘</td>
                                                <td class="col-hdp">让分盘</td>
                                                <td class="col-ou">大小盘</td>
                                            </tr>
                                            </thead>
                                            <tbody v-for="(items, key) in matchList" :key="key">
                                              <tr>
                                                 <td colspan="9" class="ipe-table-sc-title">{{ items.league }}</td>
                                              </tr>
                                              <tr>
                                                 <td colspan="9">
                                                     <table class="ipe-table-sc-table">
                                                         <tbody v-for="(itemes, key) in items.gameMatches" :key="key">
                                                           <tr>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                               <td>{{ itemes.matchTime }}</td>
                                                           </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                              </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="wc-PageView_RightColumn">
                <p class="wc-PageView_header">
                   <span>投注单</span>
                </p>
                <div class="bet_info" v-if="true">
                    <p class="wc-PageView_header text_r">标准投注单</p>
                    <div class="bet_deleteAll">
                        全部删除
                    </div>
                    <ul class="bet_details">
                        <li>
                            <div class="bet_details_body">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bet_prompt" v-if="false">
                   点击赔率以添加选项
                </div>
            </div>
        </div>
        <div class="model" v-if="showModal">
            <div class="models" @click="showModal = false"></div>
            <div class="league-select">
                <div class="s-dialog-header">
                    <i class="fa icon league-header"></i>
                    <h4>选择联赛</h4>
                    <a class="s-dialog-close btn-cancel" @click="showModal = false">
                        <i class="icon close"></i>
                    </a>
                </div>
                <div class="button-panel">
                    <label class="all-leagues-container">
                        <input id="all-leagues" class="all-leagues" type="checkbox" value="1" checked="checked" data-all-sports="29">
                        <label class="icon-all-leagues" for="all-leagues">
                        </label>
                        全选
                    </label>
                </div>
                <div class="s-dialog-body">
                    <label class="league-opt">
                        <input id="league-9097" class="league" type="checkbox" data-id="29" value="9097" checked="checked">
                        <label class="icon-league" for="league-9097"></label>
                        韩国- 挑战K联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-2332" class="league" type="checkbox" data-id="29" value="2332" checked="checked">
                        <label class="icon-league" for="league-2332"></label>
                        挪威 - 乙级联赛 </label>
                    <label class="league-opt">
                        <input id="league-2025" class="league" type="checkbox" data-id="29" value="2025" checked="checked">
                        <label class="icon-league" for="league-2025"></label>
                        芬兰甲级联赛
                    </label>
                    <label class="league-opt">
                    <input id="league-2101" class="league" type="checkbox" data-id="29" value="2101" checked="checked">
                        <label class="icon-league" for="league-2101"></label>
                        冰岛 - 杯赛 </label>
                    <label class="league-opt">
                        <input id="league-2513" class="league" type="checkbox" data-id="29" value="2513" checked="checked">
                        <label class="icon-league" for="league-2513"></label>
                        瑞典 - 南部甲级联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-9757" class="league" type="checkbox" data-id="29" value="9757" checked="checked">
                        <label class="icon-league" for="league-9757"></label>
                        俄罗斯 - 乙级联赛 </label>
                    <label class="league-opt">
                      <input id="league-1834" class="league" type="checkbox" data-id="29" value="1834" checked="checked">
                      <label class="icon-league" for="league-1834"></label>
                       巴西 - 甲级联赛
                     </label>
                    <label class="league-opt">
                        <input id="league-1835" class="league" type="checkbox" data-id="29" value="1835" checked="checked">
                        <label class="icon-league" for="league-1835"></label>
                        巴西 - 乙级联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-10747" class="league" type="checkbox" data-id="29" value="10747" checked="checked">
                        <label class="icon-league" for="league-10747"></label>
                        阿尔及利亚 - 青年U21联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-1739" class="league" type="checkbox" data-id="29" value="1739" checked="checked">
                        <label class="icon-league" for="league-1739"></label>
                        阿根廷 - 乙级联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-1740" class="league" type="checkbox" data-id="29" value="1740" checked="checked">
                        <label class="icon-league" for="league-1740"></label>
                        阿根廷 - 甲级联赛
                    </label>
                    <label class="league-opt">
                        <input id="league-1742" class="league" type="checkbox" data-id="29" value="1742" checked="checked">
                        <label class="icon-league" for="league-1742"></label>
                        亚美尼亚 - 超级联赛
                    </label>
                    </div>
                <div class="s-dialog-footer">
                    <button class="s-button btn-cancel" @click="showModal = false">取消</button>
                    <button class="s-button primary btn-ok">继续</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'home',
    components: {},
    data () {
        return {
            sidebar: true,
            eventType: 3,
            eventBarList: [],
            matchList:[],
            times: null,
            showModal: false
        }
    },
    created () {
        this.handleGetEvents()
        this.handleGetMatches()
    },
    mounted () {
        this.setTime()
    },
    methods: {
      ...mapActions([ 'postBetGameS', 'postMatchCountS', 'postMatchesS' ]),
        handleGetEvents () {
          let data = {
             rtype: this.eventType
          }
          this.postMatchCountS(data).then(res => {
              if(res.length !== 0) {
                 res.forEach(arr => {
                  if(arr.category === 'ALL') {
                      arr.category = '全部赛事'
                  }
                  if(arr.category) {
                      this.eventBarList.push(arr)
                  }
               })
              }
          })
        },
        handleGetMatches () {
            let data = {
                rtype: this.eventType
            }
            this.postMatchesS(data).then(res => {
                if(res.length !==0) {
                    console.log(res)
                    this.matchList = res
                }
            })
        },
        setTime () {
          setInterval(() => {
              let h, m, s
              let timer = new Date()
              h = timer.getHours()
              m = timer.getMinutes() > 10 ? timer.getMinutes() : '0' + timer.getMinutes()
              s = timer.getSeconds() > 10 ? timer.getSeconds() : '0' + timer.getSeconds()
              this.times = h + ':' + m + ':' + s
          },1000)
        }
    }
 }
</script>
<style scoped lang="scss">
    .hm-HeaderModule {
        display: table;
        table-layout: fixed;
        width: 100%;
        background-color: #14805e;
        min-width: 1023px;
        .hm-HeaderModule_Primary {
            display: table;
            table-layout: fixed;
            width: 100%;
            padding: 0 25px;
            border-bottom: 1px solid #189970;
            .hm-HeaderModule_Logo {
                display: table-cell;
                width: 119px;
                height: 25px;
                background-position: 0 50%;
                background-repeat: no-repeat;
                background-image: url(../assets/ds.svg);
            }
        }
        .hm-BigButtons {
            display: table-cell;
            width: auto;
            vertical-align: middle;
            text-align: center;
            padding-right: 16px;
        }
        .hm-BigButtons_Inner {
            display: table;
            table-layout: fixed;
            margin: 0 auto;
            border-spacing: 15px 0;
            .hm-BigButton {
                height: 79px;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                border-bottom: 3px solid transparent;
                font-size: 13px;
                color: #e4e4e4;
                line-height: 1;
            }
            .hm-BigButton_Highlight {
                color: #fff;
                border-bottom-color: #ffdf1b;
            }
        }
        .hm-HeaderModule_Secondary {
            display: flex;
            align-items: center;
            width: 100%;
            height: 30px;
            padding: 0 25px;
            position: relative;
            .hm-HeaderModule_TimeLastLogin {
                flex: 1 0 auto;
                vertical-align: middle;
                font-size: 11px;
                color: #4acfa5;
            }
            .hm-HeaderModule_Menus {
                display: flex;
                flex: 0 1 auto;
                text-align: right;
                font-size: 11px;
                color: #4acfa5;
                .hm-LanguageDropDownSelections {
                    display: inline-table;
                    position: relative;
                    margin-right: 25px;
                }
                .hm-DropDownSelections_Highlight {
                    color: #e4e4e4;
                    margin-left: 6px;
                }
            }
        }
    }
    .wc-PageView {
        display: flex;
        align-items: stretch;
        min-width: 1023px;
        min-height: 88.5vh;
        .wc-InPlayPage_MainContainer.wc-PageView_Main {
            display: block;
            -ms-overflow-style: none;
        }
        .wc-PageView_Main {
            flex: 1 1 auto;
            width: auto;
            position: relative;
            display: flex;
            align-items: stretch;
            overflow: hidden;
            .ip-ControlBar {
                background-color: #474747;
                border-bottom: 1px solid #303030;
                position: relative;
                .ip-ControlBar_BBarItem {
                    padding-left: 15px;
                    font-size: 12px;
                    color: #bbb;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 29px;
                    pointer-events: auto;
                    padding-right: 25px;
                }
                .ip-ControlBar-btn{
                    position: absolute;
                    right: 17px;
                    top: 4px;
                    height: 80%;
                    button{
                        height: 100%;
                        width: 80px;
                        border-radius: 5px;
                        outline: none;
                        border: none;
                        background-color: #999;
                        color: #fff;
                    }
                }
                .ip-ControlBar_msg{
                    position: absolute;
                    top: 0;
                    right: 120px;
                    width: 79.7%;
                    height: 29px;
                    line-height: 29px;
                    color: #e4e4e4;
                    .ip-msg{
                        position: absolute;
                        width: 98%;
                    }
                }
                .ip-ControlBar_BBarItem.wl-ButtonBar_Selected {
                    color: #ffdf1b;
                }
            }
        }
        .ipe-EcventViewView  {
            display: table;
            table-layout: fixed;
            width: 100%;
            height: 100%;
            .ipn-Classification-num{
                display: flex;
                align-items: center;
                height: 100%;
                position: absolute;
                top: 0;
                right: 17px;
            }
            .ipn-Class-num{
                display: inline-block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                background-color: #517372;
            }
            .ipn-EventViewNavigation {
                background-color: #333;
                transition: width .35s ease-in-out;
                width: 214px;
                cursor: pointer;
                display: table-cell;
                vertical-align: top;
                border-right: 1px solid #303030;
                position: relative;
            }
            .ipn-Classification.ipn-closed,.ipn-ControlBar.ipn-closed{
                min-width: 64px;
                transition: min-width .35s ease-in-out;
            }
            .ipn-EventViewNavigation.ipn_w{
                width: 64px;
                transition: min-width .35s ease-in-out;
            }
            .ipn-ClassificationButton_Label.ipn-ClassificationButton_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-ClassificationButton_Label.ipn-ClassificationButton_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-EventViewNavigation-expanded .ipn-ControlBar_CollapseButton.ipn_right{
                background-image: url(../assets/right.svg);
            }
            .ipn-EventViewNavigation-expanded .ipn-EventViewNavigationNativeScroller {
                transition-duration: .35s;
                background-color: #333;
            }
            .ipn-EventViewNavigationNativeScroller {
                height: 100%;
                overflow: hidden;
                z-index: 20;
            }
            .ipn-EventViewNavigationNativeScroller_ContentContainer {
                overflow: auto;
                transition: width .35s ease-in-out;
                max-height: calc(100vh - 132px);
            }
            .ipn-Scroller_Content {
                border-right: 1px solid #303030;
                max-width: 213px;
                border-bottom: 20px solid #333;
            }
            .ipn-ControlBar {
                background-color: #3d3d3d;
                height: 30px;
                position: relative;
                border-bottom: 1px solid #3d3d3d;
                min-width: 213px;
                transition: border, background-color, min-width .35s ease-in-out;
            }
            .ipn-ControlBar_CollapseButton {
                position: absolute;
                right: 12px;
                transition: right .3s, background-color;
                padding: 11px 10px 10px 13px;
                margin-top: 8px;
            }
            .asia-browser .ipn-ControlBar_CollapseButton {
                padding-bottom: 6px;
            }
            .ipn-EventViewNavigation-expanded .ipn-ControlBar_CollapseButton {
                background-image: url(../assets/ssuo.svg);
                background-repeat: no-repeat;
            }
            .ipn-ControlBar_Button, .ipn-ControlBar_MediaButton {
                width: 50px;
                text-align: center;
                vertical-align: middle;
                height: 29px;
                line-height: 29px;
                border-bottom: 2px solid #3d3d3d;
                opacity: 1;
                transition-property: opacity;
                transition-duration: .3s;
                transition-delay: .3s;
            }
            .ipn-ControlBar_Button {
                display: inline-block;
                color: #777;
                font-size: 11px;
            }
            .ipn-Classification {
                width: 100%;
                min-width: 213px;
                height: 30px;
                line-height: 30px;
                position: relative;
                top: 0;
                color: #e4e4e4;
                background-color: #333;
                border-bottom: 1px solid #274526;
                transition: min-width .4s ease-in-out;
            }
            .ipn-Classification:hover{
                background-color: #14805e
            }
            .ci-ClassificationIcon-12.ci-ClassificationIcon {
                display: inline-block;
                background-position: 50% 50%;
                width: 24px;
                height: 28px;
                transition: right .3s;
                background-image: url(../assets/ftb.svg);
                background-repeat: no-repeat;
                background-size: auto 14px;
            }
            .ipn-ClassificationButton_Label {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
                width: 75%;
                font-weight: 400;
                padding-left: 10px;
                font-size: 13px;
                position: relative;
                bottom: 1px;
                -moz-osx-font-smoothing: grayscale;
                opacity: 1;
                transition: opacity, width 1s ease-in-out;
            }
            .ipe-EventViewDetail {
                display: table-cell;
                width: 100%;
            }
            .ipe-EventViewDetailNativeScroller {
                position: relative;
                border-right: 1px solid #373737;
                height: 100%;
                color: #ddd;
            }
            .ipe-EventViewDetailNativeScroller_ContentContainer {
                overflow-y: scroll;
                overflow-x: hidden;
                max-height: calc(100vh - 135px);
            }
            .ipe-EventViewDetailNativeScroller:after {
                content: " ";
                width: 16px;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #474747;
                border-left: 1px solid #373737;
                opacity: 1;
                transition-property: opacity;
                transition-duration: .35s;
                pointer-events: none;
            }
            .ipe-EventViewDetailNativeScroller_Content {
                border-right: 1px solid #373737;
            }
            .ipe-table{
                width: 100%;
                text-align: center;
                .ipe-bor{
                    border-bottom: 1px solid #999;
                }
                thead td{
                    border-right: 1px solid #999;
                    background-color: #48504e;
                }
                .ipe-table-sc-title{
                    padding: 5px 0 5px 10px;
                    text-align: left;
                    background-color: #189970;
                }
                .ipe-table-sc-table{
                    width: 100%;
                }
            }
            .ipn-EventViewNavigation-scrollcollapse {
                overflow: hidden;
                width: 64px;
                padding-right: 14px;
            }
        }
    }
    .wc-PageView_RightColumn {
        flex: 0 0 auto;
        background-color: #474747;
        position: relative;
        transition: width,min-width .3s ease-in-out;
        width: 277px;
        max-width: 592px;
        border-left: 2px solid #4d4d4d;
        .wc-PageView_header{
            height: 28px;
            line-height: 28px;
            border-top:1px solid #4d4d4d;
            background-color:#14805e;
            text-align: center;
            color: #ffdf1b;
            span{
                display: inline-block;
                height: 100%;
                border-bottom: 2px solid #ffdf1b;
            }
        }
        .text_r {
            border-top:1px solid #179970;
            text-align: right;
            padding-right: 5px;
        }
        .bet_prompt{
            color: #ddd;
            text-align: center;
            line-height: 18px;
            padding: 32px 10px;
            background-color: #666;
            border-bottom: none;
            border-top: solid 1px #116c4f;
            cursor: default;
        }
        .bet_deleteAll{
            position: relative;
            color:#666;
            background-color: #c7c7c7;
            padding: 3px 10px;
            border-top: solid 1px #116c4f;
            border-bottom: solid 1px #aaa;
        }
        .bet_details_body{
        }
    }
    .models{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        opacity: .6;
        background-color: #000;
        transition: opacity .6s ease-in-out;
        z-index: 50;
    }
    .league-select{
        position: fixed;
        min-width: 600px;
        max-width: 40%;
        left: 30%;
        top: 28%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        border: 2px solid #132848;
        background-color: #fff;
        z-index: 100;
        .s-dialog-header {
            clear: both;
            line-height: 32px;
            background: #189970;
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
                width: 60px;
                margin-right: 16px;
            }
           .btn-cancel {
                font-size: 14px;
                background: #9d9d9d;
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#9d9d9d',endColorstr='#9d9d9d',GradientType=0);
                box-shadow: 0 2px #767676;
                border-radius: 3px;
                border: 1px solid #9d9d9d;
                color: #fff;
            }
          .s-button.primary {
                font-size: 14px;
                background: #f60!important;
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff6600',endColorstr='#ff6600',GradientType=0);
                box-shadow: 0 2px #e83200;
                border-radius: 3px;
                border: 1px solid #f60;
                color: #fff!important;
            }
        }
    }
    @media (min-width: 1109px) {
        .hm-BigButtons_Inner {
            border-spacing: 20px 0;
        }
    }
</style>