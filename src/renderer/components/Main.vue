<template>
  <div class="index">
    <div class="projects">
      <div class="item" v-for="item in data">
        <div class="title">
          <Icon type="ios-arrow-right"></Icon>
          {{item.title}}
        </div>
        <div class="circle" v-if="item.allTodoCount>0">
          <i-circle :percent="(item.okTodoCount/item.allTodoCount*100).toFixed(0)*1" :size="60">
            <span class="demo-i-circle-inner" style="font-size:12px">{{(item.okTodoCount/item.allTodoCount*100).toFixed(0)}}%</span>
          </i-circle>
        </div>
        <div class="buttonGroup">
          <Button type="text" icon="log-in" size="large" @click="goProject(item)">进入项目</Button>
          <Dropdown style="margin-left: 20px" trigger="click" @on-click="deleteProject">
            <a href="javascript:void(0)">
              其他
              <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item :name="'users,' + item._id">参与开发者</Dropdown-item>
              <Dropdown-item :name="'setting,' + item._id">设置</Dropdown-item>
              <Dropdown-item :name="'tiemline,' + item._id">查看时间线</Dropdown-item>
              <Dropdown-item :name="'delete,' + item._id">删除项目</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div class="content">
          <span class="content_item">
                      当前进度: {{item.okTodoCount}}/{{item.allTodoCount}}
          </span>
          <span class="content_item content_success">
                      已完成: {{item.okTodoCount}}
          </span>
          <span class="content_item content_error">
                      延期: {{item.errorTodoCount}}
          </span>
          <span class="content_item">
            <!--结束时间:-->
            <!--<Date-picker-->
            <!--:open="item.open"-->
            <!--:value="item.endDate"-->
            <!--confirm-->
            <!--type="date"-->
            <!--@on-change="handleChange"-->
            <!--@on-clear="handleClear"-->
            <!--@on-ok="handleOk(item)">-->
            <!--<a href="javascript:void(0)" @click="handleClick(item)">-->
            <!--<Icon type="ios-calendar-outline"></Icon>-->
            <!--<template v-if="!item.endDate">选择日期</template>-->
            <!--<template v-else>{{item.endDate}}</template>-->
            <!--</a>-->
            <!--</Date-picker>-->
            <!--(延期10天)-->
          </span>
        </div>
      </div>
    </div>
    <a @click="addProject">
      <Tooltip class="addProject" placement="top" content="新增项目">
        <Icon type="ios-plus-empty"></Icon>
      </Tooltip>
    </a>
  </div>
</template>
<script type="text/babel">
  import model from '../../model'

  export default {
    data () {
      return {
        data: [],
        open: false,
        value3: ''
      }
    },
    methods: {
      handleClick ($item) {
        console.log($item)
        $item.open = !$item.open
      },
      handleChange (date) {
        console.log(this)
        this.endDate = date
      },
      handleClear () {
        this.open = false
      },
      handleOk ($item) {
        $item.open = false
      },
      goProject ($item) {

      },
      deleteProject ($item) {
        let action = $item.split(',')
        let that = this
        let fnMap = {
          delete () {
            model.project.remove({_id: action[1]}, {}, function (err, numRemoved) {
              // numRemoved = 1
              if (err) {
              }
              if (numRemoved > 0) {
                that.$Message.success('删除成功')
                that.loadData()
              }
            })
          }
        }
        fnMap[action[0]] && fnMap[action[0]]()
        console.log($item)
      },
      loadData () {
        const msg = this.$Message.loading({
          content: '正在加载中...',
          duration: 0
        })
        let that = this
        console.log(model)
//      model.project.insert({title: '国联项目'}, function (err, newDoc) {   // Callback is optional
//        console.log(err, newDoc)
//      })
        model.project.find({}, (err, docs) => {
          console.log(err, docs)
          docs = docs.map(p => {
            // 查询进度
            // 查全部
            model.todolist.count({Pid: p._id}, function (err, count) {
              // count equals to 3
              if (err) {
              }
              let item = that.data.find(d => d._id === p._id)
              if (item) {
                item.allTodoCount = count
              }
            })
            // 查已完成
            model.todolist.count({Pid: p._id, status: 1}, function (err, count) {
              // count equals to 3
              if (err) {
              }
              let item = that.data.find(d => d._id === p._id)
              if (item) {
                item.allTodoCount = count
              }
            })
            // 计算百分比
            return Object.assign({}, {
              open: false,
              endDate: null,
              // 所有任务
              allTodoCount: 0,
              // 已完成任务
              okTodoCount: 0,
              // 延期任务
              errorTodoCount: 0
            }, p)
          })
          this.data = docs.sort((a, b) => {
            return a.createDate < b.createDate
          })
          msg()
        })
      },
      addProject () {
        console.log('add')
        let that = this
        this.$Modal.confirm({
          onOk () {
            if (!that.addProjectValue) return
            model.project.insert({title: that.addProjectValue, createDate: (+new Date())}, function (err, newDoc) {
              if (err) {
              }
              if (newDoc) {
              }
              that.loadData()
            })
          },
          render: (h) => {
            return h('Input', {
              props: {
                value: '',
                autofocus: true,
                placeholder: '请输入新项目的名字'
              },
              on: {
                input: (val) => {
                  that.addProjectValue = val
                }
              }
            })
          }
        })
      }
    },
    mounted () {
      this.loadData()
    }
  }
</script>
<style scope>
  .title {
    line-height: 60px;
    font-size: 16px;
    color: #1c2438;
  }

  .title .ivu-icon {
    margin-right: 10px;
  }

  .content {
    padding-bottom: 10px;
    padding-left: 18px;
    color: #495060;
  }

  .content_item {
    padding-right: 10px;
  }

  .content_success {
    color: #19be6b;
  }

  .content_error {
    color: #ed3f14;
  }

  .circle {
    position: absolute;
    height: 60px;
    width: 60px;
    top: 15px;
    right: 150px;
  }

  .buttonGroup {
    position: absolute;

    top: 10px;
    width: 120px;
    right: 0;
  }

  .item {
    position: relative;
    padding: 0 20px;
    min-height: 60px;
    border-bottom: 1px solid #e9eaec;
  }

  .item:hover {
    /*background-color: #f8f8f9;*/
  }

  .addProject {
    position: fixed;
    right: 30px;
    bottom: 20px;
    color: #2d8cf0;
    font-size: 40px;
  }
</style>
