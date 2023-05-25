const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
//let ejs = require('ejs');

console.log(date);

const app = express();
const port = 3000;
const items = ["Buy Foos", "Cook food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", (req, res) => {
    
    const item = req.body.newItem;

    console.log(req.body.list);

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }

})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Click on http://localhost:${port} to check`);
});