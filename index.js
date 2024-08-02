const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    const userId = "john_doe_17091999"; // Replace with actual user_id logic if needed
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
    const highestAlphabet =
      alphabets.length > 0
        ? [
            alphabets.sort((a, b) =>
              b.localeCompare(a, undefined, { sensitivity: "base" })
            )[0],
          ]
        : [];

    const response = {
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
