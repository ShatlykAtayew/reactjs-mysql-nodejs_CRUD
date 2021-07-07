const express = require("express");
const app= express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "mk25H230jmgsh*",
    database: "deneme"

})

app.post("/create", (req, res) => {
    console.log(req.body)  
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage



    
    db.query(
        "INSERT INTO employee (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            }
              else {
                  res.send("Values inserted");
              }
                
            }
    );
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.log(err);
        }
          else {
              res.send(result);
          }
            
        });
});

app.put('/update', (req, res) => {
    console.log(req.body)
    const id = req.body[0];
    const wage = req.body[5];
    db.query("UPDATE employee SET wage = ? WHERE id = ?", [wage,id],
    (err, result) => {
        if (err) {
            console.log(err);
        }
          else {
              res.send(result);
          }
        });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
          else {
              res.send(result);
          }
    })
})

app.listen(3001, () => {
    console.log("Server received your request, everything is OK!")
});
