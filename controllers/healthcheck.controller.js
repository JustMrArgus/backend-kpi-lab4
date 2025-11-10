const checkServerHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    date: new Date().toISOString(),
  });
};

module.exports = {
  checkServerHealth,
};
