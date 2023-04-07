import jwt from "jsonwebtoken";

export function auth(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, async (err, _decoded) => {
        if (!err) {
          next();
        } else {
          res.status(401).send({message:"unauthorized"});
        }
      });
    } else {
      res.status(401).send({message:"unauthorized"});
    }
  }