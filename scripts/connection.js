let meno;
let score;
const express = require('express');
const mysql = require('mysql');

//create connection

const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'highscore'
});

//connect

db.connect((err)=> {
    if(err) {
        throw err;
    }
    console.log('MySql Connected...');
});

// Select all records
    let sql = 'SELECT * FROM top10';
    db.query(sql, (err, results) => {
        if(err) throw err;
        let string = JSON.stringify(results);
        console.log(string);
        let json = JSON.parse(string);
        meno = json[0].meno;
        score = json[0].score;
        console.log("Meno: " + meno + " | Score: " + score  );
    }
);

const app = express();

app.listen('3000', () => {
    console.log('Server started on port 3000');
})