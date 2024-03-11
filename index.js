const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();

app.use(express.urlencoded({extended : false}));

app.get("/users" , (req,res) =>{

    const html = 
    `<ul>
    ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>

    `
    res.send(html);
})

app.get("/api/users/:id" , (req,res) =>{

   const id = Number(req.params.id);
   const user = users.find((user) => user.id === id);
   if(!user) {
    return res.status(404).json("user not found");
   }
   return res.json(user);
})

app.post("/api/user" ,(req,res)=>{

    const body_m = req.body;
    if(!body_m || !body_m.first_name || !body_m.last_name || !body_m.gender || !body_m.job_title)
    {
        return res.status("400").json("all field required...");
    }
    users.push({...body_m, id: users.length  + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>
    {
        return res.status("201").json(users.length);
    });
    
   
})


app.listen(8000,()=>{
    console.log("server started");
})
