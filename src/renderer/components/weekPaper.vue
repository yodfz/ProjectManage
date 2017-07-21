<template>
  <div class="weekPaper">
    <MainMenu/>
    <div class="weekPaperItems">
      <h2>本周任务</h2>
      <p v-for="item,$index in data">{{$index+1}}.{{item.title}}</p>
      <h2>下周任务</h2>
      <p v-for="item,$index in nodata">{{$index+1}}.{{item.title}}</p>
    </div>
  </div>
</template>
<script type="text/babel">
  import MainMenu from './Main/MainMenu.vue'
  import model from '../../model'
  export default {
    components: {
      MainMenu
    },
    computed: {},
    props: [],
    data () {
      return {
        data: [],
        nodata: []
      }
    },
    methods: {
      showPaper ($startDate, $endDate) {
        let that = this
        model.todolist.find({successDate: {$gte: $startDate, $lte: $endDate}, isSuccess: true}, (err, docs) => {
          if (err) {

          }
          console.log(docs)
          that.data = docs
        })

        model.todolist.find({isSuccess: false}, (err, docs) => {
          if (err) {

          }
          console.log(docs)
          that.nodata = docs
        })
      }
    },
    beforeDestroy () {
    },
    mounted () {
      const nowWeekDate = (new Date()).getDay()
      const oneDay = 86400000
      const baHours = 8 * 60 * 60 * 1000
      let startDate = new Date((+new Date()) - (oneDay) * (nowWeekDate - 1))
      console.log(startDate)
      startDate = startDate.getFullYear() + '-' + ((startDate.getMonth() + 1) < 10 ? '0' : '') + (startDate.getMonth() + 1) + '-' + ((startDate.getDate() * 1) < 10 ? '0' : '') + startDate.getDate()
      console.log(startDate)
      const endDate = (+new Date())
      this.showPaper(+new Date(startDate) - baHours, endDate)
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .weekPaper {
  }

  .weekPaperItems {
    padding: 15px 30px;
    line-height: 30px;
  }

  .weekPaperItems h3 {
    padding-top: 10px;
  }
</style>
