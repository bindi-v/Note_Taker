const express = require('express');
const htmlRoutes = require('./routes/home_routes');
const apiRoutes = require('./routes/api_routes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
