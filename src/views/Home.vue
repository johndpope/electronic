<template>
    <div class="home">
        <div class="hm-HeaderModule ">
            <div class="hm-HeaderModule_Primary ">
                <a class="hm-HeaderModule_Logo ">
                </a>
                <div class="hm-BigButtons hm-BigButtons-noscrollernative ">
                    <nav class="hm-BigButtons_Inner ">
                        <a class="hm-BigButton ">今日</a>
                        <a class="hm-BigButton hm-BigButton_Highlight ">早盘</a>
                        <a class="hm-BigButton ">滚球</a>
                    </nav>
                </div>
            </div>
            <div class="hm-HeaderModule_Secondary ">
                <div class="hm-HeaderModule_TimeLastLogin ">
                    <time class="hm-Clock ">10:37:37 GMT+8</time>
                </div>
                <div class="hm-HeaderModule_Menus ">
                    <div></div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <a class="hm-DropDownSelections_Button hm-DropDownSelections_DropLink ">
                            <span class="hm-DropDownSelections_Highlight ">我的投注</span>
                        </a>
                    </div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <a class="hm-DropDownSelections_Button hm-DropDownSelections_DropLink ">
                            <span class="hm-DropDownSelections_Highlight ">账目</span>
                        </a>
                    </div>
                    <div class="hm-LanguageDropDownSelections hm-DropDownSelections ">
                        <a class="hm-DropDownSelections_Button hm-DropDownSelections_DropLink ">
                            <span class="hm-DropDownSelections_Highlight ">账户</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="wc-PageView ">
            <div class="wc-PageView_Main wc-InPlayPage_MainContainer ">
                <div class="ip-ControlBar ">
                        <div class="ip-ControlBar_ButtonBar ">
                            <div class="ip-ControlBar_BBarItem wl-ButtonBar_Selected ">
                                Dota 2 今日赛事
                            </div>
                        </div>
                    </div>
                <div class="ipe-EcventViewView ">
                        <div class="ipn-EventViewNavigation ipn-EventViewNavigation-expanded">
                            <div :class="sidebar ? 'ipn-EventViewNavigation_Classifications ipn-EventViewNavigationNativeScroller_Content' : 'ipn-EventViewNavigation_Classifications ipn-EventViewNavigationNativeScroller_Content ipn-EventViewNavigation-scrollcollapse'">
                                <div :class="sidebar ?'ipn-ControlBar ' :'ipn-ControlBar ipn-Classification-closed'">
                                    <span :class="sidebar?'ipn-ControlBar_CollapseButton':'ipn-ControlBar_CollapseButton ipn_right'" @click="sidebar = !sidebar"></span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                    <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                   <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                   <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                    <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                    <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                    <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                <div :class="sidebar ? 'ipn-Classification' :'ipn-Classification ipn-Classification-closed'">
                                    <span class="ci-ClassificationIcon ci-ClassificationIcon-12 ipn-ClassificationButton_Icon "></span>
                                    <span :class="sidebar ? 'ipn-ClassificationButton_Label':'ipn-ClassificationButton_cls ipn-ClassificationButton_Label'">美式足球</span>
                                </div>
                                    </div>
                        </div>
                        <div class="ipe-EventViewDetail ">
                            <div class="ipe-EventViewDetailNativeScroller ipe-EventViewDetailNativeScroller-scrollable  ">
                                <div class="ipe-EventViewDetailNativeScroller_ContentContainer ">
                                    <div class="ipe-EventViewDetail_MarketGrid gl-MarketGrid ">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="wc-PageView_RightColumn wc-InPlayPage_RightColumn wc-InPlayPage_RightColumnStandard "></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        components: {},
        data () {
            return {
                sidebar: true
            }
        },
        mounted () {},
        methods: {}
    }
