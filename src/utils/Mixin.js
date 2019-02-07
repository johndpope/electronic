import { mapActions, mapMutations, mapState } from 'vuex'
import _ from 'lodash'
let MyMixin = {
  data () {
    return {
        msgList: [],
        refMoney: false,
        startTime: new Date(),
        endTime: new Date(),
        bulletinObj: {
            pageNum: 1,
            pageSize: 50
        },
        pendBetting: false,
        betShowObj: {},
        maxRight: true,
        betMoney: '',
        winMoney: '',
        oddsChoose: true,
        countDownFn : null,
        time: new Date(),
        system: null,
        coord_Y: null,
        box: null,
        con: null,
        barBox: null,
        bar: null
    }
  },
  computed : {
     ...mapState([ 'countDown', 'betItemList', 'betObj' ]),
  },
  methods: {
    ...mapActions([  'postInitESportBulletinS', 'postLeaguesS', 'postUserInfoS',
        'postMultiTicketS', 'postMixParlayInfoS' ]),
    ...mapMutations([ 'refreshMoney', 'updateLimit', 'startCountDown', 'changeCountDown',
        'updateParlayObj', 'changeBetBoxShow', 'deleteMixListItem' ]),
    formattingTime (data,type) {
      let timer = new Date(data)
      let y, m, d, h, M, S
      y = timer.getFullYear() + '-'
      m = (timer.getMonth() + 1) < 10 ? '0' + (timer.getMonth() + 1) + '-' : (timer.getMonth() + 1) + '-'
      d = timer.getDate() < 10 ? '0' + timer.getDate() + ' ' : timer.getDate() + ' '
      h = timer.getHours() < 10 ? '0' + timer.getHours() + ':' : timer.getHours() + ':'
      M = timer.getMinutes() < 10 ? '0' + timer.getMinutes() + ':' : timer.getMinutes() + ':'
      S = timer.getSeconds() < 10 ? '0' + timer.getSeconds() : timer.getSeconds()
      if (type ==='ss') {
          timer = y + m + d + h + M + S
      } else if (type === 'dd') {
          d = timer.getDate() < 10 ? '0' + timer.getDate(): timer.getDate()
          timer = y + m + d
      } else {
          m = (timer.getMonth() + 1) < 10 ? '0' + (timer.getMonth() + 1) : (timer.getMonth() + 1)
          timer = y+m
      }
      return timer
    },
    handleGetBulletin () {
        this.postInitESportBulletinS(this.bulletinObj).then(res => {
            this.msgList = res.list
        }).catch(err => {
            this.$refs.layer.open(err.msg,true,false,1000)
        })
    },
    handleGetLeagues () {
          this.sendChild.leaguesList = []
          this.sendChild.showModal = true
          let data = {
              rtype: this.eventType
          }
          if (this.selectEvent === 'All' || !this.selectEvent ) {
              data.category = ''
          } else {
              data.category = this.selectEvent
          }
          if (window.location.href.indexOf('results')!== -1) {
              data.date = this.formattingTime(this.time, 'dd')
          }
          this.postLeaguesS(data).then(res => {
              if (res && !res.msg) {
                  res.forEach(arr => {
                      arr.entity.forEach(arr1 =>{
                          this.sendChild.leaguesList.push(arr1)
                      })
                  })
              }
          })
      },
    handleShowFirst () {
        this.$nextTick(() => {
            setTimeout(() => {
                let eventBody = document.querySelectorAll('.map_body')
                eventBody.forEach(arr => {
                    let mapLi = arr.querySelectorAll('.select_map li')
                    let eventList = arr.querySelectorAll('.data-key')
                    if (mapLi.length > 0) {
                        mapLi.forEach(arr => {
                            arr.classList.remove("BtnHl")
                        })
                        mapLi[0].classList.add("BtnHl")
                        eventList.forEach(arr => {
                            arr.style.display = 'none'
                            if (arr.getAttribute('data-key') === '1') {
                                arr.style.display  = 'block'
                                let Tl = arr.querySelector('.sel')
                                let Tr = arr.querySelector('.favSel')
                                if(Tl.innerHTML.indexOf('MAP') === -1 ||Tr.innerHTML.indexOf('MAP') === -1 ) {
                                    Tl.innerHTML = `${Tl.innerHTML}(MAP 1)`
                                    Tr.innerHTML = `${Tr.innerHTML}(MAP 1)`
                                }
                            }
                        })
                    }
                })
            }, 100)
        })
    },
    handleRefUserInfo () {
        this.refMoney = true
        this.postUserInfoS().then(res => {
              if(res && !res.code) {
                  this.refreshMoney(res.amount)
                  setTimeout(() => {
                      this.refMoney = false
                  },1000)
              }
          })
      },
    handleRefOdds () {
          if (this.betObj.oddsId && this.betObj.team) {
              let data = {
                  oddsId: this.betObj.oddsId,
                  team: this.betObj.team
              }
              this.postMultiTicketS(data).then(res => {
                  if ( typeof res === 'object' && !res.msg) {
                      this.updateLimit(res)
                  } else {
                      this.$refs.layer.open(res.msg,true,false,1500)
                      this.handleCountDown('cl')
                  }
              })
          }
      },
    handleGetMixList () {
          let data = _.cloneDeep(this.betItemList)
          if (data.length === 0) {
              return false
          }
          data.map(arr => delete arr.gid)
          this.postMixParlayInfoS(JSON.stringify(data)).then(res => {
              if (typeof res === 'object' && !res.msg) {
                  res.oddList.forEach(arr => {
                      arr.changeOdds = false
                      arr.msg = null
                  })
                  this.updateParlayObj(res)
              } else {
                  this.$refs.layer.open('请稍后再试',true,false,1000)
                  this.deleteMixListItem()
                  return false
              }
          })
    },
    handleClickQBet (cl) {
          this.pendBetObj = {}
          if (cl) {
              this.handleCountDown('cl')
              this.changeCountDown(10)
              this.changeBetBoxShow()
              return
          }
          this.betObj.TOKEN = sessionStorage.getItem('Tk')
          if (this.betObj.money < this.betLimit.minStake || this.betObj.money > this.betLimit.maxStake) {
              this.$refs.layer.open(this.$t('lang.home.bet_tzxe'),true,false,2000)
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
              this.handleCountDown('cl')
              if (res && !res.code) {
                  this.$refs.layer.open(this.$t('lang.home.bet_xzcg'),true,false,1000)
                  this.pendBetObj = res
                  this.betMoney = null
                  this.pendBetting = true
                  this.pendBetObj.betTime = this.formattingTime(this.pendBetObj.betTime,'ss')
                  this.pendBetObj.date = this.formattingTime(this.pendBetObj.betTime,'dd')
                  this.oddsChoose = true
                  this.handleRefUserInfo()
                  this.changeBetBoxShow()
              } else {
                  this.$refs.layer.open(this.$t('lang.home.pageView_rule'),true,true)
              }
          }).catch(err => {
              this.$refs.layer.open(err.msg,true,false,2000)
          })
      },
    handleCountDown (type) {
          if (type === 'ref') {
              this.changeCountDown(10)
              this.handleRefOdds()
          } else if (type === 'cl') {
              clearInterval(this.countDownFn)
          }
          else {
              this.countDownFn = setInterval(() => {
                  this.startCountDown()
                  if (this.countDown < 1) {
                      this.changeCountDown(10)
                      this.handleRefOdds()
                  }
              },1000)
          }
    },
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
    ScrollBar(ele){
     let that = this;
     this.coord_Y = null;
     this.box = document.querySelector(ele);
     this.con = this.box.firstElementChild;
     this.con.insertAdjacentHTML('afterend','<div class="barBox"><div class="bar"></div></div>')
     this.barBox = this.box.querySelector('.barBox');
     this.bar = this.box.querySelector('.bar');
     this.setStyle();
     // this.mouseDown(function(res){
     //    if(res === 'success'){
     //        that.mouseMove();
            that.mouseUp();
        // }
    // });
    this.system = window.navigator.userAgent.toLowerCase();
    this.mouseScroll();
},
    setStyle:function(){
          var that = this;
          var ab = 'absolute',
              re = 'relative',
              p = 'position',
              h = 'height',
              w = "width",
              l = 'left',
              r = 'right',
              t = "top",
              bs = 'box-shadow',
              bs_v = 'inset 0 0 6px rgba(0, 0, 0, .3)',
              ten = '10px',
              bg = "background",
              bg_v = "rgba(230, 230, 230, .5)",
              br = 'border-radius',
              c = 'cursor';
          that.box.style['overflow'] = 'hidden';
          that.box.style[p] = re;
          that.barBox.style[w] = ten;
          that.barBox.style[p] = ab;
          that.barBox.style[t] = '0%';
          that.barBox.style[r] = 0;
          that.barBox.style[h] = '100%';
          that.barBox.style[bs] = bs_v;
          that.con.style[w] = '99.2%';
          that.con.style[p] = ab;
          that.con.style[l] = 0;
          that.con.style[t] = 0;
          that.bar.style[w] = '10px';
          that.bar.style[h] = '50px';
          that.bar.style[p] = ab;
          that.bar.style[t] = 0;
          that.bar.style[r] = 0;
          that.bar.style[bg] = bg_v;
          that.bar.style[bs] = bs_v;
          that.bar.style[br] = '4px';
          that.bar.style[c] = 'pointer';
      },
    // mouseDown:function(callback){
    //       var that = this;
    //       document.onmousedown = function(e){
    //           var el = e || window.event;
    //           if(el.preventDefault()){
    //               el.preventDefault();
    //           }else{
    //               el.returnValue = false;
    //           }
    //           that.coord_Y =el.clientY-that.bar.offsetTop; //当前鼠标在Bar所点击的位置
    //           callback('success')
    //       }
    //   },
    // mouseMove:function(){
    //       var that = this;
    //       document.onmousemove=function(e){
    //           var el = e || window.event;
    //           var top = el.clientY - that.coord_Y; //当前bar距顶部的距离
    //           if(top <= 0){
    //               top = 0;
    //           }
    //           if(top >= that.bar_maxLen()){ //超出最大距离就为最大距离
    //               top = that.bar_maxLen();
    //           }
    //           var scale = top / that.bar_maxLen()//获取bar移动的比率
    //           var con_top = scale * that.con_maxLen()//用bar的移动比率计算content距顶部的距离
    //           that.bar.style.top = top + 'px'
    //           that.con.style.top = -con_top + 'px' //注意：content的距离应该是相反的
    //       }
    //   },
    mouseUp:function(){
          document.onmouseup=function(){
              document.onmousemove=null;
          }
      },
    mouseScroll:function(){
          var that = this;
          if(that.system.indexOf('firefox')!=-1){ //火狐浏览器
              that.box.addEventListener('DOMMouseScroll',function(e){
                  e.preventDefault();
                  let top = null
                  if (e.detail<0) {
                       top = that.con.offsetTop+20;
                      that.setVal(top)
                  }
                  if (e.detail>0) {
                       top = that.con.offsetTop-20;
                      that.setVal(top)
                  }
              })
          }else{ //其他浏览器
              that.box.onmousewheel = function(e){
                  var el = e || window.event;
                  if(el.preventDefault()){
                      el.preventDefault();
                  }else{
                      el.returnValue = false;
                  }
                  let top = null
                  if(el.wheelDelta>0){
                       top = that.con.offsetTop+20;
                      that.setVal(top)
                  }
                  if(el.wheelDelta<0){
                       top = that.con.offsetTop-20;
                      that.setVal(top)
                  }
              }
          }
      },
    bar_maxLen:function(){
        if (this.con.clientHeight < this.box.clientHeight) {
            return false
        }
          var that = this;
          return that.barBox.clientHeight - that.bar.clientHeight; //bar的最大距离；
      },
    con_maxLen:function(){
          var that = this;
          return that.con.clientHeight - that.box.clientHeight;////主内容距顶部的距离
      },
    setVal:function(top){
        if (this.con.clientHeight < this.box.clientHeight) {
            return false
        }
          var that = this;
          if(top >= 0){
              top = 0;
          }
          if(top <= -that.con_maxLen()){
              top = -that.con_maxLen()
          }
          var scale = top / that.con_maxLen();
          var barTop = scale * that.bar_maxLen();
          that.bar.style.top = -barTop + 'px';//注意：bar的距离应该是相反的
          that.con.style.top = top + 'px';
      }
  }
}

export default MyMixin
