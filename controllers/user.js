const { nanoid } = require('nanoid');

const createUser = (req, res) => {
  const { name } = req.body;
  userId = nanoid();
  return res.status(200).json({userId: userId});
}

module.exports = {
  createUser
}
