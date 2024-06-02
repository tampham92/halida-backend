const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const route = require('./route');
const cors = require('cors');

app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(cors())
app.use(route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})