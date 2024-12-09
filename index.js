import express from "express";

const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let array = [];
//array.push(data);
//array.push({title:"", content:"<em>No hay posts aun, crea uno en NUEVO 👉👆</em>"});

let n = 1;

app.get("/", (req, res) => {
    let revArray = [...array].reverse();
    console.log("Array:");
    console.log(array);
    res.render("index.ejs", {revArray});
  });

app.get("/new", (req, res) => {
    res.render("new.ejs");
  });
   

app.post("/submit", (req, res) => {
    let data = {title:"",content:"", active:"yes"};
    data.n = n++;
    data.title=req.body.title;
    data.content=req.body.content.replace(/\n/g, '<br>');
    console.log("req:")
    console.log(data);
    array.push(data);
    
    app.get(`/edit/${data.n}`, (req,res) => {
      
      app.post(`/update/${data.n}`, (req,res) => {
        array[data.n-1].title = req.body.title;
        array[data.n-1].content = req.body.content.replace(/\n/g, '<br>');
        res.redirect("/");
      });

      console.log("n:");
      console.log(data.n);
      console.log("res:");
      console.log(array[data.n-1]);
      let dat = array[data.n-1];
      res.render("edit.ejs", {dat});
    });

    app.get(`/del/${data.n}`, (req,res) => {
        array[data.n-1].active="no";
        console.log("deleted:");
        console.log(data);
        res.redirect("/");
    })

    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})