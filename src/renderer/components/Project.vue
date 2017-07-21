<template>
  <div class="projectindex">
    <Breadcrumb>
      <Breadcrumb-item href="/">项目主页</Breadcrumb-item>
      <Breadcrumb-item href="/components/breadcrumb">当前项目:{{project.title}}</Breadcrumb-item>
    </Breadcrumb>
    <Tabs value="name1">
      <Tab-pane label="任务列表" name="name1">
        <div v-for="item in activeData" class="todoitem"
             :class="{isSuccess:item.isSuccess}">
          <div class="deleteline" v-if="item.isSuccess"></div>
          <span @click="handleCheck(item)">
            <Icon :type="!item.isSuccess?'android-radio-button-off':'android-checkmark-circle'"></Icon>
            {{item.title}}</span>
          <span class="deleteBtn" @click="deleteTodo(item)">删除</span>
        </div>

        <div v-for="item in successData" class="todoitem"
             :class="{isSuccess:item.isSuccess}">
          <div class="deleteline" v-if="item.isSuccess"></div>
          <span @click="handleCheck(item)">
            <Icon :type="!item.isSuccess?'android-radio-button-off':'android-checkmark-circle'"></Icon>
            {{item.title}}</span>
        </div>

      </Tab-pane>
      <Tab-pane label="附件" name="name2"></Tab-pane>
      <Tab-pane label="备注" name="name3" style="height:70vh">
        <textarea name="" @keydown="keydown" v-model="textarea" id="" class="textarea"></textarea>
      </Tab-pane>
      <!--<Tab-pane label="完成" name="name4">已c</Tab-pane>-->
    </Tabs>

    <div class="addTodo">
      <Input v-model="inputValue" @on-enter="addTodo" size="large" placeholder="请输入新任务"></Input>
    </div>
  </div>
</template>
<script type="text/babel">
  import model from '../../model'
  export default {
    components: {},
    computed: {
      activeData () {
        return this.data.filter(p => p.isSuccess === false)
      },
      successData () {
        return this.data.filter(p => p.isSuccess !== false)
      }
    },
    props: [],
    data () {
      return {
        project: {},
        inputValue: '',
        data: [],
        textarea: '',
        istextarea: false
      }
    },
    methods: {
      keydown () {
        console.log('keydown')
        console.log(this.textarea)
        model.textarea.update({Pid: this.$route.query.id}, {
          Pid: this.$route.query.id,
          text: this.textarea
        }, (err, numDoc) => {
          console.log(err, numDoc)
        })
      },
      deleteTodo ($item) {
        let that = this
        model.todolist.remove({_id: $item._id}, {}, function (err, numRemoved) {
          // numRemoved = 1
          if (err) {
          }
          if (numRemoved > 0) {
            that.$Message.success('删除成功')
            that.loadData()
          }
        })
      },
      handleCheck ($item) {
        $item.isSuccess = !$item.isSuccess
        $item.successDate = (+new Date())
        model.todolist.update({_id: $item._id}, $item, (err, numDoc) => {
          if (err) {
          }
          if (numDoc) {
            console.log(numDoc)
          }
        })
        console.log($item.isSuccess)
      },
      loadData () {
        let that = this
        model.todolist.find({Pid: this.$route.query.id}, function (err, docs) {
          if (err) {

          }
          console.log(docs)
          that.data = docs
        })
      },
      addTodo () {
        let that = this
        model.todolist.insert({
          title: this.inputValue,
          createDate: (+new Date()),
          user: '',
          Pid: that.$route.query.id,
          endDate: null,
          isSuccess: false
        }, function (err, doc) {
          if (err) {
          }
          console.log(doc)
          that.data = [doc, ...that.data]
          console.log(that.data)
          that.inputValue = ''
        })
      }
    },
    beforeDestroy () {
    },
    mounted () {
      console.log(this)
      let that = this
      model.project.find({_id: this.$route.query.id}, function (err, doc) {
        if (err) {

        }
        console.log(doc)
        if (doc.length > 0) {
          that.project = doc[0]
        } else {
          alert('此项目不存在')
        }
      })
      model.textarea.find({Pid: this.$route.query.id}, function (err, doc) {
        if (err) {

        }
        if (doc.length > 0) {
          that.textarea = doc[0].text
        } else {
          model.textarea.insert({Pid: that.$route.query.id, text: ''}, function (err, doc) {
            if (err) {
            }
            if (doc) {

            }
          })
        }
      })
      this.loadData()
    }
  }
</script>
<style scope>
  .projectindex {
    padding: 20px;
  }

  .addTodo {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 60px;
    padding: 10px 5px 5px 5px;
    border-top: 1px solid #dddee1;
  }

  .todoitem {
    position: relative;
    min-height: 30px;
    line-height: 30px;
    /*border-bottom: 1px solid #e9eaec;*/
  }

  .todoitem span {
    cursor: pointer;
    font-size: 14px;
  }

  .todoitem span i {
    margin: 4px 2px 2px;
  }

  .isSuccess {
    color: #bbbec4;
  }

  .isSuccess span {
    text-decoration: line-through;
  }

  .deleteBtn {
    position: absolute;
    right: 0;
    line-height: 30px;
    color: #2d8cf0;
    text-decoration: underline;
    font-size: 12px !important;
  }

  .textarea {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 0px;
    padding: 10px;
    bottom: 0px;
    background-color: #f8f8f9;
    outline: none;
    border: 0px;
    line-height: 20px;
  }

  .isSuccess .deleteline {
    /*position: absolute;*/
    /*top: 15px;*/
    /*width: 100%;*/
    /*height: 1px;*/
    /*border-bottom: 1px solid #eeeeee;*/
  }
</style>
