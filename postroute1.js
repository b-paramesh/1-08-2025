const express = require('express');
const app = express();
app.post('/students', (req, res) => {
const name = req.query.name;
const rollno = req.query.rollno;
const cgpa=req.query.cgpa;
res.json({
message: "Data received via query params",
name: name,
rollno: rollno,
cgpa:cgpa
});
});
app.listen(3000, () => {
console.log("Server is running on http://localhost:3000");
});