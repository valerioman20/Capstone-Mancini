// middlewares/errorHandlers.js

export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
      return res.status(400).send(err.message || "Bad Request");
    }
    next(err);
  };
  
  export const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
      return res.status(401).send(err.message || "Unauthorized");
    }
    next(err);
  };
  
  export const notFoundHandler = (req, res, next) => {
    res.status(404).send("Not Found");
  };
  
  export const genericErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message || "Internal Server Error");
  };
  