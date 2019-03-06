<template>
    <div :class="'home ' + cssStyle">
        <div class="hm-HeaderModule ">
            <div :class="headerHide ? 'hm-HeadModule_Primary' : 'hm-HeadModule_Primary sH'">
                <a :class="headerHide ? 'hm-HeaderModule_Logo' : 'hm-HeaderModule_Logo H'"/>
                <div :class="headerHide ? 'hm-BigButtons' : 'hm-BigButtons H'">
                    <nav class="hm-BigButtons_Inner ">
                        <a :class="eventType === 1 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('jr')">{{$t('lang.home.header_jr')}}</a>
                        <a :class="eventType === 2 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('zp')">{{$t('lang.home.header_zp')}}</a>
                        <a :class="eventType === 3 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('gq')">{{$t('lang.home.header_gq')}}</a>
                        <a :class="eventType === 5 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('cg')">{{$t('lang.home.header_cg')}}</a>
                        <!--<a class="h-BigBtn">过关</a>-->
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
                        <p class="hm_L_p" @click="handleSelectLang('CH')">
                            <span class="hm_L_CN"/>
                            <span class="hm_L_lang">简体中文</span>
                        </p>
                    </div>
                </div>
                <div :class="headerHide ? 'hm_style' : 'hm_style H'">
                    <div class="hm_L_ch" @click="handleChangeStyle()">
                        <b>模式切换</b>
                        <span class="hm_L_more"/>
                    </div>
                    <div :class="changeStyle? 'hm_L_sl' : 'hm_L_sl H'">
                        <p class="style" @click="handleChangeStyle('trial')" >
                            日间模式
                        </p>
                        <p class="style" @click="handleChangeStyle('normal')">
                            夜间模式
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
                    <a :class="eventType === 5 ? 'h-BigBtn h-BigBtn_Hlight' : 'h-BigBtn'" @click="handleSelectEType('cg')">{{$t('lang.home.header_cg')}}</a>
                    <!--<a class="h-BigBtn">过关</a>-->
                    <span class="h-BigBtn hideBtn showBtn" @click="headerHide = !headerHide"></span>
                </nav>
                <div class="hm-HeaderModule_Menus" v-if="userTk">
                    <div class="hm-LgDropDS  " @click="showQr = true">
                        <span class="hm-DropDS_Highlight" >{{$t('lang.home.bar_ewm')}}</span>
                    </div>
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
                        <span class="ip-ControlBar_BBarItem_c">{{ eventList[eventType] }}</span>
                        <span :title="selectEvent" class="ip-ControlBar_BBarItem_b">{{' / ' + selectEvent }}</span>
                    </div>
                    <div class="ip-ControlBar_msg">
                        {{$t('lang.home.bar_msg')}}:
                        <marquee class="ip-msg" behavior="scroll" direction="left" @click="handleOpenNewPage('gg')" onmouseover=this.stop() onmouseout=this.start()>
                            <ul>
                              <li class="scope" v-for="(msgItems, key) in msgList" :key="key">
                                {{ msgItems.contentCn }}
                              </li>
                            </ul>
                        </marquee>
                    </div>
                    <div class="ip-ControlBar-btn" >
                        <div class="fa-o-btn"  v-if="eventType !== 3" @mouseover="ipBarSelect = true" @mouseout="ipBarSelect = false">
                            <button class="o-button m_r">{{ $t('lang.home.bar_px') }}</button>
                            <div  v-if="eventType !== 3" :class="ipBarSelect ? 'ip-ControlBar_select' : 'ip-ControlBar_select H'">
                                <p class="ip-ControlBar_p" @click="handleSelectMatchTpe($event, 'pt')">
                                    <input type="checkbox" :checked="ipBarType === 'pt'" id="pt">
                                    <label class="ip-ControlBar_lang" for="pt">{{ $t('lang.home.bar_ptpx') }}</label>
                                </p>
                                <p class="ip-ControlBar_p" @click="handleSelectMatchTpe($event,'sj')">
                                    <input type="checkbox" :checked="ipBarType === 'sj'" id="sj">
                                    <label class="ip-ControlBar_lang" for="sj">{{ $t('lang.home.bar_sjpx') }}</label>
                                </p>
                            </div>
                        </div>
                        <div class="fa-o-btn" v-if="eventType !== 3" @mouseover="showTimeSort = true" @mouseout="showTimeSort = false">
                            <button class="o-button m_r">{{ $t('lang.home.bar_rqpx') }}</button>
                            <ul v-if="showTimeSort" class="fa-o-ul">
                                <li v-for="(timeItem,tkey) in timeSortList" :key="tkey" @click="handleGetMatches({date:timeItem})">{{ timeItem }}</li>
                            </ul>
                        </div>
                        <div class="fa-o-btn">
                            <button v-if="eventType !== 3" @click="handleGetLeagues()" class="o-button">{{$t('lang.home.bar_select')}}</button>
                        </div>
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
                                         <span>{{$t('lang.home.bar_kyzj')}}:</span>
                                         <i :class="refMoney? 'bet_ref sync_skip r' : 'bet_ref r'" @click="handleRefUserInfo"></i>
                                     </p>
                                     <p class="account my">CNY: {{ balance }}</p>
                                </div>
                                <div class="ipn-EventViewN_scroll">
                                    <div  :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-closed'" v-for="(item,key) in eventBarList" :key="key"
                                          v-if="eventType !== 3"   @click="handleGetMatches({event: item.category})">
                                        <span class="ipn-Classification-num">
                                          <img class="ci-ClassificationIcon" v-if="item.category !== 'CS:GO'" :src="require('../assets/png/'+item.category+'.png')" alt="">
                                          <img class="ci-ClassificationIcon" v-if="item.category === 'CS:GO'" src="../assets/png/CSGO.png">
                                          <span class="ipn-Class-num">{{ item.count }}</span>
                                        </span>
                                        <span :class="sidebar ? 'ipn-Class_Label':'ipn-ClassftnBtn_cls ipn-Class_Label'">
                                        {{ item.category }}
                                        </span>
                                    </div>
                                    <div v-if="eventType === 3 " class="ipn-EventViewN_rollB" v-for="(rItem,rkey) in rollBallList" :key="rkey">
                                        <div  :class="sidebar ? 'ipn-Classification_gq' :'ipn-Classification_gq ipn-closed'" @click="handleIPWHide($event,'hd')">
                                             <span class="ipn-Classification-num">
                                               <img class="ci-ClassificationIcon" v-if="rkey !== 'CS:GO'" @error="this.src = require('../assets/png/others.png')" :src="[/.*[\u4e00-\u9fa5]+.*/.test(rkey) === false ? require('../assets/png/'+rkey+'.png'): require('../assets/png/others.png')]">
                                               <img class="ci-ClassificationIcon" v-if="rkey === 'CS:GO'" src="../assets/png/CSGO.png">
                                             </span>
                                             <span :class="sidebar ? 'ipn-Class_Label':'ipn-ClassftnBtn_cls ipn-Class_Label'">
                                               {{ rkey }}
                                             </span>
                                        </div>
                                        <div class="ipn_body" v-for="(rItemx,rkeyx) in rItem" :key="rkeyx">
                                            <div :class="sidebar ?'ipn-EventViewN_rollBd' : 'ipn-EventViewN_rollBd hide'">
                                                <div class="ipn-EventViewN_event" v-for="(rItems,rkeys) in rItemx.gameMatches" :key="rkeys">
                                                    <p :title="rItemx.league" v-if="rkeys ===0 " :class="sidebar ? 'ipn-EventViewN_row ipw_hd' : 'ipn-EventViewN_row ipw_h ipw_hd'" @click="handleIPWHide($event)">
                                                        {{ rItemx.league }}
                                                    </p>
                                                    <div class="ipn_team" @click="handleGetRollMatchInfo(rItems, rItemx)">
                                                        <p :class="sidebar ? 'ipn-EventViewN_row' : 'ipn-EventViewN_row ipw_h'">
                                                            <span class="team">{{ rItems.teamLeft }}</span>
                                                            <span> {{ rItems.scoreLeft + ' - ' + rItems.scoreRight }}</span>
                                                        </p>
                                                        <p :class="sidebar ? 'ipn-EventViewN_row b_btm' : 'ipn-EventViewN_row ipw_h'">
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
                            <div class="ipe-EventVScroller_title">
                                <table class="block_table table_title">
                                    <thead class="fs">
                                    <tr>
                                        <td class="col-time">
                                            {{$t('lang.home.table_sj')}}
                                        </td>
                                        <td class="col-names">
                                            {{$t('lang.home.table_ss')}}
                                        </td>
                                        <td class="ipe-bor">
                                            {{$t('lang.home.table_sfp')}}
                                        </td>
                                        <td class="ipe-bor">
                                            {{$t('lang.home.table_rq')}}
                                        </td>
                                        <td class="ipe-bor">
                                            {{$t('lang.home.table_dx')}}
                                        </td>
                                        <td class="col-more">
                                            <span class="cur" v-if="eventType === 3" @click="scoreShow = !scoreShow">
                                                {{ scoreShow ? $t('lang.home.table_hide') : $t('lang.home.table_show')}}
                                            </span>
                                            <span v-if="eventType !== 3">+</span>
                                        </td>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div id="scrollBar" class="ipe-Event_ContentContainer ">
                                <div class="content">
                                    <div class="ipe-table" v-if="matchList.length !== 0">
                                        <div class="live_frame" v-if="eventType === 3 && scoreShow">
                                            <iframe v-if="matchText" :src="matchText" scrolling="no" class="frame_r" frameborder="0"></iframe>
                                            <div class="frame_child" v-if="!matchText">{{ $t('lang.home.table_score') }}</div>
                                        </div>
                                        <div class="block_table table_body" v-for="(item, key) in matchList" :key="key" v-if="eventType !==3">
                                            <div class="bet_R">
                                                <span>{{ matchRef }}</span>
                                                <i :class="refBet? 'bet_ref sync_skip' : 'bet_ref'" @click="handleGetMatches({})"></i>
                                            </div>
                                            <div @click="handleHideNext($event)" class="ipe-table-sc-title">
                                                <span>{{ item.category + ' - ' + item.league }}</span>
                                            </div>
                                            <div class="block_table" v-for="(itemx,keyx) in item.gameMatches" :key="keyx">
                                                <div class="table_row ipe-table-bg">
                                                    <div class="col-time in_block">
                                                        {{ itemx.matchTime }}
                                                    </div>
                                                    <div class="col-names in_block col-pad">
                                                        <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft }}‎</span>
                                                        <br>
                                                        <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight }}‎</span>
                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '2'">
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="sf_odds"  @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{ itemn.ratioH !== '0.0' ? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="sf_odds"  @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0'? itemn.ratioV : ''}}
                                                                <span :class="itemn.changs_v"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div  :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '0'">
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="half_50s" v-if="itemn.ratioH !== '0.0' && itemn.status !== 1">{{ itemn.betH > 0 && itemn.ratioH ? itemn.betH : '' }}</a>
                                                            <a class="odds half_50"  @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{  itemn.ratioH !== '0.0' ? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="half_50s" v-if="itemn.ratioV !== '0.0' && itemn.status !== 1">{{ itemn.betV > 0 && itemn.ratioV ? itemn.betV : '' }}</a>
                                                            <a class="odds half_50"  @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0' ? itemn.ratioV : ''}}
                                                                <span :class="itemn.changs_v"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div  :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '1'">
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="half_50s"  v-if="itemn.ratioH !== '0.0' && itemn.status !== 1">{{ itemn.betH > 0 && itemn.ratioH ? itemn.betH : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{ itemn.ratioH !== '0.0' ? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="half_50s" v-if="itemn.ratioV !== '0.0' && itemn.status !== 1">{{ itemn.ratioV ? 'u' : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0' ? itemn.ratioV : ''}}
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
                                                                <div :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '2'">
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0' ? itemv.ratioV : ''}}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '0'">
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="half_50s" v-if="itemv.ratioH !== '0.0' && itemv.status !== 1">{{ itemv.betH > 0 && itemv.ratioH ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50"  @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s" v-if="itemv.ratioV !== '0.0' && itemv.status !== 1">{{ itemv.betV > 0 && itemv.ratioV ? itemv.betV : '' }}</a>
                                                                    <a class="odds half_50"  @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0' ? itemv.ratioV : ''}}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '1'">
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="half_50s" v-if="itemv.ratioH !== '0.0' && itemv.status !== 1" >{{ itemv.betH > 0 && itemv.ratioH ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s" v-if="itemv.ratioV !== '0.0' && itemv.status !== 1">{{ itemv.ratioV ? 'u' : '' }}</a>
                                                                    <a class="odds half_50"  @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0'? itemv.ratioV : ''}}
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
                                        <div class="block_table table_body" v-if="eventType === 3" >
                                            <div class="bet_R R">
                                                <i :class="refBet? 'bet_ref sync_skip' : 'bet_ref'" @click="handleGetRollMatchInfo()"></i>
                                            </div>
                                            <div @click="handleHideNext($event)" class="ipe-table-sc-title">
                                                <span>{{ rollBallNameObj.category + ' - ' + rollBallNameObj.league }}</span>
                                            </div>
                                            <div class="block_table" v-for="(itemx,keyx) in matchList" :key="keyx" >
                                                <div class="table_row ipe-table-bg">
                                                    <div class="col-time in_block">
                                                        {{ itemx.matchTime }}
                                                    </div>
                                                    <div class="col-names in_block col-pad">
                                                        <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft }}‎</span>
                                                        <br>
                                                        <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight }}‎</span>

                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '2'">
                                                            <span v-if="itemn.liveType === 1 && itemn.status !== 1" class="col_body_live"/>
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{ itemn.ratioH !== '0.0'? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0' ? itemn.ratioV : ''}}
                                                                <span :class="itemn.changs_v"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div  :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '0'">
                                                            <span v-if="itemn.liveType === 1 && itemn.status !== 1" class="col_body_live big"/>
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="half_50s" v-if="itemn.ratioH !== '0.0' && itemn.status !== 1" >{{ itemn.betH > 0 && itemn.ratioH ? itemn.betH : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{ itemn.ratioH !== '0.0' ? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="half_50s" v-if="itemn.ratioV !== '0.0' && itemn.status !== 1">{{ itemn.betV > 0 ? itemn.betV : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0'? itemn.ratioV : ''}}
                                                                <span :class="itemn.changs_v"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-hdp in_block">
                                                        <div  :class="itemn.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemn,keyn) in itemx.gameOddMap2[0]" :key="keyn" v-if="itemn.betType === '1'">
                                                            <span v-if="itemn.liveType === 1 && itemn.status !== 1" class="col_body_live big"/>
                                                            <span v-if="itemn.status === 1" class="clover_body"></span>
                                                            <a class="half_50s" v-if="itemn.ratioH !== '0.0' && itemn.status !== 1" >{{ itemn.betH > 0 ? itemn.betH : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'1'})">
                                                                {{ itemn.ratioH !== '0.0' ? itemn.ratioH : ''}}
                                                                <span :class="itemn.changs_h"/>
                                                            </a>
                                                            <a class="half_50s" v-if="itemn.ratioV !== '0.0' && itemn.status !== 1">{{ itemn.ratioV ? 'u' : '' }}</a>
                                                            <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemn, type:'2'})">
                                                                {{ itemn.ratioV !== '0.0' ? itemn.ratioV : ''}}
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
                                                            <div class="col-names in_block col-pad">
                                                                <span class="sel" :title="itemx.teamLeft">{{ itemx.teamLeft +' (MAP ' + keys +')'}}‎</span>
                                                                <br>
                                                                <span class="favSel" :title="itemx.teamRigh">{{ itemx.teamRight +' (MAP ' + keys + ')'}}‎</span>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '2'">
                                                                    <span v-if="itemv.liveType === 1 && itemv.status !== 1" class="col_body_live"/>
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="sf_odds" @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0' ? itemv.ratioV : '' }}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '0'">
                                                                    <span v-if="itemv.liveType === 1 && itemv.status !== 1" class="col_body_live big"/>
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="half_50s" v-if="itemv.ratioH !== '0.0' && itemv.status !== 1">{{ itemv.betH > 0 && itemv.ratioH ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s" v-if="itemv.ratioV !== '0.0' && itemv.status !== 1">{{ itemv.betV > 0 && itemv.ratioV ? itemv.betV : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0' ? itemv.ratioV : '' }}
                                                                        <span :class="itemv.changs_v"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-hdp in_block">
                                                                <div  :class="itemv.status === 1 ? 'col_body col_body_b' : 'col_body'" v-for="(itemv,keyv) in items" :key="keyv" v-if="itemv.betType === '1'">
                                                                    <span v-if="itemv.liveType === 1 && itemv.status !== 1" class="col_body_live big"/>
                                                                    <span v-if="itemv.status === 1" class="clover_body"></span>
                                                                    <a class="half_50s" v-if="itemv.ratioH !== '0.0' && itemv.status !== 1" >{{ itemv.betH > 0 && itemv.ratioH ? itemv.betH : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemv, type:'1'})">
                                                                        {{ itemv.ratioH !== '0.0' ? itemv.ratioH : ''}}
                                                                        <span :class="itemv.changs_h"/>
                                                                    </a>
                                                                    <a class="half_50s" v-if="itemv.ratioV !== '0.0' && itemv.status !== 1">{{ itemv.ratioV ? 'u' : '' }}</a>
                                                                    <a class="odds half_50" @click="handleClickBet({item:itemx, itemn:itemv, type:'2'})">
                                                                        {{ itemv.ratioV !== '0.0' ? itemv.ratioV : '' }}
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
                                        {{$t('lang.home.table_msg')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <bet-com></bet-com>
        </div>
        <modal :modalShow="sendChild" @listenFromChild="handleFromChild"/>
        <div class="model" v-if="showLogin">
            <div class="models" @click="showLogin = false"></div>
            <div class="league-select">
                <div class="s-dialog-header">
                    <i class="fa icon league-header"></i>
                    <h4>请输入</h4>
                </div>
                <div style="padding: 9% 25%;">
                    <div style="padding: 10px 0">
                        UserName: <input type="text" v-model="userObj.username">
                    </div>
                    <div>
                        Password: <input type="password" v-model="userObj.agentCode">
                    </div>
                </div>
                <div class="s-dialog-footer">
                    <button class="o-button" @click="showLogin = false">取消</button>
                    <button class="o-button" @click="handleUserLogin()">登录</button>
                </div>
            </div>
        </div>
        <layer ref="layer"></layer>
        <q-r-code v-if="showQr" @Hide="showQr = false"></q-r-code>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import modal from '@/components/modal'
import Mixin from '@/utils/Mixin'
import layer from '@/components/diaoLog'
import QRCode from '@/components/qrcode'
import betCom from '@/components/betCom'

export default {
    name: 'home',
    mixins: [Mixin],
    components: {
        modal,
        layer,
        QRCode,
        betCom
    },
    computed : {
        ...mapState([ 'balance', 'userTk', 'eventType',
            'betItemList', 'countDown', 'betObj', 'betBoxShow', 'cssStyle' ])
    },
    data () {
        return {
            sidebar: true,
            eventBarList: [],
            matchList:[],
            times: null,
            showMore: false,
            showLogin: true,
            showQr: false,
            selectLangShow: false,
            refBet: false,
            scoreShow: false,
            ipBarSelect: false,
            showTimeSort: false,
            changeStyle: false,
            mapListObj: {
                1: 'MAP 1',
                2: 'MAP 2',
                3: 'MAP 3',
                4: 'MAP 4',
                5: 'MAP 5',
                6: 'MAP 6',
                7: 'MAP 7',
            },
            headerHide: true,
            eventList: [ '','今日赛事', '早盘赛事', '滚球赛事', '', '混合过关' ],
            selectEvent: 'ALL',
            userObj: {
                username: 'g92y005',
                agentCode: 'G92122'
            },
            selectLang: 'CN',
            sendChild: {
                showModal: false,
                leaguesList: []
            },
            selectLgList: [],
            rollBallList: {},
            socket: null,
            rollBallNameObj: {},
            ipBarType: 'pt',
            timeSortList: [],
            matchRef: 60,
            matchCountDown: null,
            mitem: null,
        }
    },
    mounted () {
        this.setTime()
        this.handleWebSocket()
        this.$nextTick(()=>{
            this.ScrollBar('#scrollBar')
        })
        this.handleSendSign()
    },
    beforeDestroy() {
        this.handleCountDown('cl')
        clearInterval(this.matchCountDown)
    },
    methods: {
      ...mapActions([ 'postBetGameS', 'postMatchCountS', 'postInitESportBulletinS',
          'postUserLoginS', 'postMultiTicketS', 'postMixParlayCountS', 'postSignS' ]),
      ...mapMutations([ 'saveToken', 'changEventType', 'changLiveText',
          'changMatchText', 'pushMixBetList', 'changeCountDown',
          'setBetObj', 'changeBetBoxShow', 'changeCssStyle' ]),
        handleCreate () {
            this.handleGetEvents()
            this.handleGetMatches({})
            this.handleGetBulletin()
        },
        handleGetEvents () {
          this.eventBarList = []
          let data = {}
          if (this.eventType < 3 ) {
              data.rtype = this.eventType
              this.postMatchCountS(data).then(res => {
                 this.handleRegularCount(res)
              })
          } else if (this.eventType === 5) {
              data.date = this.formattingTime(new Date(),'dd')
              this.postMixParlayCountS(data).then(res => {
                  this.handleRegularCount(res)
              })
          }
        },
        handleRegularCount (res) {
            if(res.length !== 0 && res.code !== 500) {
                res.forEach(arr => {
                    if(arr.category) {
                        this.eventBarList.push(arr)
                    }
                })
            } else {
                clearInterval(this.matchCountDown)
            }
        },
        handleGetMatches ({ event, lid, type, date }) {
            clearInterval(this.matchCountDown)
            let data = {}
            this.matchList = []
            this.refBet = true
            if (lid) {
                data.leagueIds = lid
            }
            if (type) {
                data.order = 2
            }
            if (date) {
                data.date = date
                this.showTimeSort = false
            }
            if (event) {
                this.selectEvent = event
                data.category = event
                if (event === 'ALL') {
                    data.category = ''
                }
                sessionStorage.setItem('category',data.category)
            }
            if (sessionStorage.getItem('category')) {
                data.category = sessionStorage.getItem('category')
            }
            if (this.eventType === 1 || this.eventType === 2 ) {
                data.rtype = this.eventType
                if (!event && sessionStorage.getItem('category')) {
                    data.category = sessionStorage.getItem('category')
                }
                this.handleCreateSend('/sv/match/matches',data).then(res => {
                    if (res.status === 200 && Array.isArray(res.data.resultMsg)) {
                        this.matchList = res.data.resultMsg
                        this.handleMatchCountDown()
                        this.handleShowFirst()
                        this.handleRegularList(this.matchList)
                    } else {
                        return false
                    }
                })
              } else if (this.eventType === 5) {
                this.handleCreateSend('/sv/match/matchesMixParlay',data).then(res => {
                    if (res.status === 200 && Array.isArray(res.data.resultMsg)) {
                        this.matchList = res.data.resultMsg
                        this.handleMatchCountDown()
                        this.handleShowFirst()
                        this.handleRegularList(this.matchList)
                    } else {
                        return false
                    }
                })
            }
            setTimeout(() => {
                this.refBet = false
            },1000)
        },
        handleRegularList (list) {
            list.forEach(arr => {
                  arr.gameMatches.forEach(arrL => {
                      Object.keys(arrL.gameOddMap2).forEach(arrS => {
                          arrL.gameOddMap2[arrS].forEach(arrE => {
                              arrE.changs_h = false
                              arrE.changs_v = false
                              if (arrE.status !== 0 ) {
                                  arrE.ratioH = ''
                                  arrE.ratioV = ''
                              }
                          })
                      })
                  })
              })
        },
        handleSelectMatchTpe (e, type) {
           e.preventDefault()
           this.ipBarType = type
           let data = null
           data =  this.selectEvent
           if (type === 'sj') {
               this.handleGetMatches({event: data, type:'sj'})
           } else {
               this.handleGetMatches({event: data})
           }
           this.ipBarSelect = false
        },
        handleGetRollMatches () {
            this.matchList = []
            this.rollBallList = []
            let data = {}
            data.rtype = 3
            this.handleCreateSend('/s2/match/matches',data).then(res => {
                if (res.status === 200 && Array.isArray(res.data.resultMsg)) {
                    this.rollBallList = res.data.resultMsg
                    this.rollBallNameObj.category = this.rollBallList[0].category
                    this.rollBallNameObj.league = this.rollBallList[0].league
                    this.handleGetRollMatchInfo(this.rollBallList[0].gameMatches[0])
                    let lists = {}
                    this.rollBallList.forEach(arr => {
                        lists[arr.category] = []
                    })
                    for(let key in lists) {
                        this.rollBallList.forEach (arr => {
                            if (arr.category === key) {
                                lists[key].push(arr)
                            }
                        })
                    }
                    this.rollBallList = lists
                } else {
                    return false
                }
            })
        },
        handleGetRollMatchInfo (item, bt) {
           this.refBet = true
           this.matchList = []
            clearInterval(this.matchCountDown)
           let data = {}
           if (item) {
             data.gid = item.gid
              if (bt) {
                  this.rollBallNameObj.category = bt.category
                  this.rollBallNameObj.league = bt.league
              }
             sessionStorage.setItem('gid',item.gid)
           } else {
             data.gid = sessionStorage.getItem('gid')
           }
           this.handleCreateSend('/s2/match/info',data).then(res => {
              if (res.status === 200 && Array.isArray(res.data.resultMsg)) {
                    this.matchList = res.data.resultMsg
                    this.matchList.forEach(arr => {
                        for (let key in arr.gameOddMap2){
                            arr.gameOddMap2[key].forEach(arrC => {
                                if (Number(arrC.status) !== 0) {
                                    arrC.ratioH = null
                                    arrC.ratioV = null
                                }
                                arrC.changs_h = false
                                arrC.changs_v = false
                            })
                        }
                    })
                    if (this.matchList[0].liveUrl|| this.matchList[0].matchLive) {
                        this.changLiveText(this.matchList[0].liveUrl)
                        this.changMatchText(this.matchList[0].matchLive)
                    } else {
                        this.changLiveText('')
                        this.changLiveText('')
                    }
                    setTimeout(() => {
                        this.refBet = false
                    },1000)
                } else {
                    return false
                }
            })
        },
        handleClickBet({ item, itemn, type }) {
          this.handleCountDown('cl')
          this.betShowObj = {}
          this.changeCountDown(10)
          this.betShowObj.betTeam = type
          this.betShowObj.oddId = itemn.id
          this.betShowObj.gid = item.gid
          let data = {
            team : type,
            oddsId : itemn.id
          }
          this.setBetObj(data)
          if (this.eventType === 5 ) {
              let gidList = []
              if (this.betItemList.length === 0) {
                  this.pushMixBetList(this.betShowObj)
                  this.handleGetMixList()
              } else if (this.betItemList.length > 9) {
                  this.$refs.layer.open('最大注数不能超过10注',true,false,1500)
                  return false
              } else {
                  gidList = this.betItemList.map(arr => arr.gid)
                  if (gidList.indexOf(this.betShowObj.gid) !== -1) {
                      this.$refs.layer.open('同场赛事不能重复参与串关',true,false,1500)
                      return false
                  } else {
                      this.pushMixBetList(this.betShowObj)
                      this.handleGetMixList()
                  }
              }
          } else {
              if (!this.betBoxShow) {
                  this.changeBetBoxShow()
              }
              this.handleRefOdds()
              this.handleCountDown()
          }
        },
        handleSelectEType (type) {
          clearInterval(this.matchCountDown)
          sessionStorage.removeItem('category')
          if (type === 'jr') {
              this.changEventType(1)
          } else if (type === 'zp') {
              this.timeSortList = []
              let getTime = new Date(),fiveTime = ''
              for (let i = 0; i < 5; i++) {
                  fiveTime = getTime.setDate(getTime.getDate()+ 1)
                  this.timeSortList.push(this.formattingTime(fiveTime,'dd'))
              }
              this.changEventType(2)
          } else if(type === 'gq') {
              this.changEventType(3)
              this.ipBarSelect = false
              this.handleGetRollMatches()
          } else {
              this.changEventType(5)
              this.handleCountDown('cl')
          }
          this.handleGetEvents()
          this.handleGetMatches({})
          this.selectEvent = 'ALL'
          this.betMoney = null
          this.refBet = false
          this.setVal(0)
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
        handleUserLogin () {
            this.postUserLoginS(this.userObj).then( res => {
                if (res) {
                    this.showLogin = false
                    alert('登录成功')
                    this.saveToken(res.token)
                    this.handleGetBulletin()
                    this.refreshMoney(res.amount)
                    this.handleWebSocket()
                }
            })
        },
        handleSelectLang (e) {
          if (e) {
            this.selectLang = e
            this.$i18n.locale = e
            sessionStorage.setItem('18n',e)
            this.selectLangShow = false

          } else {
            this.selectLangShow = !this.selectLangShow
          }
        },
        handleChangeStyle (st) {
          if (st) {
              this.changeCssStyle(st)
              this.changeStyle = false
          } else {
              this.changeStyle = !this.changeStyle
          }
        },
        handleFromChild (data) {
            let slg = null
            this.sendChild.showModal = data.mShow
            if (data.selectLeagues.length !== 0) {
                this.selectLgList = data.selectLeagues
                slg = this.selectLgList.join(',')
                this.handleGetMatches({lid: slg})
            }
        },
        handleHideNext (e, type) {
          e.stopPropagation()
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
          }
          else {
              let $src = e.currentTarget.parentElement.parentElement
              let team = $src.querySelectorAll('.ipn_team')
              team.forEach(arr => {
                  if (arr.style.display === 'none') {
                      arr.style.display = 'block'
                  } else {
                      arr.style.display = 'none'
                  }
              })
          }
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
        handleUpdateOdds (item, type) {
          if (item.isRolling) {
              this.matchList.forEach(arr => {
                  for (let key in arr.gameOddMap2){
                      arr.gameOddMap2[key].forEach(arrC => {
                          if (Number(arrC.id) === Number(item.oddId)){
                              switch (type) {
                                  case 'oddsChange' :
                                      if (item.oddH && item.oddV) {
                                          Number(arrC.ratioH) > Number(item.oddH) ? arrC.changs_h = 'odds_down' : arrC.changs_h = 'odds_up'
                                          Number(arrC.ratioV) > Number(item.oddV) ? arrC.changs_v = 'odds_down' : arrC.changs_v = 'odds_up'
                                          arrC.ratioH = item.oddH
                                          arrC.ratioV = item.oddV
                                          setTimeout(()=> {
                                              arrC.changs_h = false
                                              arrC.changs_v = false
                                          },10000)
                                      }
                                      break
                                  case 'matchInfoChange' :
                                      if (item.oddsStatus === 1) {
                                          arrC.status = item.oddsStatus
                                          arrC.ratioH = null
                                          arrC.ratioV = null
                                      } else {
                                          arrC.status = item.oddsStatus
                                          arrC.ratioH = item.ratioH
                                          arrC.ratioV = item.ratioV
                                      }
                                      break
                              }
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
                                  switch (type) {
                                      case 'oddsChange' :
                                          if (item.oddH && item.oddV) {
                                              Number(arrE.ratioH) > Number(item.oddH) ? arrE.changs_h = 'odds_down' : arrE.changs_h = 'odds_up'
                                              Number(arrE.ratioV) > Number(item.oddV) ? arrE.changs_v = 'odds_down' : arrE.changs_v = 'odds_up'
                                              arrE.ratioH = item.oddH
                                              arrE.ratioV = item.oddV
                                              setTimeout(()=> {
                                                  arrE.changs_h = false
                                                  arrE.changs_v = false
                                              },10000)
                                          }

                                          break
                                      case 'matchInfoChange' :
                                          if (item.oddsStatus === 1) {
                                              arrE.status = item.oddsStatus
                                              arrE.ratioH = null
                                              arrE.ratioV = null
                                          } else {
                                              arrE.status = item.oddsStatus
                                              arrE.ratioH = item.ratioH
                                              arrE.ratioV = item.ratioV
                                          }
                                          break
                                  }
                              }
                          })
                      })
                  })
              })
          }
        },
        handleSendSign () {
            sessionStorage.removeItem('sign')
            this.postSignS().then(res => {
                if (res) {
                    sessionStorage.setItem('sign',res)
                    this.handleCreate()
                } else {
                    sessionStorage.removeItem('sign')
                }
            })
        },
        handleMatchCountDown () {
            this.matchRef = 60
            this.matchCountDown = setInterval(() => {
                this.matchRef = this.matchRef -1
                if (this.matchRef < 1) {
                     this.matchRef = 60
                     this.handleGetMatches({})
                }
            },1000)
        },
        handleWebSocket () {
          let Wurl =null
          if (sessionStorage.getItem('Tk')){
              //192.168.1.44:18083
              //103.84.109.162:18084
              //103.24.95.153:18083
              //175.176.192.106
              Wurl = 'ws://103.84.109.162:18084//ws?token=' + sessionStorage.getItem('Tk')
              this.socket = new WebSocket(Wurl)
              this.socket.onopen = this.webSocketOnOpen
              this.socket.onmessage = this.webSocketOnMessage
              // this.socket.onerror = this.webSocketOnError
              // this.socket.send =  this.webSocketSend
          }
        },
        webSocketOnOpen() {
            this.webSocketSend()
        },
        webSocketOnMessage(e){ //数据接收
            const redata = JSON.parse(e.data);
            this.handleUpdateOdds(redata.content, redata.method)
            // console.log(redata.content)
        },
        webSocketSend () {
            // this.socket.send(JSON.stringify({gId: "all"}))
            if (this.socket.readyState === this.socket.OPEN) {
                this.socket.send(JSON.stringify({gId: "all"}))
            } else if (this.socket.readyState === this.socket.CONNECTING) { // 若是 正在开启状态，则等待300毫秒
                let that = this // 保存当前对象this
                setTimeout(function () {
                    that.socket.send(JSON.stringify({gId: "all"}))
                }, 300)
            }
        }
        // webSocketOnError(e) { //错误
        //     console.log("WebSocket连接发生错误" +e);
        // },
    },
    watch :{
        betMoney (nev) {
            this.winMoney =  Number(this.betShowObj.odds * nev) + Number(nev)
            this.winMoney = this.winMoney.toFixed(2)
            this.betObj.money = nev
        },
        selectLang (nev) {
            if (nev === 'EN') {
                this.eventList = ['', 'Today', 'Early Market', 'Live', '', 'COMBO']
            } else {
                this.eventList = [ '','今日赛事', '早盘赛事', '滚球赛事', '', '混合过关']
            }
        }
    }
 }
</script>
<style scoped lang="scss">
    .hm-HeaderModule {
        display: table;
        table-layout: fixed;
        width: 100%;
        /*background-color: #212b38;*/
        min-width: 1023px;
        .hm-HeadModule_Primary {
            display: flex;
            padding: 0 25px;
            height: 50px;
            .hm-HeaderModule_Logo {
                display: table-cell;
                width: 200px;
                height: 100%;
                background-position: 0 50%;
                background-repeat: no-repeat;
                background-image: url('../assets/bluegreenF.png');
            }
            .hm-HeaderModule_Logo.H{
                display: none;
            }
            .hm-HeaderModule_title{
                display: table-cell;
                height: 100%;
                vertical-align: bottom;
                padding: 10px;
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
        .hm-BigButtons.H,.hm_L.H,.hm-HeaderModule_title.H,.hm_style.H{
            display: none;
        }
        .hm-BigButtons_Inner {
            display: table;
            table-layout: fixed;
            margin: 0 auto;
            height: 100%;
            border-spacing: 15px 0;
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
        }
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
                width: 50px;
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
                padding: 0 10px;
            }
        }
        .hm-Clock{
            color:#fff;
        }
        .hm_L, .hm_style {
            position: relative;
            height: 100%;
            color: #cffbff;
            .hm_L_ch{
                display: inline-flex;
                align-items: center;
                height: 100%;
            }
            .hm_L_p{
                display:flex;
                align-items: center;
                padding: 5px 11px;
            }
            .style {
                text-align: center;
                padding: 5px 11px;
            }
            .hm_L_p:hover,.style:hover {
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
        .hm_style {
            padding-left: 50px;
        }
    }
    .wc-PageView {
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

                .ip-ControlBar_BBarItem {
                    padding-left: 10px;
                    font-size: 12px;
                    /*color: #29f3db;*/
                    display:table-cell;
                    vertical-align: top;
                    height: 25px;
                    width: 220px;
                    padding-top: 4px;
                    pointer-events: auto;
                    span {
                        color: #cffbff;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .ip-ControlBar_BBarItem_c {
                        width: 36%;
                        text-align: center;
                    }
                    .ip-ControlBar_BBarItem_b {
                        width: 64%;
                        color: #29f3db;
                    }
                }
                .ip-ControlBar-btn{
                    position: absolute;
                    right: 17px;
                    top: 4px;
                    height: 80%;
                    /*background-color: #151f2b;*/
                    .m_r {
                        margin-right: 5px;
                    }
                }
                .fa-o-btn {
                    position: relative;
                    display: inline-block;
                    height: 100%;
                }
                .fa-o-ul {
                    position: absolute;
                    width: 100%;
                    z-index: 100;
                    text-align: center;
                    background-color: #151f2b;
                    border: 1px solid #3e4d5f;
                    color: #fff;
                    li {
                        padding: 3px 0;
                    }
                    li:hover {
                        background-color: #6b7177;
                    }
                }
                .ip-ControlBar_select {
                    position: absolute;
                    top: 20px;
                    width: 80px;
                    z-index: 150;
                    height: 70px;
                    text-align: center;
                    color: #cffbff;
                    background-color: #1b232d;
                    border: 1px solid #3e4d5f;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: height .1s ease-in-out;
                }
                .ip-ControlBar_select.H {
                    height: 0;
                    overflow: hidden;
                    border: none;
                    transition: height .1s ease-in-out;
                }
                .ip-ControlBar_p {
                    height: 50%;
                    line-height: 3;
                    input {
                        vertical-align: middle;
                    }
                }
                .ip-ControlBar_p:hover {
                    background-color: #6b7177;
                }
                .ip-ControlBar_msg{
                    display: table-cell;
                    top: 0;
                    right: 120px;
                    width: 76.1%;
                    height: 25px;
                    line-height: 25px;
                    color: #e4e4e4;
                    .ip-msg{
                        position: absolute;
                        width: 75.5%;
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
                transition: opacity .2s ease-in-out;
            }
            .ipn-Class_Label.ipn-ClassftnBtn_cls{
                opacity: 0;
                visibility: hidden;
                overflow: visible;
                transition: opacity .2s ease-in-out;
            }
            .ipn-Bar_C.ipn_right{
                background-image: url(../assets/right.svg);
                cursor: pointer;
            }
            .ipn-Scroller_Content {
                max-width: 213px;
                color: #c6fbff;
                .account {
                    padding:5px 8px;
                    color: #c6fbff;
                }
                .account.my {
                    color: #f60;
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
            .ipn-EventViewN_rollBd.hide {
                display: none;
            }
            .ipn-EventViewN_rollBd {
              display: block;
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
            p.ipn-EventViewN_row.b_btm {
                border-bottom: 1px solid #504545;
            }
            p.ipn-EventViewN_row.ipw_h {
                height: 0;
                overflow: hidden;
                transition: height .3s ease-in-out;
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
                transition: right .2s;
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
                transition: opacity, width .2s ease-in-out;
                -moz-osx-font-smoothing: grayscale;
            }
            .ipe-EventVScroller {
                position: relative;
                border-right: 1px solid #373737;
                height: 100%;
                color: #fff;
            }
            .ipe-EventVScroller_title{
                /*padding-right: 17px;*/
                table {
                    width: 99.1%;
                }

            }
            .ipe-Event_ContentContainer {
                overflow-y: scroll;
                overflow-x: hidden;
                height: calc(100vh - 151px)
            }
            .ipe-table, .ipe-EventVScroller_title{
                width: 100%;
                text-align: center;
                .live_frame{
                    position: relative;
                    margin: 0 auto;
                    width: 558px;
                    height: 236px;
                    .frame,.frame_r {
                        width: 100%;
                        height: 100%;
                    }
                    .frame_r {
                        width: 96%;
                    }
                    >div {
                     position: absolute;
                     left: 46%;
                     top:45%
                    }
                }
                .data-key {
                    display: none;
                }
                .in_block.reBor{
                 border-bottom:none;
                 border-top: none;
                 /*background-color: #1b232d;*/
                }
                .col-pad {
                    position: relative;
                    padding: 3px 0;
                    text-align: left;
                }
                .fs td {
                    padding: 7px 0;
                    font-weight: 700;
                }
                .ipe-bor,.col-hdp{
                    width: 18%;
                }
                .ipe-table-sc-table{
                    width: 100%;
                }
                .col-names{
                    width: 30%;
                }
                .ipe-table-bg{
                    /*background-color: #212b38;*/
                    display: flex;
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
                .col_body.col_body_b {
                    /*border-bottom: none;*/
                    padding-bottom: 0;
                }
                .col_body_live {
                    position: absolute;
                    z-index: 100;
                    left: 50px;
                    width: 30px;
                    height: 30px;
                    background: url(../assets/giphy.gif) no-repeat center center;
                    background-size: 100% 100%;
                }
                .clover_body {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 150;
                    background-image: url("../assets/OddsLock@2x.png");
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: 15px 20px;
                }
                .col_body_live.big {
                    left: 90px;
                }
                .col_body.live {
                    background-color: #7b6204;
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
            div.bet_R{
                display: flex;
                position: absolute;
                right: 20px;
                top: 6px;
                width: 60px;
                height: 30px;
                z-index: 100;
                span{
                    display: inline-block;
                    width: 30px;
                    height: 100%;
                    font-size: 16px;
                    line-height: 1.8;
                    color: red;
                }
            }
            div.bet_R.R {
                right: -9px;
            }
            .bet_ref {
                display: inline-block;
                width: 30px;
                height: 30px;
                cursor: pointer;
                background: url("../assets/CNGaming.png") no-repeat center center;
                background-size: 100% 100%;
            }
            .bet_ref.r {
                position: absolute;
                right: 12px;
                top: 40px;
            }
            .bet_ref.sync_skip {
                animation: ship 1s linear infinite;
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
    @media (min-width: 1109px) {
        .hm-BigButtons_Inner {
            border-spacing: 20px 0;
        }
    }
    @keyframes ship {
        0% {
            transform: rotate(0deg);
            opacity: .2;
        }
        50% {
            transform: rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: rotate(360deg);
            opacity: .2;
        }
    }
</style>