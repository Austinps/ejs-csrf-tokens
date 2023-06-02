export const setLocalToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
