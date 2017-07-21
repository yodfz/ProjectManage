<template>
  <div class="index">
    <Breadcrumb>
      <Breadcrumb-item href="/">项目主页</Breadcrumb-item>
      <Breadcrumb-item href="/components/breadcrumb">当前项目:</Breadcrumb-item>
    </Breadcrumb>
    <Tabs value="name1">
      <Tab-pane label="全部" name="name1">全部</Tab-pane>
      <Tab-pane label="进行中" name="name2">进行中</Tab-pane>
      <Tab-pane label="已超时" name="name3">已c</Tab-pane>
      <Tab-pane label="完成" name="name4">已c</Tab-pane>
    </Tabs>
  </div>
</template>
<script type="text/babel">
  export default {
    components: {},
    computed: {},
    props: [],
    data () {
      return {
        data: []
      }
    },
    methods: {},
    beforeDestroy () {
    },
    mounted () {

    }
  }
</script>
<style>

</style>
