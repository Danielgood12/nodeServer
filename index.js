const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const dataPath = "./data.json";
const fs = require("fs");

app.get('/api/data',(req,res)=>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err)  throw err
        arr1 = JSON.parse(data)
        console.log(arr1.slice(-1)[0]);
        arr1 = arr1.slice(-1)[0]
        
        

        res.send(arr1);
    })
})


app.post("/api/data", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) throw err;
    //query , body , params
    // temperature humidity
    var input = { temperature: req.query.t, humidity:req.query.h};
    console.log(data);

    var originData = JSON.parse(data);
    console.log(originData);
    originData.push(input);
    console.log(originData);
    fs.writeFile(dataPath, JSON.stringify(originData), (err) => {
      if (err) throw err;
      console.log("Data written to file");
      res.send(originData);
    });
  });
});

app.listen(5000, () => console.log("Server started on port 5000"));
