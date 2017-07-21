<template>
  <div>

    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'projectmanage',
    methods: {
      selectMenu ($index) {
        console.log($index)
      }
    }
  }
</script>

<style>
  #app {
    padding: 0px 0;
  }

  .ivu-breadcrumb {
    padding-bottom: 15px;
  }

  /* CSS */
</style>
