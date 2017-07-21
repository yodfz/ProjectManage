var Datastore = require('nedb')
const path = require('path')
var db = {}
db.project = new Datastore(path.join(__dirname, '/../db/project.db'))
db.todolist = new Datastore(path.join(__dirname, '/../db/todolist.db'))
db.user = new Datastore(path.join(__dirname, '/../db/user.db'))

Object.keys(db).forEach(p => {
  db[p].loadDatabase()
})

export default db
