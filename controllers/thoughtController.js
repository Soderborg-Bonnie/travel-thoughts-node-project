const Thoughts = require("../models/Thoughts");

exports.listAllThoughts = (req, res) => {
  Thoughts.find({}, (err, thought) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(thought);
  });
};

exports.createNewThought = (req, res) => {
  let newThought = new Thoughts(req.body);
  newThought.save((err, thought) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(thought);
  });
};

exports.readThought = (req, body) => {
  Thoughts.findById(req.params.thoughtsid, (err, thought) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(thought);
  });
};

exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.thoughtsid },
    req.body,
    { new: true },
    (err, thought) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(thought);
    }
  );
};

exports.deleteTask = (req, res) => {
  Thoughts.remove({ _id: req.params.thoughtsid }, (err, thought) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
};
