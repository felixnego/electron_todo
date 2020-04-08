let accessDB = new Promise(function(resolve, reject) {
    
    const fs = require('fs');
    const initSqlJs = require('sql.js');
    const db_name = 'db.sqlite';

    function fileExists(file_path) {
        if (fs.existsSync(file_path)) {
            return true;
        }
        return false;
    }

    initSqlJs().then(function (SQL) {

        if (fileExists('./' + db_name)) {
            const buffer = fs.readFileSync(db_name);
            var db = new SQL.Database(buffer);

        } else {
            var db = new SQL.Database();

            let sql_create = "CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo_text TEXT);";
            sql_create += "INSERT INTO todos VALUES (null, 'this is a filthy test')";
            db.run(sql_create);

            const data = db.export();
            const buffer = Buffer(data);
            fs.writeFileSync('db.sqlite', buffer);

        }

        resolve(db);
    });
})

module.exports = { accessDB };

