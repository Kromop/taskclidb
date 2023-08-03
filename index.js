#!/usr/bin/env node

const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

app.listen(PORT, () => console.log(`serveer started on port ${PORT}`))

const { Command } = require('commander');
const program = new Command();

const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: '124578',
    host: "localhost",
    port: 5432,
    database: "ptmk"
})
module.exports = pool

program
  .option('-c', 'create table')
  .option('-i', 'incert into')

program.parse(process.argv);

const options = program.opts();

if (options.c) {
    pool.connect(function(err){
        if(err){
            console.log(err)
        }else{
            let sql = "CREATE TABLE IF NOT EXISTS mytable (name varchar(255), date date, gender varchar(10))";
            pool.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("done")
                }
            })
        }
    })
}



if (options.i) {
    pool.connect(function(err){
        if(err){
            console.log(err)
        }else{
            let sql = "INSERT INTO mytable (name, date, gender) VALUES ('Saunin Evgeniy Nikolaevich', '1980.04.03', 'male')";
            pool.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("done")
                }
            })
        }
    })
}
