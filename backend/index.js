import express from "express"
import mysql from "mysql"
import Cors from "cors"
const app =express()
app.use(express.json())
app.use(Cors())
const PORT = process.env.PORT || 8080

const db= mysql.createConnection({
    host:"localhost:3306",
    user:"root",
    password:"12345",
    database:""
})
app.get("/",(req,res)=>{
    res.json("Hello this is the backend")
})
app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q ="INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values=[ 
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("BOOK HAS BEEN CREATED SUCCESSFULLY")
    })
})
app.delete("/books/:id", (req,res)=>{ 
    const bookId= req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("BOOK HAS BEEN DELETED SUCCESSFULLY")
    })
})
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json("BOOK HAS BEEN UPDATED SUCCESSFULLY");
    });
  });

app.listen(PORT,()=>{
    console.log("API working!")
})