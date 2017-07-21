<template>
  <div>
    <Menu mode="horizontal" active-name="1">
      <Menu-item name="1">
        <Icon type="ios-paper"></Icon>
        项目管理
      </Menu-item>
      <Menu-item name="2">
        <Icon type="ios-people"></Icon>
        开发者管理
      </Menu-item>
    </Menu>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'projectmanage'
  }
</script>

<style>
  #app{
    padding:0px 0;
  }


  .ivu-breadcrumb{
    padding-bottom:15px;
  }
  /* CSS */
</style>
