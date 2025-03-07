const User = require("../models/User");

exports.updateUserProfile = async (req, res) => {
  const { userId, name, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
