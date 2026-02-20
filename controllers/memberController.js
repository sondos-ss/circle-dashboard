const Member = require("../models/member");

const getMembers = async (req, res) => {
  try {
    const { subcircle, level, search } = req.query;
    let filter = {};
    if (subcircle) filter.subcircle = subcircle;
    if (level) filter.level = level;
    if (search) filter.name = { $regex: search };
    const members = await Member.find(filter);
    res.render("index", {
      members,
      search: req.query.search || "",
      subcircle: req.query.subcircle || "",
      level: req.query.level || "",
    });
  } catch (error) {
    res.send("Error loading members");
  }
};

const addMember = async (req, res) => {
  try {
    await Member.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};

const editMember = async (req, res) => {
  try {
    await Member.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getMembers,
  addMember,
  editMember,
  deleteMember,
};
