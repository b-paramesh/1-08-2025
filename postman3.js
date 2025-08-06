const express = require('express');
const fs = require('fs');
const bp = require('body-parser');
const app = express();
const port = 6003;
let stu = require('./students.json');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.get("/", (req, res) => {
res.send("<h3>Welcome to Express REST API SERVER</h3>");
});
app.get("/list", (req, res) => {
fs.readFile("students.json", (err, data) => {
if (err) {
console.error("Error reading file:", err);
res.status(500).send("Internal server error");
return;
}
res.type("json").send(data);
});
});



app.post("/students", (req, res) => {
const newstu = req.body;
stu.push(newstu);
mywrite(stu);
res.send("Student inserted successfully");
});


app.put("/students", (req, res) => {
const upstu = req.body;
if (!upstu || !upstu.name || !upstu.roll) {
return res.status(400).send("Invalid update data. 'name' and 'roll' are required.");
}
let found = false;
for (let s in stu) {
if (stu[s]["roll"] == upstu["roll"]) {
stu[s]["name"] = upstu["name"];
mywrite(stu);
res.send("Student updated successfully");
found = true;
return;
}
}
if (!found) {
res.status(404).send("Student not found");
}
});


app.delete("/students", (req, res) => {
const delstu = req.body;
if (!delstu || !delstu.roll) {
return res.status(400).send("Invalid delete request. 'roll' is required.");
}
const index = stu.findIndex(s => s.roll == delstu.roll);
if (index !== -1) {
stu.splice(index, 1);
mywrite(stu);
res.send("Student deleted successfully");
} else {
res.status(404).send("Student not found");
}
});
function mywrite(data) {
fs.writeFile("students.json", JSON.stringify(data, null, 2), (err) => {
if (err) console.error("Error writing file:", err);
});
}
app.listen(port, () => {
console.log("Server started on port " + port);
});