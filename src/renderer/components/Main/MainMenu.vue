<template>
  <div class="menu">
    <router-link to="/">项目列表</router-link>
    <router-link to="weekPaper">生成周报</router-link>
    <a href="">任务完成曲线</a>
    <a href="">查看项目报告</a>
  </div>
</template>
<script type="text/babel">
  export default {
    components: {},
    computed: {},
    props: [],
    data () {
      return {}
    },
    methods: {},
    beforeDestroy () {
    },
    mounted () {
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .menu {
    height: 51px;
    border-bottom: 1px solid #e9eaec;
    line-height: 50px;
    background-color: #2b85e4;
  }

  .menu a {
    color: #fff;
    display: inline-block;
    width: 100px;
    text-align: center;
  }

  .menu a:hover {
    background-color: #5cadff;
  }
</style>
