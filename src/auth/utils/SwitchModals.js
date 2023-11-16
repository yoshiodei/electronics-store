export const handleSwitchTerms = (handleCloseReg, handleShowTerms) => {
  handleCloseReg();
  handleShowTerms();
};

export const handleSwitchRegister = (handleCloseTerms, handleShowReg) => {
  handleCloseTerms();
  handleShowReg();
};

export const handleSwitchToSignIn = (handleCloseReg, handleShowLogIn) => {
  handleCloseReg();
  handleShowLogIn();
};

export const handleSwitchToSignUp = (handleCloseSignIn, handleShowReg) => {
  handleCloseSignIn();
  handleShowReg();
};

export const handleSwitchFromForgotPassword = (handleCloseForgotPassword, handleShowSignIn) => {
  handleCloseForgotPassword();
  handleShowSignIn();
};

export const handleSwitchToForgotPassword = (handleCloseSignIn, handleShowForgotPassword) => {
  handleCloseSignIn();
  handleShowForgotPassword();
};
