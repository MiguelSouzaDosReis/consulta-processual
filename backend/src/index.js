const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
require("./config/database");

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
