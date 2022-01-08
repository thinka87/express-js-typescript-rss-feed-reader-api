// handle a request if url path is not found
const notFoundHelper = (req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      error: "Page not found",
    });
};

module.exports = notFoundHelper