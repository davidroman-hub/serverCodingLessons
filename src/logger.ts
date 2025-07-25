const log = (
  req: Request,
  res: Response,
  next: import("express").NextFunction
) => {
  console.log("Loggin from middleware");
  next();
};

module.exports = log;
