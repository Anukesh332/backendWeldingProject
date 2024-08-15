const express = require("express");
var swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { Pcategoryrouter } = require("./routes/Pcategoryrouter");
const { Egcrouter } = require("./routes/Egcrouter");
const { Wldinspagyrouter } = require("./routes/Wldinspagyrouter");
const { Deptmstrouter } = require("./routes/Deptmstrouter");
const { Backgastyperouter } = require("./routes/Backgastyperouter");
const { Commonrouter } = require("./routes/Commonnrouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 5000;


var app = express();
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/pcategory", Pcategoryrouter);
app.use("/wldinspagy", Wldinspagyrouter);
app.use("/egc", Egcrouter);
app.use("/deptmst", Deptmstrouter);
app.use("/backgastype", Backgastyperouter);
app.use("/common", Commonrouter);
app.listen(PORT, () => {

  console.log("Server is running..");

});

module.exports = app



// java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8000 -sharedDb