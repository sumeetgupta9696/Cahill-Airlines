const app = require("./app");

const ping = require("./routes/ping");
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const purchase = require("./routes/purchase");
const addflight = require("./routes/addflight");
const deleteFlight = require("./routes/deleteFlight");
const getAllFlight = require("./routes/getAllFlight");
const createbooking = require("./routes/createbooking");
const searchFlight = require("./routes/searchFlight");
const bookings = require("./routes/mybooking");

app.use("/api/ping", ping);
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", profile);
app.use("/api/purchase", purchase);
app.use("/api/addflight", addflight);
app.use("/api/deleteFlight", deleteFlight);
app.use("/api/getAllFlight", getAllFlight);
app.use("/api/createbooking", createbooking);
app.use("/api/searchFlight", searchFlight);
app.use("/api/bookings", bookings);

require("./config/mongoose");

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
