module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }

  next();
};

//Home ("/") if isLoggedIn (login and signup button) disable

/* let login = document.querySelector(".signup-btn");
let logout = document.querySelector(".logout-btn");

login.addEventListener('click', function(e) {
  this.classList.add('is-hidden')
  logout.classList.remove('is-hidden');
})

logout.addEventListener('click', function(e) {
  this.classList.add('is-hidden');
  login.classList.remove('is-hidden');
}) */