<template>
    <div class="home">
        <div class="hm-HeaderModule ">
            <div class="hm-HeaderModule_Primary ">
                <a class="hm-HeaderModule_Logo ">
                </a>
                <div class="hm-BigButtons">
                    <nav class="hm-BigButtons_Inner ">
                        <a :class="eventType === 1 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('jr')">今日</a>
                        <a :class="eventType === 2 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('zp')">早盘</a>
                        <a :class="eventType === 3 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('gq')">滚球</a>
                    </nav>
                </div>
            </div>
            <div class="hm-HeaderModule_Secondary ">
                <div class="hm-HModule_TimeLogin ">
                    <time class="hm-Clock ">{{ times }} GMT+8</time>
                </div>
                <div class="hm-HeaderModule_Menus ">
                    <div></div>
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight ">我的投注</span>
                    </div>
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight ">账目</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wc-PageView ">
            <div class="wc-PageView_Main wc-InPage_M">
                <div class="ip-ControlBar ">
                    <div class="ip-ControlBar_BBarItem ">
                        Dota 2 今日赛事
                    </div>
                    <div class="ip-ControlBar_msg">
                        公告：
                        <marquee class="ip-msg" behavior="scroll" direction="left"  onmouseover=this.stop() onmouseout=this.start()>
                            2018年9月8日下午，大方县公安局接到群众报警称，猫场镇碧脚村有人嫖娼。接警后，民警立即赶到现场，
                            将伤者陈某(男，40岁，纳雍锅圈岩乡人，)送到医院救治，陈某经送医后因嫖娼过度抢救无效死亡。
                            该案发生后，我局高度重视，迅速成立专案组，全力开展侦破工作，迅速锁定犯罪嫌疑人沙某(女，37岁，居住大方县猫场镇前进村)并组织多个追捕组进行抓捕。
                            9月9日上午10时许，犯罪嫌疑人迫于强大压力，向我局投案自首。目前，犯罪嫌疑人沙某已被依法刑事拘留，案件还在进一步办理中。
                        </marquee>
                    </div>
                    <div @click="showModal = true" class="ip-ControlBar-btn">
                        <button>选择联赛</button>
                    </div>
                </div>
                <div class="ipe-EcventViewView ">
                    <div :class="sidebar?'ipn-EventViewN ipn-EventV-expanded':'ipn-EventViewN ipn-EventV-expanded ipn_w'">
                        <div :class="sidebar ? ' ipn-Scroller_Content' : 'ipn-Scroller_Content ipn-EventV-s'">
                                <div :class="sidebar ?'ipn-ControlBar ' :'ipn-ControlBar ipn-closed'">
                                    <span :class="sidebar?'ipn-Bar_C':'ipn-Bar_C ipn_right'" @click="sidebar = !sidebar"></span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-closed'" v-for="(item,key) in eventBarList" :key="key"
                                     @click="handleGetMatches(item.category)">
                                    <span class="ipn-Classification-num">
                                        <img class="ci-ClassificationIcon" v-if="item.category !== 'CS:GO' && item.category !== '全部赛事'" :src="require('../assets/png/'+item.category+'.png')" alt="">
                                        <img class="ci-ClassificationIcon" v-if="item.category === 'CS:GO'" src="../assets/png/CSGO.png">
                                        <img class="ci-ClassificationIcon" v-if="item.category === '全部赛事'" src="../assets/png/ALL.png">
                                        <span class="ipn-Class-num">{{ item.count }}</span>
                                    </span>
                                    <span :class="sidebar ? 'ipn-Class_Label':'ipn-ClassificationButton_cls ipn-Class_Label'">
                                        {{ item.category }}
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div class="ipe-EventViewDetail ">
                            <div class="ipe-EventVScroller ">
                                <div class="ipe-Event_ContentContainer ">
                                    <div class="ipe-table" v-if="matchList.length !== 0">
                                        <table class="block_table">
                                            <thead class="fs">
                                             <tr>
                                                 <td class="col-time">
                                                   时间
                                                 </td>
                                                 <td class="col-names">
                                                   赛事
                                                 </td>
                                                 <td class="ipe-bor">
                                                   胜负盘
                                                 </td>
                                                 <td class="ipe-bor">
                                                   全场让球
                                                 </td>
                                                 <td class="ipe-bor">
                                                   全场大/小
                                                 </td>
                                                 <td class="col-more">+</td>
                                                </tr>
                                            </thead>
                                        </table>
                                        <div class="block_table" v-for="(item, key) in matchList" :key="key">
                                            <div class="ipe-table-sc-title">
                                                <span>{{ item.league }}</span>
                                            </div>
                                            <div class="block_table" v-for="(itemx,keyx) in item.gameMatches" :key="keyx">
                                               <div class="table_row ipe-table-bg">
                                                   <div class="col-time in_block">
                                                          {{ itemx.matchTime }}
                                                       </div>
                                                   <div class="col-names live-c in_block col-pad">
                                                           <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft }}‎</span>
                                                           <br>
                                                           <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight }}‎</span>
                                                       </div>
                                                   <div class="col-hdp in_block">
                                                           <div class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2.map0" :key="keyn" v-if="itemn.betType === '2'">
                                                               <a class="sf_odds" @click="handleClickBet(itemx, itemn.ratioH, itemx.teamLeft, '胜负盘')">
                                                                   {{ itemn.ratioH }}
                                                               </a>
                                                               <a class="sf_odds" @click="handleClickBet(itemx, itemn.ratioV, itemx.teamRight, '胜负盘')">
                                                                   {{ itemn.ratioV }}
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div class="col-hdp in_block">
                                                           <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2.map0" :key="keyn" v-if="itemn.betType === '0'">
                                                               <a class="half_50s">{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn.ratioH, itemx.teamLeft, '让球盘')">
                                                                   {{   itemn.ratioH }}
                                                               </a>
                                                               <a class="half_50s">{{ itemn.betV > 0 ? itemn.betV : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn.ratioV, itemx.teamRight, '让球盘')">
                                                                   {{ itemn.ratioV }}
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div class="col-hdp in_block">
                                                           <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2.map0" :key="keyn" v-if="itemn.betType === '1'">
                                                               <a class="half_50s"  >{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn.ratioH, itemx.teamLeft, '大小盘')">
                                                                   {{ itemn.ratioH }}
                                                               </a>
                                                               <a class="half_50s">{{ itemn.betV > 0 ? itemn.betH : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn.ratioV, itemx.teamRight, '大小盘')">
                                                                   {{ itemn.ratioH }}
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div class="col-more in_block">
                                                           <!--<span  class="more">-->
                                                              <!--<span class="sign">+</span>-->
                                                              <!--<span>10</span>-->
                                                           <!--</span>-->
                                                   </div>
                                               </div>
                                               <div class="table_row">
                                                    <ul class="select_map">
                                                        <li v-for="(maps, mkey) in itemx.gameOddMap2"
                                                            :key="mkey" v-if="mkey !== 'map0'" @click="mapSelect = mkey">
                                                            {{ mapListObj[mkey] }}
                                                        </li>
                                                        </ul>
                                                    </div>
                                               <div v-for="(items,keys) in itemx.gameOddMap2" :key="keys">
                                                      <div class="table_row ipe-table-bg" v-if="keys !== 'map0'&& mapSelect === keys">
                                                          <div class="col-time in_block">
                                                              {{ itemx.matchTime }}
                                                          </div>
                                                          <div class="col-names live-c in_block col-pad">
                                                              <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft +' (' + mapListObj[mapSelect] +')'}}‎</span>
                                                              <br>
                                                              <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight +' (' + mapListObj[mapSelect] +')'}}‎</span>
                                                          </div>
                                                          <div class="col-hdp in_block">
                                                              <div class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '2'">
                                                                  <a class="sf_odds" @click="handleClickBet(itemx, itemv.ratioH, itemx.teamLeft, '胜负盘')">
                                                                      {{ itemv.ratioH }}
                                                                  </a>
                                                                  <a class="sf_odds" @click="handleClickBet(itemx, itemv.ratioV, itemx.teamRight, '胜负盘')">
                                                                      {{ itemv.ratioV }}
                                                                  </a>
                                                              </div>
                                                          </div>
                                                          <div class="col-hdp in_block">
                                                             <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '0'">
                                                                 <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                 <a class="odds half_50" @click="handleClickBet(itemx, itemv.ratioH, itemx.teamLeft, '让球盘')">
                                                                     {{  itemv.ratioH }}
                                                                 </a>
                                                                 <a class="half_50s">{{ itemv.betV > 0 ? itemv.betV : '' }}</a>
                                                                 <a class="odds half_50" @click="handleClickBet(itemx, itemv.ratioV, itemx.teamRight, '让球盘')">
                                                                     {{ itemv.ratioV  }}
                                                                 </a>
                                                             </div>
                                                          </div>
                                                          <div class="col-hdp in_block">
                                                             <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '1'">
                                                                 <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                 <a class="odds half_50" @click="handleClickBet(itemx, itemv.ratioH, itemx.teamLeft, '大小盘')">
                                                                     {{ itemv.ratioH }}
                                                                 </a>
                                                                 <a class="half_50s">{{ itemv.betV > 0 ? itemv.betV : '' }}</a>
                                                                 <a class="odds half_50" @click="handleClickBet(itemx, itemv.ratioV, itemx.teamRight, '大小盘')">
                                                                     {{ itemv.ratioH }}
                                                                 </a>
                                                             </div>
                                                          </div>
                                                          <div class="col-more in_block"/>
                                                      </div>
                                                   </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ipe-table ipe-table-pad" v-if="matchList.length === 0">
                                        暂无赛事
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div :class="maxRight ? 'wc-PageView_R max' : 'wc-PageView_R'">
                <p class="wc-PageView_header">
                   <span :class="maxRight ? 'wc-PageView_icon ssuo' : 'wc-PageView_icon'" @click="maxRight = !maxRight" ></span>
                   <span class="wc-PageView_title">投注单</span>
                </p>
                <div class="bet_info" v-if="true">
                    <p class="wc-PageView_header text_r">标准投注单</p>
                    <div class="bet_deleteAll">
                        全部删除
                    </div>
                    <ul class="bet_details">
                        <li>
                            <div class="bet_details_body">
                                <h4 class="bet_details_body_title">{{ betObj.team }}</h4>
                                <p class="bet_details_body_type">{{ betShowObj.pk }}</p>
                                <p class="bet_details_body_event"> {{ betShowObj.lTeam }} <span> VS </span>{{ betShowObj.rTeam }}</p>
                                <p class="bet_details_body_event">@{{ betShowObj.odds }}</p>
                                <p class="bet_details_body_event"><input type="text" placeholder="本金" v-model="betObj.money"> 返还0.00</p>
                                <p class="bet_details_body_event">最高投金</p>
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
                        <input class="all-leagues" type="checkbox" value="1" checked="checked" data-all-sports="29">
                        <label class="icon-all-leagues" for="all-leagues">
                        </label>
                        全选
                    </label>
                </div>
                <div class="s-dialog-body">
                    <label class="league-opt">
                        <input class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
                        韩国- 挑战K联赛
                    </label>
                    <label class="league-opt">
                        <input class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
                        挪威 - 乙级联赛 </label>
                    <label class="league-opt">
                        <input  class="league" type="checkbox"  checked="checked">
                        <label class="icon-league" ></label>
                        芬兰甲级联赛
                    </label>
                    <label class="league-opt">
                    <input  class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
                        冰岛 - 杯赛 </label>
                    <label class="league-opt">
                        <input  class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
                        瑞典 - 南部甲级联赛
                    </label>
                    <label class="league-opt">
                        <input  class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
                        俄罗斯 - 乙级联赛 </label>
                    <label class="league-opt">
                      <input class="league" type="checkbox"  checked="checked">
                      <label class="icon-league"></label>
                       巴西 - 甲级联赛
                     </label>
                    <label class="league-opt">
                        <input  class="league" type="checkbox"  checked="checked">
                        <label class="icon-league"></label>
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
import IconFont from '@/components/IconFont/index.vue';
// import lotteryData from '@/utils/lottery.json'
export default {
    name: 'home',
    components: { IconFont },
    data () {
        return {
            sidebar: true,
            eventType: 2,
            eventBarList: [],
            matchList:[],
            times: null,
            showModal: false,
            showMore: false,
            mapListObj: {
                map1: '地图一',
                map2: '地图二',
                map3: '地图三',
                map4: '地图四',
                map5: '地图五',
                map6: '地图六',
                map7: '地图七',
            },
            mapSelect: 'map1',
            betObj: {
                oddId: '',
                money: '',
                team: ''
            },
            betShowObj: {
                lTeam: '',
                rTeam: '',
                odds: '',
                pk: ''
            },
            maxRight:false
        }
    },
    created () {
        this.handleGetEvents()
        this.handleGetMatches()
    },
    mounted () {
        this.setTime()
        // this.matchList = lotteryData.resultMsg
    },
    methods: {
      ...mapActions([ 'postBetGameS', 'postMatchCountS', 'postMatchesS' ]),
        handleGetEvents () {
          this.eventBarList = []
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
        handleGetMatches (event) {
            this.matchList = []
            let data = {
                rtype: this.eventType
            }
            if (event) {
                if (event === '全部赛事') {
                    data.category = 'ALL'
                } else {
                    data.category = event
                }
            }
            this.postMatchesS(data).then(res => {
                if(res.length !==0) {
                    this.matchList = res
                }
            })
        },
        handleClickBet(tm, od, bt, type) {
          this.betObj.team = bt
          this.betObj.oddId = tm.matchId
          this.betShowObj.odds = od
          this.betShowObj.lTeam = tm.teamLeft
          this.betShowObj.rTeam = tm.teamRight
          this.betShowObj.pk = type
        },
        handleSelectEType (type) {
          if (type === 'jr') {
              this.eventType = 1
          } else if (type === 'zp') {
              this.eventType = 2
          } else {
              this.eventType = 3
          }
          this.handleGetEvents()
          this.handleGetMatches()
        },
        setTime () {
          setInterval(() => {
              let h, m, s
              let timer = new Date()
              h = timer.getHours()
              m = timer.getMinutes() < 10 ? '0' + timer.getMinutes() : timer.getMinutes()
              s = timer.getSeconds() < 10 ? '0' + timer.getSeconds() : timer.getSeconds()
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
        background-color: #212b38;
        min-width: 1023px;
        .hm-HeaderModule_Primary {
            display: table;
            table-layout: fixed;
            width: 100%;
            padding: 0 25px;
            .hm-HeaderModule_Logo {
                display: table-cell;
                width: 135px;
                height: 25px;
                background-position: 0 50%;
                background-repeat: no-repeat;
                background-image: url('../assets/forweb.png');
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
            .h-BigBtn {
                height: 79px;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                border-bottom: 3px solid transparent;
                font-size: 13px;
                color: #e4e4e4;
                line-height: 1;
            }
            .h-BigBtn_Hlight {
                color: #fff;
                border-bottom-color: #0299a0;
            }
        }
        .hm-HeaderModule_Secondary {
            display: flex;
            align-items: center;
            width: 100%;
            height: 30px;
            padding: 0 25px;
            position: relative;
            .hm-HModule_TimeLogin {
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
                .hm-LgDropDS {
                    display: inline-table;
                    position: relative;
                    margin-right: 25px;
                }
                .hm-DropDS_Highlight {
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
        min-height: 88.9vh;
        background-image: url('../assets/bg-main-page-v3 FIN.jpg');
        background-position: center top,50% 113%;
        background-size: auto 1350px,auto;
        background-color: #151f2b;
        background-repeat: no-repeat,no-repeat;
        .wc-InPage_M.wc-PageView_Main {
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
                /*background-color: #474747;*/
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
                        border-radius: 15px;
                        outline: none;
                        border: none;
                        color: #fff;
                        cursor: pointer;
                        box-shadow: 0 2px 7px 0 rgba(0,0,0,.21);
                        background:linear-gradient(180deg,#01fce1 0,#0c6f72 31.87%,#6d1699 90.06%);
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
                .ip-ControlBar_BBarItem {
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
                text-align: center;
                color:yellow;
            }
            .ipn-EventViewN {
                /*background-color: #333;*/
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
            .ipn-EventViewN.ipn_w{
                width: 64px;
                transition: min-width .35s ease-in-out;
            }
            .ipn-Class_Label.ipn-ClassificationButton_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-Class_Label.ipn-ClassificationButton_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-EventV-expanded .ipn-Bar_C.ipn_right{
                background-image: url(../assets/right.svg);
            }
            .ipn-Scroller_Content {
                /*border-right: 1px solid #303030;*/
                max-width: 213px;
            }
            .ipn-ControlBar {
                /*background-color: #3d3d3d;*/
                height: 30px;
                position: relative;
                border-bottom: 1px solid #3d3d3d;
                min-width: 213px;
                transition: border, background-color, min-width .35s ease-in-out;
            }
            .ipn-Bar_C {
                position: absolute;
                right: 12px;
                transition: right .3s, background-color;
                padding: 11px 10px 10px 13px;
                margin-top: 8px;
            }
            .asia-browser .ipn-Bar_C {
                padding-bottom: 6px;
            }
            .ipn-EventV-expanded .ipn-Bar_C {
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
                /*background-color: #333;*/
                border-bottom: 1px solid #274526;
                transition: min-width .4s ease-in-out;
            }
            .ipn-Classification:hover{
                background-color: #0299a0
            }
            .ci-ClassificationIcon {
                display: inline-block;
                background-position: 50% 50%;
                width: 24px;
                height: 20px;
                transition: right .3s;
                padding: 0 2px;
                margin-right: 6px;
            }
            .ipn-Class_Label {
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 75%;
                padding-left: 10px;
                font-size: 14px;
                position: relative;
                bottom: 1px;
                opacity: 1;
                transition: opacity, width 1s ease-in-out;
                -moz-osx-font-smoothing: grayscale;
                color: #01fce1;
            }
            .ipe-EventViewDetail {
                display: table-cell;
                width: 100%;
                background-color: #151f2b;
                opacity: .82;
            }
            .ipe-EventVScroller {
                position: relative;
                border-right: 1px solid #373737;
                height: 100%;
                color: #fff;
            }
            .ipe-Event_ContentContainer {
                overflow-y: scroll;
                overflow-x: hidden;
                max-height: calc(100vh - 135px);
            }
            .ipe-EventVScroller:after {
                content: " ";
                width: 17px;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #151f2b;
                opacity: 1;
                transition-property: opacity;
                transition-duration: .35s;
                pointer-events: none;
            }
            .ipe-table{
                width: 100%;
                text-align: center;
                .block_table {
                   width: 100%;
                }
                .in_block {
                    display: table-cell;
                }
                .fs td, .col-pad {
                    padding: 8px 0;
                }
                .fs td {
                    font-weight: 700;
                }
                .ipe-bor,.col-hdp{
                    width: 22%;
                }
                thead td{
                    /*background-color: #48504e;*/
                }
                .ipe-table-sc-title{
                    padding: 5px 0 5px 10px;
                    text-align: left;
                    background-color: #0299a0;
                }
                .ipe-table-sc-table{
                    width: 100%;
                }
                .col-names{
                    width: 23%;
                }
                .col-time{
                    width: 8%;
                    border-right: 1px solid #999;
                    border-bottom: 1px solid #999;
                }
                .ipe-table-bg{
                    /*background-color: #7b7b7b;*/
                    display: table;
                    width: 100%;
                }

                .sf_odds{
                 display: inline-block;
                 width: 100%;
                }
                .col_body{
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 10px;
                }
                a.sf_odds:hover,a.half_50:hover{
                    background-color: #0299a0;
                }
                .half_50,.half_50s{
                    display: inline-block;
                    width: 50%;
                }
                .half_50s {
                    color: #fde972;
                }
                .half_50,.sf_odds,.half_50s{
                    padding: 3px 0;
                }
                .col-more {
                    border-bottom: 1px solid #999;
                    width: 3%;
                }
                .more {
                    background: #0b1d3b;
                    border: 1px solid #152331;
                    border-radius: 2px;
                    color: white;
                    display: inline-block;
                    width: 32px;
                    cursor: pointer;
                }
                .col-hdp,.col-names,thead td,.ipe-bor{
                    border-right: 1px solid #999;
                    border-bottom: 1px solid #999;
                }
                .select_map {
                     text-align: left;
                     /*background-color: #484040;*/
                    border-bottom: 1px solid #999;
                      li {
                          display: inline-block;
                          padding: 5px 10px;
                          border-radius: 10px;
                          background-color: #0299a0;
                          cursor: pointer;
                          margin: 6px;
                      }
                      li:hover{
                          background-color: #116c4f;
                      }
                }
            }
            .ipe-table-pad {
                padding: 50px;
            }
            .events{
                width: 100%;
                td span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 1px 0;
                    min-height: 14px;
                    line-height: 14px;
                }
            }
            .ipn-EventV-s {
                overflow: hidden;
                width: 64px;
                padding-right: 14px;
            }
        }
    }
    .wc-PageView_R {
        flex: 0 0 auto;
        /*background-color: #474747;*/
        position: relative;
        transition: width .4s ease-in-out;
        width: 300px;
        max-width: 592px;
        .wc-PageView_header{
            height: 28px;
            line-height: 28px;
            /*border-top:1px solid #4d4d4d;*/
            /*background-color:#474747;*/
            text-align: center;
            color: #ffdf1b;
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
        }
        .text_r {
            border-top:1px solid #179970;
            background-color: #0299a0;
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
            padding-left: 25px;
            background-color: #bbb;
            .bet_details_body_title{
                color:#333;
                font-size: 13px;
                padding: 3px 0;
            }
            .bet_details_body_event{
                padding: 2px 0;
                color: #666;
            }
        }
    }
    .wc-PageView_R.max {
        width: 500px;
        transition: width .4s ease-in-out;
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