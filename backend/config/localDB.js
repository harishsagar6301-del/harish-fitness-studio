const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("database/db.json");

const db = new Low(adapter, {
  users: []
});

const connectLocalDB = async () => {

  await db.read();

  db.data ||= {
    users: []
  };

  await db.write();

  console.log("🔥 Local JSON Database Connected");

};

module.exports = {
  db,
  connectLocalDB
};