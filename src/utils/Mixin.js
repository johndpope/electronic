import { mapActions } from 'vuex'
let MyMixin = {
  data () {
    return {
        msgList: [],
        bulletinObj: {
            pageNum: 1,
            pageSize: 10
        }
    }
  },
  methods: {
    ...mapActions([  'postInitESportBulletinS', 'postLeaguesS' ]),
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
        })
    },
    handleGetLeagues () {
          this.sendChild.leaguesList = []
          this.sendChild.showModal = true
          let data = {
              rtype: this.eventType
          }
          if (this.selectEvent && this.selectEvent !== '全部赛事') {
              data.category = this.selectEvent
          }
          this.postLeaguesS(data).then(res => {
              if (res && !res.msg) {
                  res.forEach(arr => {
                      arr.entity.forEach(arr1 =>{
                          console.log(arr1)
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
                        mapLi[0].classList.add("BtnHl")
                        eventList[1].style.display = 'block'
                        let Tl = eventList[1].querySelector('.sel')
                        let Tr = eventList[1].querySelector('.favSel')
                        Tl.innerHTML = `${Tl.innerHTML}(MAP 1)`
                        Tr.innerHTML = `${Tr.innerHTML}(MAP 1)`
                    }
                })
            },100)
        })
    }
  }
}

export default MyMixin
