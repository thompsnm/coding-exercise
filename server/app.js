const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.send({ message: "Hello from Express!" });
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));