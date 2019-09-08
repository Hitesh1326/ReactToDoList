const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
const path = require("path");

app.use(bodyParser.json());

//CONNECTING TO DATABASE
mongoose
  .connect(
    "mongodb+srv://Hitesh:aEJKOzLlMUdAxzdt@firstcluster-b2pbe.gcp.mongodb.net/ReactToDoList",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//CREATING ITEM SCHEMA
const itemSchema = {
  name: String
};

//CREATING ITEM MODEL
const Item = mongoose.model("Item", itemSchema);

//DEFAULT ITEMS
const java = new Item({
  name: "Learn Java"
});

const react = new Item({
  name: "Learn React"
});

const defaultItems = [java, react];

//FETCHING ALL THE ITEMS
app.get("/api/items", function(req, res) {
  Item.find({}, function(e, foundItems) {
    if (foundItems.length == 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  }).then(i => res.json(i));
});

//DELETING ITEM
app.delete("/delete/:id", function(req, res) {
  const itemID = req.params.id;

  Item.findById(itemID).then(i =>
    i.remove().then(() => res.json({ success: true }))
  );
});

//ADDING ITEM
app.post("/add", function(req, res) {
  const itemName = req.body.name;

  const item = new Item({
    name: itemName
  });
  item.save().then(i => res.json(i));
});

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Server Started");
});
