<template>
    <div class="home">
        <div class="hm-HeaderModule ">
            <div :class="headerHide ? 'hm-HeadModule_Primary' : 'hm-HeadModule_Primary sH'">
                <a :class="headerHide ? 'hm-HeaderModule_Logo' : 'hm-HeaderModule_Logo H'"/>
                <span :class="headerHide ? 'hm-HeaderModule_title': 'hm-HeaderModule_title H'">{{$t('lang.home.header_title')}}</span>
                <div :class="headerHide ? 'hm-BigButtons' : 'hm-BigButtons H'">
                    <nav class="hm-BigButtons_Inner ">
                        <a :class="eventType === 1 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('jr')">{{$t('lang.home.header_jr')}}</a>
                        <a :class="eventType === 2 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('zp')">{{$t('lang.home.header_zp')}}</a>
                        <a :class="eventType === 3 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('gq')">{{$t('lang.home.header_gq')}}</a>
                        <span class="h-BigBtn hideBtn" @click="headerHide = !headerHide"></span>
                    </nav>
                </div>
                <div :class="headerHide ? 'hm_L' : 'hm_L H'">
                    <div class="hm_L_ch"  @click="handleSelectLang()">
                        <span :class="selectLang === 'EN' ? 'hm_L_EN' : 'hm_L_CN'"/>
                        <span>{{ selectLang }}</span>
                        <span class="hm_L_more"/>
                    </div>
                    <div :class="selectLangShow ? 'hm_L_sl' : 'hm_L_sl H'">
                        <p class="hm_L_p" @click="handleSelectLang('EN')" >
                            <span class="hm_L_EN"/>
                            <span class="hm_L_lang">English</span>
                        </p>
                        <p class="hm_L_p" @click="handleSelectLang('CN')">
                            <span class="hm_L_CN"/>
                            <span class="hm_L_lang">简体中文</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="hm-HeadModule_Sd">
                <div :class="!headerHide ? 'hm-HModule_TimeLogin' : 'hm-HModule_TimeLogin H' ">
                    <time class="hm-Clock ">
                        <span>{{ times }}</span>
                        GMT+8
                    </time>
                </div>
                <nav v-if="!headerHide" class="hm-BigButtons_Inner ">
                    <a :class="eventType === 1 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('jr')">{{$t('lang.home.header_jr')}}</a>
                    <a :class="eventType === 2 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('zp')">{{$t('lang.home.header_zp')}}</a>
                    <a :class="eventType === 3 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('gq')">{{$t('lang.home.header_gq')}}</a>
                    <span class="h-BigBtn hideBtn showBtn" @click="headerHide = !headerHide"></span>
                </nav>
                <div class="hm-HeaderModule_Menus ">
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight" @click="handleOpenNewPage('tz')">{{$t('lang.home.header_wdtz')}}</span>
                    </div>
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight" @click="handleOpenNewPage('zm')">{{$t('lang.home.header_zm')}}</span>
                    </div>
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight" @click="handleOpenNewPage('sg')">{{$t('lang.home.header_ssjg')}}</span>
                    </div>
                    <div class="hm-LgDropDS  ">
                        <span class="hm-DropDS_Highlight" @click="handleOpenNewPage('gz')">{{$t('lang.home.header_gzytk')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="headerHide ? 'wc-PageView' : 'wc-PageView wc-PageView_Mh'">
            <div class="wc-PageView_Main wc-InPage_M">
                <div class="ip-ControlBar ">
                    <div class="ip-ControlBar_BBarItem ">
                        <span>{{ eventList[eventType] }}</span>
                        {{' / ' + selectEvent }}
                    </div>
                    <div class="ip-ControlBar_msg">
                        公告：
                        <marquee class="ip-msg" behavior="scroll" direction="left" @click="handleOpenNewPage('gg')" onmouseover=this.stop() onmouseout=this.start()>
                            <ul>
                              <li class="scope" v-for="(msgItems, key) in msgList" :key="key">
                                {{ msgItems.contentCn }}
                              </li>
                            </ul>
                        </marquee>
                    </div>
                    <div @click="handleGetLeagues()" class="ip-ControlBar-btn">
                        <button :disabled="eventType === 3" class="o-button">选择联赛</button>
                    </div>
                </div>
                <div class="ipe-EcventViewView ">
                    <div :class="sidebar?'ipn-EventViewN':'ipn-EventViewN ipn_w'">
                        <div :class="sidebar ? ' ipn-Scroller_Content' : 'ipn-Scroller_Content ipn-EventV-s'">
                                <div :class="sidebar ?'ipn-ControlBar ' :'ipn-ControlBar ipn-closed'">
                                    <span :class="sidebar?'ipn-Bar_C':'ipn-Bar_C ipn_right'" @click="sidebar = !sidebar"></span>
                                </div>
                                <div class="balances" v-if="balance && sidebar">
                                     <p class="account">
                                         <span>可用资金:</span>
                                         <span @click="handleRefUserInfo" class="ref"/>
                                     </p>
                                     <p class="account my">CNY: {{ balance }}</p>
                                </div>
                                <div class="ipn-EventViewN_scroll">
                                    <div  :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-closed'" v-for="(item,key) in eventBarList" :key="key"
                                          v-if="eventType !== 3"   @click="handleGetMatches(item.category)">
                                        <span class="ipn-Classification-num">
                                          <img class="ci-ClassificationIcon" v-if="item.category !== 'CS:GO' && item.category !== '全部赛事'" :src="require('../assets/png/'+item.category+'.png')" alt="">
                                          <img class="ci-ClassificationIcon" v-if="item.category === 'CS:GO'" src="../assets/png/CSGO.png">
                                          <img class="ci-ClassificationIcon" v-if="item.category === '全部赛事'" src="../assets/png/ALL.png">
                                          <span class="ipn-Class-num">{{ item.count }}</span>
                                        </span>
                                        <span :class="sidebar ? 'ipn-Class_Label':'ipn-ClassftnBtn_cls ipn-Class_Label'">
                                        {{ item.category }}
                                        </span>
                                    </div>
                                    <div v-if="eventType === 3 " class="ipn-EventViewN_rollB" v-for="(rItem,rkey) in rollBallList" :key="rkey">
                                        <div  :class="sidebar ? 'ipn-Classification_gq' :'ipn-Classification_gq ipn-closed'" @click="handleIPWHide($event,'hd')">
                                             <span class="ipn-Classification-num">
                                               <img class="ci-ClassificationIcon" v-if="rkey !== 'CS:GO' && rkey !== '全部赛事'" :src="require('../assets/png/'+rkey+'.png')" alt="">
                                               <img class="ci-ClassificationIcon" v-if="rkey === 'CS:GO'" src="../assets/png/CSGO.png">
                                             </span>
                                             <span :class="sidebar ? 'ipn-Class_Label':'ipn-ClassftnBtn_cls ipn-Class_Label'">
                                               {{ rkey }}
                                             </span>
                                        </div>
                                        <div class="ipn_body" v-for="(rItemx,rkeyx) in rItem" :key="rkeyx">
                                            <div :class="sidebar ?'ipn-EventViewN_rollBd' : 'ipn-EventViewN_rollBd hide'">
                                                <div class="ipn-EventViewN_event" v-for="(rItems,rkeys) in rItemx.gameMatches" :key="rkeys">
                                                    <p :class="sidebar ? 'ipn-EventViewN_row ipw_hd' : 'ipn-EventViewN_row ipw_h ipw_hd'" @click="handleIPWHide($event)">
                                                        {{ rItemx.league }}
                                                    </p>
                                                    <div @click="handleGetRollMatchInfo(rItems)">
                                                        <p :class="sidebar ? 'ipn-EventViewN_row' : 'ipn-EventViewN_row ipw_h'">
                                                            <span class="team">{{ rItems.teamLeft }}</span>
                                                            <span> {{ rItems.scoreLeft + ' - ' + rItems.scoreRight }}</span>
                                                        </p>
                                                        <p :class="sidebar ? 'ipn-EventViewN_row' : 'ipn-EventViewN_row ipw_h'">
                                                            <span class="team">{{ rItems.teamRight }}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="ipe-EventViewDetail ">
                        <div class="ipe-EventVScroller ">
                            <div class="ipe-Event_ContentContainer ">
                                <div class="ipe-table" v-if="matchList.length !== 0">
                                    <div class="live_frame" v-if="eventType === 3 && scoreShow">
                                        <iframe v-if="matchText" :src="matchText"  class="frame" frameborder="0"></iframe>
                                        <div class="frame_child" v-if="!matchText">暂无比分直播</div>
                                        <!--<iframe src="http://www.1zplay.com/h5app/score/5bcdf21694d802261e19d19f/" scrolling="no"  class="frame" frameborder="0"></iframe>-->
                                    </div>
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
                                            <td class="col-more">
                                                <span class="cur" v-if="eventType === 3" @click="scoreShow = !scoreShow"> {{ scoreShow ? '隐藏比分' : '显示比分'}} </span>
                                                <span v-if="eventType !== 3">+</span>
                                            </td>
                                          </tr>
                                        </thead>
                                    </table>
                                    <div class="block_table" v-for="(item, key) in matchList" :key="key" v-if="eventType !==3">
                                        <div @click="handleHideNext($event)" class="ipe-table-sc-title">
                                                <span>{{ item.category + ' - ' + item.league }}</span>
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
                                                           <div class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '2'">
                                                               <a class="sf_odds" @click="handleClickBet(itemx, itemn, itemx.teamLeft, '1')">
                                                                   {{ itemn.ratioH }}
                                                                   <span :class="itemn.changs_h"/>
                                                               </a>
                                                               <a class="sf_odds" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                                   {{ itemn.ratioV }}
                                                                   <span :class="itemn.changs_v"/>
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div class="col-hdp in_block">
                                                           <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '0'">
                                                               <a class="half_50s">{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamLeft,'1')">
                                                                   {{   itemn.ratioH }}
                                                                   <span :class="itemn.changs_h"/>
                                                               </a>
                                                               <a class="half_50s">{{ itemn.betV > 0 ? itemn.betV : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                                   {{ itemn.ratioV }}
                                                                   <span :class="itemn.changs_v"/>
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div class="col-hdp in_block">
                                                           <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '1'">
                                                               <a class="half_50s"  >{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamLeft, '1')">
                                                                   {{ itemn.ratioH }}
                                                                   <span :class="itemn.changs_h"/>
                                                               </a>
                                                               <a class="half_50s">{{ itemn.ratioV ? 'u' : '' }}</a>
                                                               <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                                   {{ itemn.ratioV }}
                                                                   <span :class="itemn.changs_v"/>
                                                               </a>
                                                           </div>
                                                       </div>
                                                   <div @click="handleHideNext($event,'2')" class="col-more in_block">
                                                       <span class="col-more_icon" v-if="itemx.gameOddMap2[1]"></span>
                                                   </div>
                                               </div>
                                               <div class="map_body">
                                                    <div class="table_row select_table">
                                                        <ul class="select_map">
                                                            <li v-for="(maps, mkey) in itemx.gameOddMap2" :data-v="mkey"
                                                                :key="mkey" v-if="mkey !== '0'" @click="handleSelectMap($event, mkey, itemx)">
                                                                {{ mapListObj[mkey] }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div v-for="(items,keys) in itemx.gameOddMap2" :key="keys" :data-key="keys" class="data-key">
                                                        <div class="table_row ipe-table-bg" v-if="keys !== 0">
                                                            <div class="col-time in_block reBor"/>
                                                            <div class="col-names  live-c in_block col-pad">
                                                                <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft }}‎</span>
                                                                <br>
                                                                <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight }}‎</span>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '2'">
                                                                    <a class="sf_odds" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                        {{ itemv.ratioH }}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="sf_odds" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                        {{ itemv.ratioV }}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '0'">
                                                                    <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                        {{  itemv.ratioH }}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s">{{ itemv.betV > 0 ? itemv.betV : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                        {{ itemv.ratioV  }}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '1'">
                                                                    <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                        {{ itemv.ratioH }}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s">{{ itemv.ratioV ? 'u' : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                        {{ itemv.ratioV }}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-more in_block reBor"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="block_table" v-if="eventType === 3">
                                        <div class="block_table" v-for="(itemx,keyx) in matchList" :key="keyx">
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
                                                    <div class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '2'">
                                                        <a class="sf_odds" @click="handleClickBet(itemx, itemn, itemx.teamLeft, '1')">
                                                            {{ itemn.ratioH }}
                                                            <span :class="itemn.changs_h"/>
                                                        </a>
                                                        <a class="sf_odds" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                            {{ itemn.ratioV }}
                                                            <span :class="itemn.changs_v"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-hdp in_block">
                                                    <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '0'">
                                                        <a class="half_50s">{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                        <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamLeft,'1')">
                                                            {{   itemn.ratioH }}
                                                            <span :class="itemn.changs_h"/>
                                                        </a>
                                                        <a class="half_50s">{{ itemn.betV > 0 ? itemn.betV : '' }}</a>
                                                        <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                            {{ itemn.ratioV }}
                                                            <span :class="itemn.changs_v"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-hdp in_block">
                                                    <div  class="col_body" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '1'">
                                                        <a class="half_50s"  >{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                        <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamLeft, '1')">
                                                            {{ itemn.ratioH }}
                                                            <span :class="itemn.changs_h"/>
                                                        </a>
                                                        <a class="half_50s">{{ itemn.ratioV ? 'u' : '' }}</a>
                                                        <a class="odds half_50" @click="handleClickBet(itemx, itemn, itemx.teamRight, '2')">
                                                            {{ itemn.ratioV }}
                                                            <span :class="itemn.changs_v"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div @click="handleHideNext($event,'2')" class="col-more in_block">
                                                    <span class="col-more_icon" v-if="itemx.gameOddMap2[1]"></span>
                                                </div>
                                            </div>
                                            <div class="map_body">
                                                <div v-for="(items,keys) in itemx.gameOddMap2" :key="keys" :data-key="keys" v-if="keys > 0">
                                                    <div class="table_row ipe-table-bg" v-if="keys !== 0">
                                                        <div class="col-time in_block reBor"/>
                                                        <div class="col-names  live-c in_block col-pad">
                                                            <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft }}‎</span>
                                                            <br>
                                                            <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight }}‎</span>
                                                        </div>
                                                        <div class="col-hdp in_block">
                                                            <div class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '2'">
                                                                <a class="sf_odds" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                    {{ itemv.ratioH }}
                                                                    <span :class="itemv.changs_h"/>
                                                                </a>
                                                                <a class="sf_odds" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                    {{ itemv.ratioV }}
                                                                    <span :class="itemv.changs_v"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-hdp in_block">
                                                            <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '0'">
                                                                <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                    {{  itemv.ratioH }}
                                                                    <span :class="itemv.changs_h"/>
                                                                </a>
                                                                <a class="half_50s">{{ itemv.betV > 0 ? itemv.betV : '' }}</a>
                                                                <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                    {{ itemv.ratioV  }}
                                                                    <span :class="itemv.changs_v"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-hdp in_block">
                                                            <div  class="col_body" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '1'">
                                                                <a class="half_50s">{{ itemv.betH > 0 ? itemv.betH : '' }}</a>
                                                                <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamLeft, '1')">
                                                                    {{ itemv.ratioH }}
                                                                    <span :class="itemv.changs_h"/>
                                                                </a>
                                                                <a class="half_50s">{{ itemv.ratioV ? 'u' : '' }}</a>
                                                                <a class="odds half_50" @click="handleClickBet(itemx, itemv, itemx.teamRight, '2')">
                                                                    {{ itemv.ratioV }}
                                                                    <span :class="itemv.changs_v"/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-more in_block reBor"/>
                                                    </div>
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
                <p class="wc-PageView_header" v-if="eventType === 3">
                   <span :class="maxRight ? 'wc-PageView_icon ssuo' : 'wc-PageView_icon'" @click="maxRight = !maxRight" ></span>
                   <span class="hm-DropDS_Highlight wc-PageView_header_mr" @click="handleSelectLive('sp')">视频直播</span>
                   <span class="hm-DropDS_Highlight wc-PageView_header_mr" @click="handleSelectLive('bf')">比分直播</span>
                </p>
                <div class="wc-PageView_i_v" v-if="eventType === 3">
                    <div class="frame" v-if="selectLive === 'bf'">
                        <iframe v-if="matchText" :src="matchText"  class="frame" frameborder="0"></iframe>
                        <div class="frame_child" v-if="!matchText">暂无比分直播</div>
                    </div>
                    <div class="frame" v-if="selectLive === 'sp'">
                        <div v-html="liveText"></div>
                        <div class="frame_child" v-if="!liveText">暂无视频直播</div>
                    </div>
                </div>
                <p class="wc-PageView_header">
                    <span v-if="eventType !== 3" :class="maxRight ? 'wc-PageView_icon ssuo' : 'wc-PageView_icon'" @click="maxRight = !maxRight" ></span>
                    <span class="wc-PageView_title">投注单</span>
                </p>
                <div :class="eventType === 3 ? 'wc-PageView_R_item_m' : 'wc-PageView_R_item'">
                    <div class="bet_info bet_In" v-if="betBoxShow">
                        <p class="wc-PageView_header text_r">标准投注单</p>
                        <ul class="bet_details">
                            <li>
                                <div class="bet_details_body">
                                    <p class="bet_count_down bet_cd_r">
                                        <span class="num">{{ countDown }}</span>
                                        <button class="o-button" @click="handleCountDown('ref')">刷新</button>
                                    </p>
                                    <h3 class="bet_details_body_title">{{ betShowObj.team }}</h3>
                                    <p class="bet_details_body_type">{{ betShowObj.pk }}</p>
                                    <p class="bet_details_body_event"> {{ betShowObj.lTeam }} <span> VS </span>{{ betShowObj.rTeam }}</p>
                                    <p class="bet_details_body_event"><b>@</b>{{ betShowObj.odds }}</p>
                                    <p class="bet_details_body_event"><input type="text" placeholder="本金" class="bet_input" v-model="betMoney"></p>
                                    <p class="bet_details_body_event">
                                        <input type="checkbox" id="accept_new_odds" v-model="oddsChoose">
                                        <label for="accept_new_odds">是否接受最新赔率</label>
                                    </p>
                                    <p class="bet_details_body_event">赢取金额: {{ winMoney }}</p>
                                    <p class="bet_details_body_event">最低投注: {{ betLimit.minStake }}</p>
                                    <p class="bet_details_body_event">最高投注: {{ betLimit.maxStake }}</p>
                                    <p class="bet_details_body_event">
                                        <button class="wager_btn" @click="handleClickSBet()">确认</button>
                                        <button class="wager_btn" @click="handleClickSBet('cl')">取消</button>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="bet_prompt" v-if="!betBoxShow">
                        点击赔率以添加选项
                    </div>
                    <div class="bet_info" v-if="pendBetting">
                        <p class="wc-PageView_header text_r">待清算注单</p>
                        <ul class="bet_details" >
                            <li>
                                <div class="bet_details_bodys">
                                    <div class="bet even  open ">
                                        <div class="wager-id-date wager_f" v-if="pendBetObj.wagerId && pendBetObj.betTime">
                                            <span class="wager-id">{{ pendBetObj.wagerId }}</span>
                                            <span class="wager-date">{{ pendBetObj.betTime }}</span>
                                        </div>
                                        <div class="wager-id-date" v-if="pendBetObj.date && pendBetObj.category">
                                            <span class="event-date">{{ pendBetObj.date }}</span>
                                            <br>
                                            <span class="league">{{ pendBetObj.category }}</span>
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
                                            <span class="of">(香港赔率)</span>
                                        </div>
                                        <div class="wager-id-date" v-if="pendBetObj.toWin ">
                                            <span>可赢 :</span>
                                            <span class="stake">{{ pendBetObj.toWin }}</span>
                                        </div>
                                        <div class="wager-id-date" v-if="pendBetObj.betAmount">
                                            <span>投注金额 :</span>
                                            <span class="stake">{{ pendBetObj.betAmount }}</span>
                                            <span class="status OPEN">进行中</span>
                                        </div>
                                        <div class="wager-id-date">
                                            <button class="wager_btn" @click="handleOpenNewPage('tz')">查看更多</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <modal :modalShow="sendChild" @listenFromChild="handleFromChild"/>
        <!--<div class="model" v-if="showLogin">-->
            <!--<div class="models" @click="showLogin = false"></div>-->
            <!--<div class="league-select">-->
                <!--<div class="s-dialog-header">-->
                    <!--<i class="fa icon league-header"></i>-->
                    <!--<h4>请输入</h4>-->
                <!--</div>-->
                <!--<div style="padding: 9% 25%;">-->
                    <!--<div style="padding: 10px 0">-->
                        <!--UserName: <input type="text" v-model="userObj.username">-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--Password: <input type="password" v-model="userObj.password">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="s-dialog-footer">-->
                    <!--<button class="o-button" @click="showLogin = false">取消</button>-->
                    <!--<button class="o-button" @click="handleUserLogin()">登录</button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <layer ref="layer" @fromDiaoLog="handleBetSelect"></layer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import modal from '@/components/modal'
