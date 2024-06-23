const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));

app.get("/questions", (req, res) => {
  const topic = req.query.topic;

  let questions = [];

  if (topic === "Technology") {
    questions = [
      { id: 1, text: "What is your preferred IDE?" },
      { id: 2, text: "How do you keep up with new technology trends?" },
      { id: 3, text: "Which programming languages are you proficient in?" },
      { id: 4, text: "What is your favorite development framework?" },
    ];
  } else if (topic === "Health") {
    questions = [
      { id: 1, text: "Do you follow a specific diet?" },
      { id: 2, text: "How often do you visit a doctor?" },
      { id: 3, text: "What type of exercise do you prefer?" },
      { id: 4, text: "How many hours do you sleep per night?" },
    ];
  } else if (topic === "Education") {
    questions = [
      { id: 1, text: "What was your favorite subject in school?" },
      { id: 2, text: "Do you prefer online or in-person classes?" },
      { id: 3, text: "What is your highest level of education?" },
      { id: 4, text: "Do you plan to pursue further education?" },
    ];
  }

  res.json({ questions });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
