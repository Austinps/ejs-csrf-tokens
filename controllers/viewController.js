// viewController.js

export const renderLogin = async (req, res, next) => {
  try {
    res.render('login', { error: 'Your error message here' });
  } catch (error) {
    next(error);
  }
};

export const renderRegister = async (req, res, next) => {
  try {
    res.render('register', { error: null, csrfToken: req.csrfToken() });
  } catch (error) {
    next(error);
  }
};
