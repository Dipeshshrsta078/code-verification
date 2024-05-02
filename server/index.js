// Main starting file
const express = require("express");
const cors = require("cors");

const app = express();

// cors
app.use(cors());
// Middlewares
app.use(express.static(__dirname)); // built-in middleware
// third party middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/verify", (req, res) => {
  const { code } = req.body;
  if (code.length !== 6 || code.charAt(5) === "7") {
    res.status(400).json({ message: "Verification Error" });
  } else {
    res.status(200).json({ message: "Success" });
  }
});

// port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