import Mixin from '@/utils/Mixin'
import layer from '@/components/diaoLog'

export default {
    name: 'home',
    mixins: [Mixin],
    components: {
        modal,
        layer
    },
    data () {
        return {
            sidebar: true,
            eventType: 2,
            eventBarList: [],
            matchList:[],
            times: null,
            showMore: false,
            // showLogin: true,
            betBoxShow: false,
            pendBetting: false,
            selectLangShow: false,
            mapListObj: {
                1: 'MAP 1',
                2: 'MAP 2',
                3: 'MAP 3',
                4: 'MAP 4',
                5: 'MAP 5',
                6: 'MAP 6',
                7: 'MAP 7',
            },
            betObj: {
                oddsId: '',
                money: '',
                team: '',
                status: 1
            },
            betShowObj: {
                lTeam: '',
                rTeam: '',
                team: '',
                odds: '',
                pk: ''
            },
            maxRight: true,
            headerHide: true,
            eventList: [ '','今日赛事', '早盘赛事', '滚球赛事' ],
            selectEvent: '全部赛事',
            betMoney: '',
            winMoney: '',
            userObj: {
                username: '',
                password: ''
            },
            pendBetObj: {},
            betLimit: {},
            balance: null,
            selectLang: 'CN',
            sendChild: {
                showModal: false,
                leaguesList: []
            },
            selectLgList: [],
            selectLive: 'bf',
            scoreShow: false,
            countDown: 10,
            countDownFn : null,
            rollBallList: {},
            liveText: null,
            matchText: null,
            socket: null,
            oddsChoose: true
        }
    },
    created () {
        this.handleCreate()
    },
    mounted () {
        this.setTime()
        this.handleWebSocket()
    },
    beforeDestroy() {
        clearInterval(this.countDownFn)
    },
    methods: {
      ...mapActions([ 'postBetGameS', 'postMatchCountS', 'postMatchesS', 'postInitESportBulletinS',
          'postUserLoginS', 'postMultiTicketS', 'postRollBallMatchesS', 'postMatchInfoS', 'postUserInfoS' ]),
        handleCreate () {
            this.handleGetEvents()
            this.handleGetMatches()
        },
        handleGetEvents () {
          this.eventBarList = []
          let data = {
             rtype: this.eventType
          }
          if (this.eventType === 3) {
              return false
          }
          this.postMatchCountS(data).then(res => {
              if(res.length !== 0 && res.code !== 500) {
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
        handleGetMatches (event, lid) {
            this.matchList = []
            let data = {
                rtype: this.eventType
            }
            if (lid) {
                data.leagueIds = lid
            }
            if (event) {
                this.selectEvent = event
                if (event !== '全部赛事') {
                    data.category = event
                }
            }
            this.postMatchesS(data).then(res => {
                if(res.length !==0 && !res.code) {
                    this.matchList = res
                    this.matchList.forEach(arr => {
                        arr.gameMatches.forEach(arrL => {
                            Object.keys(arrL.gameOddMap2).forEach(arrS => {
                                arrL.gameOddMap2[arrS].forEach(arrE => {
                                    arrE.changs_h = false
                                    arrE.changs_v = false
                                })
                            })
                        })
                    })
                    this.handleShowFirst()
                }
            })
        },
        handleGetRollMatches () {
            this.matchList = []
            this.rollBallList = []
            let data = {
                rtype: 3
            }
            this.postRollBallMatchesS(data).then(res => {
                if (res.length !== 0 && !res.code) {
                    this.rollBallList = res
                    this.handleGetRollMatchInfo(this.rollBallList[0].gameMatches[0])
                    let list = {},name = res[0].category,arrs = []
                    this.rollBallList.forEach((arr,index) => {
                         if (name === this.rollBallList[index].category) {
                             arrs.push(arr)
                         } else {
                             arrs = []
                             arrs.push(arr)
                             name = this.rollBallList[index].category
                         }
                         list[name] = arrs
                    })
                    this.rollBallList = list
                }
            })
        },
        handleGetRollMatchInfo (item) {
           this.liveText = null
           this.matchText = null
           this.matchList = []
           let data = {
               gid: item.gid
           }
           this.postMatchInfoS(data).then(res => {
               if(res.length !==0 && !res.code) {
                   this.matchList = res
                   this.matchList.forEach(arr => {
                       for (let key in arr.gameOddMap2){
                           arr.gameOddMap2[key].forEach(arrC => {
                               arrC.changs_h = false
                               arrC.changs_v = false
                           })
                       }
                   })
                   if (this.matchList[0].liveUrl|| this.matchList[0].matchLive) {
                           this.liveText = this.matchList[0].liveUrl
                           this.matchText = this.matchList[0].matchLive
                   }
               }
           })
        },
        handleClickBet(tm, od, bt, nt) {
          clearInterval(this.countDownFn)
          this.countDown = 10
          this.betMoney = null
          this.betShowObj.team = bt
          this.betObj.team = nt
          this.betObj.oddsId = od.id
          this.betShowObj.lTeam = tm.teamLeft
          this.betShowObj.rTeam = tm.teamRight
          if (nt === '1') {
              this.betShowObj.odds = od.ratioH
          } else {
              this.betShowObj.odds = od.ratioV
          }
          this.handleRefOdds()
          this.handleCountDown()
        },
        handleSelectEType (type) {
          if (type === 'jr') {
              this.eventType = 1
              this.handleGetMatches()
          } else if (type === 'zp') {
              this.eventType = 2
              this.handleGetMatches()
          } else {
              this.eventType = 3
              this.handleGetRollMatches()
          }
          this.handleGetEvents()
          this.selectEvent = '全部赛事'
        },
        handleClickSBet (cl) {
          this.pendBetObj = {}
          if (cl) {
              this.betObj = {
                   oddsId: '',
                   money: '',
                   team: ''
              }
             clearInterval(this.countDownFn)
             this.betBoxShow = false
             this.countDown = 10
             return
          }
          this.betObj.TOKEN = sessionStorage.getItem('Tk')
          if (this.betObj.money < this.betLimit.minStake || this.betObj.money > this.betLimit.maxStake) {
              this.$refs.layer.open('注意投注限额',true,false,2000)
              this.betMoney = null
              return false
          }
          if (this.oddsChoose) {
              this.betObj.status = 1
          } else {
              this.betObj.status = 0
              this.betObj.odds = this.betShowObj.odds
          }
          this.postBetGameS(this.betObj).then(res => {
              clearInterval(this.countDownFn)
              if (res && !res.code) {
                this.$refs.layer.open('下注成功',true,false,1000)
                this.betBoxShow = false
                this.pendBetting = true
                this.pendBetObj = res
                this.pendBetObj.betTime = this.formattingTime(this.pendBetObj.betTime,'ss')
                this.pendBetObj.date = this.formattingTime(this.pendBetObj.betTime,'dd')
                this.oddsChoose = true
                this.handleRefUserInfo()
              } else {
                  this.$refs.layer.open('是否接受最新赔率',true,true)
              }
          }).catch(err => {
              this.$refs.layer.open(err.msg,true,false,2000)
          })
        },
        handleBetSelect(data) {
          if (data) {
              this.oddsChoose = true
              this.handleClickSBet()
          } else {
              this.handleClickSBet('cl')
          }
        },
        handleSelectMap (e, key, item) {
          let btnList = e.currentTarget.parentElement.querySelectorAll('li')
          btnList.forEach(arr => {
              arr.classList.remove("BtnHl")
          })
          e.currentTarget.classList.add("BtnHl")
          let mapList = e.currentTarget.parentElement.parentElement.parentElement.querySelectorAll('.data-key')
          mapList.forEach(arr => {
              let Tl = arr.querySelector('.sel')
              let Tr = arr.querySelector('.favSel')
              Tl.innerHTML = ''
              Tr.innerHTML = ''
              if (key) {
                  arr.style.display = 'none'
                  if (arr.getAttribute('data-key') === key) {
                      arr.style.display = 'block'
                      Tl.innerHTML = `${item.teamLeft} (${this.mapListObj[key]})`
                      Tr.innerHTML = `${item.teamRight} (${this.mapListObj[key]})`
                  }
              }
          })
        },
        // handleUserLogin () {
        //     this.postUserLoginS(this.userObj).then( res => {
        //         if (res) {
        //             this.showLogin = false
        //             alert('登录成功')
        //             sessionStorage.setItem('Tk', res.token)
        //             this.handleGetBulletin()
        //             this.balance = res.amount
        //             this.handleWebSocket()
        //         }
        //     })
        // },
        handleOpenNewPage (type) {
            let LUrl = null
            if (type === 'tz') {
                LUrl = window.location.origin + '/betRecord'
            } else if (type === 'zm') {
                LUrl = window.location.origin + '/statements'
            } else if (type === 'sg'){
                LUrl = window.location.origin + '/results'
            } else  if (type === 'gz') {
                LUrl = window.location.origin + '/rulesTerms'
            } else {
                LUrl = window.location.origin + '/announcement'
            }
            window.open(LUrl, '_blank', 'height=700, width=1200, top=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no')
        },
        handleSelectLang (e) {
          if (e) {
            this.selectLang = e
            this.selectLangShow = false
          } else {
            this.selectLangShow = !this.selectLangShow
          }

        },
        handleFromChild (data) {
            let slg = null
            this.sendChild.showModal = data.mShow
            if (data.selectLeagues.length !== 0) {
                this.selectLgList = data.selectLeagues
                slg = this.selectLgList.join(',')
                this.handleGetMatches('', slg)
            }
        },
        handleHideNext (e, type) {
          let nextSibling  = null
          if (type) {
              let target = e.currentTarget
              nextSibling  = e.currentTarget.parentElement.nextElementSibling
              if (nextSibling.style.display === 'none') {
                  nextSibling.style.display = 'block'
                  if (target.children[0]) {
                      target.children[0].classList.remove('col-more_icon_h')
                  }
              } else {
                  nextSibling.style.display = 'none'
                  if (target.children[0]) {
                      target.children[0].classList.add('col-more_icon_h')
                  }
              }
            } else {
               let siblingList  = e.currentTarget.parentElement.querySelectorAll('.block_table')
               siblingList.forEach(arr => {
                   if (arr.style.display === 'none') {
                       arr.style.display = 'block'
                    } else {
                       arr.style.display = 'none'
                   }
               })
           }

        },
        handleSelectLive (type) {
            if (type === 'bf') {
                this.selectLive = 'bf'
            } else {
                this.selectLive = 'sp'
            }
        },
        handleRefOdds () {
            if (this.betObj.oddsId && this.betObj.team) {
                let data = {
                    oddsId: this.betObj.oddsId,
                    team: this.betObj.team
                }
                this.postMultiTicketS(data).then(res => {
                    if (res) {
                        this.betBoxShow = true
                        this.betLimit = res
                        this.betShowObj.pk = res.oddsName
                        this.betShowObj.odds = res.odds
                    }
                })
            }
        },
        handleCountDown (type) {
          if (type) {
              this.countDown = 10
              this.handleRefOdds()
          } else {
              this.countDownFn = setInterval(() => {
                  this.countDown = this.countDown - 1
                  if (this.countDown < 1) {
                      this.countDown = 10
                      this.handleRefOdds()
                  }
              },1000)
          }
        },
        handleIPWHide(e,type) {
          if (type) {
              let srcParent = e.currentTarget.parentElement
              let ipw_List = srcParent.querySelectorAll('.ipn_body')
              ipw_List.forEach(arr => {
                  if (arr.style.display === 'none') {
                      arr.style.display = 'block'
                  } else {
                      arr.style.display = 'none'
                  }
              })
          } else {
              let $src = e.currentTarget.nextElementSibling
              if ($src.style.display === 'none') {
                  $src.style.display = 'block'
              } else {
                  $src.style.display = 'none'
              }
          }
        },
        handleRefUserInfo () {
            this.postUserInfoS().then(res => {
               if(res && !res.code) {
                   this.balance = res.amount
               }
            })
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
        },
        handleUpdateOdds (item) {
          if (item.isRolling) {
              this.matchList.forEach(arr => {
                  for (let key in arr.gameOddMap2){
                      arr.gameOddMap2[key].forEach(arrC => {
                          if (Number(arrC.id) === Number(item.oddId)){
                              arrC.ratioH > item.oddH ? arrC.changs_h = 'odds_down' : arrC.changs_h = 'odds_up'
                              arrC.ratioV > item.oddV ? arrC.changs_v = 'odds_down' : arrC.changs_v = 'odds_up'
                              arrC.ratioH = item.oddH
                              arrC.ratioV = item.oddV
                              setTimeout(()=> {
                                  arrC.changs_h = false
                                  arrC.changs_v = false
                              },5000)
                          }
                      })
                  }
              })
          } else {
              this.matchList.forEach(arr => {
                  arr.gameMatches.forEach(arrL => {
                      Object.keys(arrL.gameOddMap2).forEach(arrS => {
                          arrL.gameOddMap2[arrS].forEach(arrE => {
                              if (Number(arrE.id) === Number(item.oddId)){
                                  arrE.ratioH > item.oddH ? arrE.changs_h = 'odds_down' : arrE.changs_h = 'odds_up'
                                  arrE.ratioV > item.oddV ? arrE.changs_v = 'odds_down' : arrE.changs_v = 'odds_up'
                                  arrE.ratioH = item.oddH
                                  arrE.ratioV = item.oddV
                                  setTimeout(()=> {
                                      arrE.changs_h = false
                                      arrE.changs_v = false
                                  },5000)
                              }
                          })
                      })
                  })
              })
          }
        },
        handleWebSocket () {
          let Wurl =null
          if (sessionStorage.getItem('Tk')){
              //192.168.1.44:18083
              //192.168.1.44:18084
              //103.24.95.153:18083
              Wurl = 'ws://103.24.95.153:18083/ws?token=' + sessionStorage.getItem('Tk')
          }
          this.socket = new WebSocket(Wurl)
          this.socket.onopen = this.webSocketOnOpen
          this.socket.onmessage = this.webSocketOnMessage
          this.socket.onerror = this.webSocketOnError
        },
        // webSocketOnOpen() {
        //     console.log("WebSocket连接成功");
        // },
        webSocketOnMessage(e){ //数据接收
            const redata = JSON.parse(e.data);
            this.handleUpdateOdds(redata.content)
        },
        // webSocketOnError(e) { //错误
        //     console.log("WebSocket连接发生错误" +e);
        // },
    },
    watch :{
        betMoney (nev) {
            this.winMoney =  Number(this.betShowObj.odds * nev) + Number(nev)
            this.winMoney = this.winMoney.toFixed(2)
            this.betObj.money = nev
        }
    }
 }
</script>
<style scoped lang="scss">
    .home {
        height: 100%;
        background-color: #15181b;
    }
    .hm-HeaderModule {
        display: table;
        table-layout: fixed;
        width: 100%;
        background-color: #212b38;
        min-width: 1023px;
        .hm-HeadModule_Primary {
            display: table;
            table-layout: fixed;
            width: 100%;
            padding: 0 25px;
            height: 50px;
            .hm-HeaderModule_Logo {
                display: table-cell;
                width: 135px;
                height: 100%;
                background-position: 0 50%;
                background-repeat: no-repeat;
                background-image: url('../assets/forweb.png');
            }
            .hm-HeaderModule_Logo.H{
                display: none;
            }
            .hm-HeaderModule_title{
                display: table-cell;
                height: 100%;
                vertical-align: bottom;
                padding-bottom: 10px;
                color: #4fdccb;
            }
        }
        .hm-HeadModule_Primary.sH {
            height: 0;
        }
        .hm-BigButtons {
            display: table-cell;
            width: 65%;
            height: 100%;
            vertical-align: middle;
            text-align: center;
            padding-right: 16px;
        }
        .hm-BigButtons.H,.hm_L.H,.hm-HeaderModule_title.H{
            display: none;
        }
        .hm-BigButtons_Inner {
            display: table;
            table-layout: fixed;
            margin: 0 auto;
            height: 100%;
            border-spacing: 15px 0;
            .h-BigBtn {
                height: 100%;
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                border-bottom: 3px solid transparent;
                font-size: 13px;
                color: #e4e4e4;
                line-height: 1;
            }
            .hideBtn {
                width: 50px;
                background: url(../assets/suoS.svg) no-repeat 30% 45%;
                background-size: 29% 29%;
                cursor: pointer;
            }
            .hideBtn.showBtn {
                background: url(../assets/suoX.svg) no-repeat 30% 45%;
                background-size: 50% 40%;
                width: 30px;
            }
            .h-BigBtn_Hlight {
                color: #fff;
                border-bottom-color: #0299a0;
            }
        }
        .hm-HeadModule_Sd {
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 25px;
            position: relative;
            border-top: 1px solid;
            .hm-HModule_TimeLogin {
                /*flex: 1 0 auto;*/
                vertical-align: middle;
                padding-left: 36px;
                font-size: 11px;
                color: #4acfa5;
                /*height: 100%;*/
                line-height: 2.5;
                span {
                    display: inline-block;
                    width: 45px;
                }
            }
            .hm-HModule_TimeLogin.H{
                flex: 1 0 auto;
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
                    padding: 0 20px;
                }
            }
            .hm-Clock{
                color:#fff;
            }
        }
        .hm_L {
            position: relative;
            height: 100%;
            color: #cffbff;
            .hm_L_ch{
                display: inline-flex;
                align-items: center;
                height: 100%;
            }
            .hm_L_p {
                display:flex;
                align-items: center;
                padding: 5px 11px;
            }
            .hm_L_p:hover {
                background-color: #6b7177;
            }
             span {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                margin-right: 8px;
                cursor: pointer;
            }
            .hm_L_lang {
                width: auto;
            }
            .hm_L_EN{
                background: url("../assets/EN.png") no-repeat center center;
                background-size: 95% 95%;
            }
            .hm_L_CN{
                background: url("../assets/CN.png") no-repeat center center;
                background-size: 95% 95%;
            }
            .hm_L_more{
                background: url("../assets/xla.svg") no-repeat 30% 30%;
                background-size: 70% 70%;
            }
            .hm_L_sl {
                position: absolute;
                min-width: 110px;
                height: auto;
                margin: -5px 0 0 -12px;
                background-color: #212b38;
                box-shadow: 0 2px 4px rgba(0,0,0,.1);
                border: 1px solid #3e4d5f;
                border-radius: 5px;
                z-index: 100;
                transition: height 1s ease-in-out;
            }
            .hm_L_sl.H {
                height: 0;
                border: none;
                overflow: hidden;
                transition: height 1s ease-in-out;
            }

        }
    }
    .wc-PageView {
        display: flex;
        align-items: stretch;
        min-width: 1023px;
        min-height: 90.4%;
        background-image: url('../assets/bg-main-page-v3 FIN.jpg');
        background-position: 26% 1%;
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
                border-bottom: 1px solid #303030;
                position: relative;
                .ip-ControlBar_BBarItem {
                    padding-left: 15px;
                    font-size: 12px;
                    color: #29f3db;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 29px;
                    pointer-events: auto;
                    padding-right: 25px;
                    span {
                        color: #cffbff;
                    }
                }
                .ip-ControlBar-btn{
                    position: absolute;
                    right: 17px;
                    top: 4px;
                    height: 80%;
                }
                .ip-ControlBar_msg{
                    position: absolute;
                    top: 0;
                    right: 120px;
                    width: 79.1%;
                    height: 29px;
                    line-height: 29px;
                    color: #e4e4e4;
                    .ip-msg{
                        position: absolute;
                        width: 98%;
                    }
                    li {
                        display: inline-block;
                        padding-right:150px;
                    }
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
            .ipn-EventViewN {
                transition: width .2s ease-in-out;
                width: 214px;
                cursor: pointer;
                display: table-cell;
                vertical-align: top;
                position: relative;

            }
            .ipn-Classification.ipn-closed,.ipn-ControlBar.ipn-closed,.ipn-Classification_gq.ipn-closed {
                min-width: 64px;
                transition: min-width .2s ease-in-out;
            }
            .ipn-EventViewN.ipn_w{
                width: 64px;
                transition: min-width .2s ease-in-out;
            }
            .ipn-Class_Label.ipn-ClassftnBtn_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-Class_Label.ipn-ClassftnBtn_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .35s ease-in-out;
            }
            .ipn-Bar_C.ipn_right{
                background-image: url(../assets/right.svg);
                cursor: pointer;
            }
            .ipn-Scroller_Content {
                max-width: 213px;
                .account {
                    padding:5px 8px;
                    background-color:#212b38;
                    color: #c6fbff;
                    .ref {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        float: right;
                        background: url(../assets/refresh.svg) no-repeat center center;
                        background-size: 80% 80%;
                    }
                    .ref:hover {
                        background: url(../assets/refresh2.svg) no-repeat center center;
                        background-size: 80% 80%;
                        cursor: pointer;
                    }
                }
                .account.my {
                    color: #f60;
                }
                .balances{
                    margin-bottom: 5px;
                }
                .ipn-EventViewN_scroll {
                    height: 730px;
                    overflow-y: scroll;
                    /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
                    -ms-overflow-style:none;
                    /*火狐下隐藏滚动条*/
                    overflow:-moz-scrollbars-none;
                    /*visibility:collapse !important;*/
                }
                .ipn-EventViewN_scroll::-webkit-scrollbar {
                    display:none
                }
            }
            .ipn-ControlBar {
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
                cursor: pointer;
            }
            .asia-browser .ipn-Bar_C {
                padding-bottom: 6px;
            }
            .ipn-Bar_C {
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
            .ipn-Classification,.ipn-Classification_gq {
                width: 100%;
                min-width: 213px;
                height: 37px;
                line-height: 37px;
                position: relative;
                top: 0;
                color: #c6fbff;
                background-color: #212b38;
                margin-bottom: 2px;
                transition: min-width 1s ease-in-out;
            }
            .ipn-Classification_gq {
                height: 25px;
                line-height: 25px;
                margin-bottom: 0;
                background-color: #0299a0;
                border-bottom: 1px solid #212b38;
            }
            .ipn-EventViewN_rollBd.hide {
                display: none;
            }
            .ipn-EventViewN_rollBd {
              display: block;
            }
            .ipn-EventViewN_event {
                background-color: #212b38;
                color: #c6fbff;
                /*padding: 10px 0;*/
                border-bottom: 1px solid #504545;
            }
            .ipn-EventViewN_event:hover{
                background-color: #3e4d5f
            }
            .ipn-EventViewN_event p.ipn-EventViewN_row {
                padding: 0 15px;
                cursor: pointer;
                height: 35px;
                line-height: 35px;
                transition: height .3s ease-in-out;
                span.team {
                    width: 80%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            p.ipn-EventViewN_row.ipw_h {
                height: 0;
                overflow: hidden;
                transition: height .3s ease-in-out;
            }
            p.ipn-EventViewN_row.ipw_hd {
                background-color: #12151d;
                height: 25px;
                line-height: 25px;
            }
            .ipn-EventViewN_event p:first-child {
                display: flex;
                justify-content: space-between;
            }
            .ipn-Classification:hover{
                background-color: #3e4d5f
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
            }
            .ipe-EventViewDetail {
                display: table-cell;
                width: 100%;
                background-color: #1b232d;
                opacity: .97;
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
                max-height: calc(100vh - 135px)
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
                /*border-left: 1px solid;*/
                transition-property: opacity;
                transition-duration: .35s;
                pointer-events: none;
            }
            .ipe-table{
                width: 100%;
                text-align: center;
                .live_frame{
                    position: relative;
                    width: 100%;
                    height: 313px;
                    .frame {
                        width: 100%;
                        height: 100%;
                    }
                    >div {
                     position: absolute;
                     left: 46%;
                     top:45%
                    }
                }
                .block_table {
                   width: 100%;
                }
                .sel,.favSel {
                    color: #01fce1;
                }
                .data-key {
                    display: none;
                }
                .in_block {
                    display: table-cell;
                    border-top: 1px solid #352d2d;
                }
                .in_block.reBor{
                 border-bottom:none;
                 border-top: none;
                 background-color: #1b232d;
                }
                .col-pad {
                    padding: 3px 0;
                }
                .fs td {
                    padding: 10px 0;
                    font-weight: 700;
                }
                .ipe-bor,.col-hdp{
                    width: 18%;
                }
                 thead td{
                    /*background-color: #48504e;*/
                }
                .ipe-table-sc-title{
                    padding: 10px 0 10px 10px;
                    text-align: left;
                    background-color: #0299a0;
                    font-size: 15px;
                    border-bottom: 1px solid #1b232d;
                }
                .ipe-table-sc-table{
                    width: 100%;
                }
                .col-names{
                    width: 30%;
                }
                .live-c {
                    text-align: left;
                }
                .col-time{
                    width: 10%;
                    border-right: 1px solid #352d2d;
                    border-bottom: 1px solid #352d2d;
                }
                .ipe-table-bg{
                    background-color: #212b38;
                    display: table;
                    width: 100%;
                    margin-bottom: 10px;
                }
                .select_table{
                     padding-left: 10%;
                     padding-right: 4%;
                     margin-bottom:5px;
                }
                .sf_odds{
                 display: inline-block;
                 position: relative;
                 width: 100%;
                }
                .col_body{
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 5px;
                }
                a.sf_odds:hover,a.half_50:hover{
                    background-color: #0299a0;
                    /*#ff9159ba*/
                }
                a.sf_odds .odds_up ,.half_50 .odds_up{
                    position: absolute;
                    top:0;
                    height: 100%;
                    right: 15px;
                    width: 20px;
                    background: url(../assets/up.svg) no-repeat center center;
                    background-size: 100% 100%;
                }
                a.sf_odds .odds_down ,.half_50 .odds_down{
                    position: absolute;
                    top:0;
                    height: 100%;
                    right: 15px;
                    width: 20px;
                    background: url(../assets/down.svg) no-repeat center center;
                    background-size: 100% 100%;
                }
                .half_50,.half_50s{
                    position: relative;
                    display: inline-block;
                    width: 50%;
                }
                .half_50s {
                    color: #fde972;
                }
                .col-more {
                    position: relative;
                    border-bottom: 1px solid #352d2d;
                    border-right: none;
                    width: 6%;
                    span {
                        display: block;
                        height: 100%;
                    }
                    span.cur {
                        cursor: pointer;
                        color: #f60;
                    }
                    span.col-more_icon {
                        position: absolute;
                        top: 25%;
                        left: 42%;
                        width: 15px;
                        height: 20px;
                        background: url(../assets/suoS.svg) no-repeat center center;
                        background-size: 100% 100%;
                    }
                    span.col-more_icon_h{
                        background: url(../assets/suoX.svg) no-repeat center center;
                        background-size: 100% 100%;
                    }
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
                    border-right: 1px solid #352d2d;
                    border-bottom: 1px solid #352d2d;
                }
                .select_map {
                     text-align: left;
                     /*background-color: #0299a0;*/
                      li {
                          display: inline-block;
                          padding: 5px 10px;
                          border-radius: 30px;
                          background: linear-gradient(180deg, #01fce1 0, #0c6f72 31.87%, #6d1699 90.06%);
                          cursor: pointer;
                          margin: 2px 6px;
                      }
                      .BtnHl {
                         background: linear-gradient(180deg, #0c6f72 0, #0c6f72 31.87%, #0c6f72 90.06%);
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
            }
        }
    }
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
    .league-select,.msg-select{
        position: fixed;
        min-width: 600px;
        max-width: 40%;
        left: 30%;
        top: 28%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        background-color: #fff;
        z-index: 100;
        .s-dialog-header,.msg-header {
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
    .wc-PageView.wc-PageView_Mh{
        min-height: 95.5%;
    }
    .wc-PageView_R {
        flex: 0 0 auto;
        position: relative;
        transition: width .4s ease-in-out;
        width: 300px;
        max-width: 592px;
        .wc-PageView_header{
            height: 28px;
            line-height: 28px;
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
            .wc-PageView_header_mr{
                margin-right: 20px;
            }
        }
        .bet_info {
            background-color: #151f2b;
            opacity: .7;
            color: #f2f2f2;
        }
        .bet_In {
            border-bottom: 1px solid #0299a0;
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
        .wager-id-date {
            padding: 5px 0;
            .wager-id{
                padding-right: 20px;
                color: #cffbff;
            }
            .vs ,.at,.stake{
                color: #f60;
            }
            .status {padding-left: 10px}
        }
        .bet_prompt{
            text-align: center;
            line-height: 18px;
            padding: 32px 10px;
            border-bottom: none;
            border-top: solid 1px #116c4f;
            cursor: default;
            color: #fff;
        }
        .bet_details_body{
            padding-left:15%;
            position: relative;
            .bet_details_body_title,.bet_details_body_event,.bet_count_down{
                padding: 5px 0;
                b {
                    display: inline-block;
                    padding: 0 3px;
                    font-size: 15px;
                    font-weight: bold;
                    color: #f60;
                }
                input.bet_input {
                    width: 40%;
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
                    width: 50px;
                    color: #fff;
                }
            }
            .bet_cd_r {
                position: absolute;
                right: 40px;
            }
        }
        button.wager_btn {
            padding: 5px 15px;
            border-radius: 12px;
            margin-right: 5px;
            outline: none;
            border: none;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.21);
            background: linear-gradient(180deg, #01fce1 0, #0c6f72 31.87%, #6d1699 90.06%);
        }
        .wc-PageView_R_item {
            color: #fff;
        }
        .wc-PageView_R_item_m {
            color: #fff;
            height: 53.2%;
            overflow-y: scroll;
        }
        .frame,.frame_child {
            width: 100%;
            height: 100%;
            .frame_child{
                text-align: center;
                line-height: 25;
                color: #fff;
            }
        }
        .wc-PageView_i_v {
            width: 100%;
            height: 40%;
        }
    }
    .wc-PageView_R.max {
        width: 500px;
        transition: width .4s ease-in-out;
    }
    @media (min-width: 1109px) {
        .hm-BigButtons_Inner {
            border-spacing: 20px 0;
        }
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
    .hm-DropDS_Highlight {
        display: inline-block;
        position: relative;
        color: #25d4bf;
        cursor: pointer;
        height: 100%;
        padding: 0 5px;
    }
    .hm-DropDS_Highlight:after {
        content: '';
        position: absolute;
        background: #29f3db;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        transition: .3s ease-in-out;
        border-radius: 100px;
    }
    .hm-DropDS_Highlight:hover:after{
        width: 70px;
        transition: .3s ease-in-out;
    }
</style>