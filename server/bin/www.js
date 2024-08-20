import setting from "../server.js";
const { app, port } = setting;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
