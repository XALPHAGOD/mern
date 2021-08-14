const errHandler = (err, req, res, next) => {
  res.json({
    msg: err.message,
    stack: process.env.ENV === "prod" ? null : err.stack,
  });
};

module.exports = errHandler;
