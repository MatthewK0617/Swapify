// const db = require('../config/db');
// const sql_db = require('./sql_db.js');
import db from '../../config/db.js';

export const login = (req, res) => {
    const email = req.query.gmail;
    // fetch data from login
    db.query(`SELECT * FROM ?? WHERE email=?`, ['users', email], (err, fetchedInfo) => {
        if (err) console.log(err);
        else {
            res.send(fetchedInfo);
        }
    })
}

export const signup = (req, res) => {
    const user = req.body.userInfo;
    console.log(user);
    db.query(`INSERT INTO ?? (username, first, last, email, password) VALUES (?, ?, ?, ?, ?)`, ["users", "testing", user.first, user.last, user.email, "NA"], (err) => {
        if (err) console.log(err);
        else {
            db.query(`SELECT * FROM ?? WHERE email=?`, ['users', user.email], (err, fetchedInfo) => {
                if (err) console.log(err);
                else {
                    res.send(fetchedInfo);
                }
            })
        }
    })
}