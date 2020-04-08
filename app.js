const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
let { accessDB } = require('./db-seed')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    accessDB.then(function(db) {
        let res = db.exec("SELECT * FROM todos");

        if (res.length >= 1) {
            var data = res[0].values.map((row) => { return row[1] });
        } else {
            var data = ['Add your todos...'];
        }

        return data;
        
    }).then(function(data) {
        res.render('index', { data: data })
    })

})

app.post('/add', (req, res) => {

    let new_todo = req.body.newTodo;

    accessDB.then(function(db) {
        let insert_sql = `INSERT INTO todos VALUES (null, '${new_todo}');`;
        db.run(insert_sql);

        const data = db.export();
        const buffer = Buffer(data);
        fs.writeFileSync('db.sqlite', buffer);

        res.redirect('/');
    })

})

app.delete('/delete/:text', (req, res) => {

    let todo = req.params.text.trim();

    accessDB.then(function(db) {
        let delete_sql = `DELETE FROM todos WHERE todo_text = '${todo}';`;
        db.run(delete_sql);

        const data = db.export();
        const buffer = Buffer(data);
        fs.writeFileSync('db.sqlite', buffer);

        res.send('ok');

    })

})

app.listen(3000, () => {
    console.log("Application started and listening on port 3000...");
})