</script>
<style scoped lang="scss">
    .hm-HeaderModule, .hm-HeaderModule_Primary {
        display: table;
        table-layout: fixed;
        width: 100%;
    }
    .hm-HeaderModule {
        background-color: #14805e;
        min-width: 1023px;
    }
    .hm-HeaderModule_Primary {
        padding: 0 25px;
        border-bottom: 1px solid #189970;
    }
    .hm-HeaderModule, .hm-HeaderModule_Primary {
        display: table;
        table-layout: fixed;
        width: 100%;
    }
    .hm-HeaderModule_Logo {
        display: table-cell;
        width: 119px;
        height: 25px;
        background-position: 0 50%;
        background-repeat: no-repeat;
        background-image: url(../assets/ds.svg);
    }
    .hm-BigButtons-noscrollernative {
        padding-right: 16px;
    }
    .hm-BigButtons {
        display: table-cell;
        width: auto;
        vertical-align: middle;
        text-align: center;
    }
    .hm-BigButtons_Inner {
        display: table;
        table-layout: fixed;
        margin: 0 auto;
        border-spacing: 15px 0;
    }
    @media (min-width: 1109px) {
        .hm-BigButtons_Inner {
            border-spacing: 20px 0;
        }
    }
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
    .hm-HeaderModule_Secondary {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        height: 30px;
        padding: 0 25px;
        position: relative;
    }
    .hm-HeaderModule_TimeLastLogin {
        -webkit-flex: 1 0 auto;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        vertical-align: middle;
        font-size: 11px;
        color: #4acfa5;
    }
    .hm-HeaderModule_Menus {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        text-align: right;
        font-size: 11px;
        color: #4acfa5;
    }
    .hm-HeaderModule_Link {
        display: inline-table;
        position: relative;
        line-height: 28px;
        margin-right: 25px;
    }
    .hm-DropDownSelections {
        position: relative;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
    }
    .hm-LanguageDropDownSelections {
        display: inline-table;
        position: relative;
        margin-right: 25px;
    }
    .hm-DropDownSelections_DropLink {
        display: inline-block;
        line-height: 28px;
        color: #4acfa5;
    }
    .hm-DropDownSelections_Highlight {
        color: #e4e4e4;
        margin-left: 6px;
    }
    .hm-BigButton_Highlight {
        color: #fff;
        border-bottom-color: #ffdf1b;
    }
    .wc-PageView {
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        min-width: 1023px;
    }
    .wc-InPlayPage_MainContainer.wc-PageView_Main {
        display: block;
        -ms-overflow-style: none;
    }
    .wc-PageView_Main {
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        width: auto;
        position: relative;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        overflow: hidden;
    }
    .ip-ControlBar {
        background-color: #474747;
        border-bottom: 1px solid #303030;
    }
    .ip-ControlBar_ButtonBar {
        display: inline-block;
        -webkit-flex: 1 0 auto;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        text-align: right;
        padding-left: 15px;
        pointer-events: none;
    }
    .ip-ControlBar_BBarItem {
        font-size: 12px;
        color: #bbb;
        display: inline-block;
        vertical-align: top;
        line-height: 29px;
        pointer-events: auto;
        padding-right: 25px;
    }
    .ip-ControlBar_BBarItem.wl-ButtonBar_Selected {
        color: #ffdf1b;
    }
    .ipe-EventViewView {
        display: table;
        table-layout: fixed;
        width: 100%;
    }
    .ipn-EventViewNavigation {
        transition-timing-function: cubic-bezier(.77, 0, .175, 1);
        background-color: #333;
        transition: width .2s ease-in-out;
        width: 214px;
        cursor: pointer;
        display: table-cell;
        vertical-align: top;
        border-right: 1px solid #303030;
        position: relative;
    }
    .ipn-Classification.ipn-Classification-closed,.ipn-ControlBar.ipn-Classification-closed{
        min-width: 64px;
        transition: min-width .2s ease-in-out;
    }
    .ipn-ClassificationButton_Label.ipn-ClassificationButton_cls{
        opacity: 0;
        visibility: hidden;
        overflow: visible;
        transition: opacity .2s ease-in-out;
    }
    .ipn-EventViewNavigation-expanded .ipn-ControlBar_CollapseButton.ipn_right{
        background-image: url(../assets/right.svg);
    }
    .ipn-ClassificationButton_Icon {
        position: absolute;
        right: 17px;
        top: 0;
        width: 24px;
        height: 28px;
        transition: right .2s;
        background-size: auto 15px;
        background-image: url(../assets/ftb.svg);
    }
    .ipn-EventViewNavigation-expanded .ipn-EventViewNavigationNativeScroller {
        transition-duration: .2s;
        background-color: #333;
    }
    .ipn-EventViewNavigationNativeScroller {
        height: 100%;
        overflow: hidden;
        z-index: 20;
    }
    .ipn-EventViewNavigationNativeScroller_ContentContainer {
        overflow: auto;
        transition: width .2s ease-in-out;
        max-height: calc(100vh - 132px);
    }
    .ipn-EventViewNavigationNativeScroller_Content {
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
        transition: border, background-color, width .2s ease-in-out;
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
        max-width: 213px;
        height: 30px;
        line-height: 30px;
        max-height: 30px;
        position: relative;
        top: 0;
        color: #e4e4e4;
        background-color: #25765c;
        border-bottom: 1px solid #274526;
        transition: min-width .3s ease-in-out;
    }
    .ipn-Classification-closed
    .ci-ClassificationIcon-12.ci-ClassificationIcon {
        top: 1px;
        position: absolute;
        right: 17px;
        width: 24px;
        height: 28px;
        transition: right .3s;
        background-image: url(../assets/ftb.svg);
        background-repeat: no-repeat;
        background-size: auto 14px;
    }
    .ci-ClassificationIcon {
        display: block;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: auto 17px;
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
        transition: opacity, width .3s ease-in-out;
    }
    .ipe-EventViewDetail {
        display: table-cell;
        width: 100%;
    }
    .ipe-EventViewDetailNativeScroller {
        position: relative;
        border-right: 1px solid #373737;
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
        transition-duration: .2s;
        pointer-events: none;
    }
    .ipe-EventViewDetailNativeScroller_Content {
        border-right: 1px solid #373737;
    }
    .wc-PageView_RightColumn {
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        background-color: #474747;
        position: relative;
        transition-timing-function: cubic-bezier(.77,0,.175,1);
        transition-duration: .3s;
        transition-property: width,min-width;
        width: 277px;
        max-width: 592px;
        border-left: 2px solid #4d4d4d;
    }
    .wc-InPlayPage_MainContainer+.wc-InPlayPage_RightColumnStandard, .wc-MyBetsPage_MainContainer+.wc-InPlayPage_RightColumnStandard {
        width: 300px;
    }
    .wc-PageView_RightColumn {
        -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        background-color: #474747;
        position: relative;
        transition-timing-function: cubic-bezier(.77,0,.175,1);
        transition-duration: .3s;
        transition-property: width,min-width;
        width: 277px;
        max-width: 592px;
        border-left: 2px solid #4d4d4d;
    }
    .ipn-EventViewNavigation-scrollcollapse {
        overflow: hidden;
        width: 64px;
        padding-right: 14px;
    }
</style>