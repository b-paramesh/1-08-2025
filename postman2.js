const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/students', (req, res) => {
const data = req.body;
if (!data.name || !data.rollno || !data.cgpa) {
return res.status(400).send("Missing required fields: name, rollno, or cgpa");
}
console.log("Name: ", data.name);
console.log("Roll No: ", data.rollno);
console.log("CGPA: ", data.cgpa);
res.send("Student data received successfully");
});
app.listen(PORT, (err) => {
if (err) {
console.error("Server error:", err);
} else {
console.log("Server listening on PORT", PORT);
}
});