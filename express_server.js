var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080

var cookieParser = require('cookie-parser');
var app = express()
app.use(cookieParser())

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h','i','j','k','l','m','n','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];

function generateRandomString() {
  var randomAlphas = '';
  for (var i = 0; i < 6; i++){
    var number = Math.floor(Math.random()*alphabet.length);
    randomAlphas += alphabet[number];
  }
  return randomAlphas;
}

var users = {
  "user@example.com": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2@example.com": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  },
  "user3@example.com": {
    id: "user3RandomID",
    email: "user3@example.com",
    password: "tatti"
  },
  "user4@example.com": {
    id: "user4RandomID",
    email: "user4@example.com",
    password: "kamine"
  }
}
//generateRandomString();

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "8qp9PO": "http://www.youtube.com"
};

app.get("/", (req, res) => {
  res.redirect("urls_new");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies.username };
  res.render("urls_index", templateVars);
})

app.get("/urls/new", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],
    username: req.cookies.username
     };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],
    username: req.cookies.username
     };
  res.render("urls_show", templateVars)
})

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  console.log("longURL is" + longURL);
  res.redirect(longURL);
});

app.get("/register", (req, res) =>{
  res.render("urls_register", {message: null})
})

app.get("/login", (req, res) =>{
  res.render("urls_login")
})

app.post("/urls", (req, res) => {
  let o = generateRandomString();
  //console.log(o);
  let longURL = req.body.longURL;
  //console.log(longURL);
  urlDatabase[o] = longURL;
  //console.log(urlDatabase);
  res.redirect("/urls/" + o);
  //console.log(req.body);  // debug statement to see POST parameters
  //res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars)
});

app.post("/urls/:id/update", (req, res) => {
  let longURL = req.body.longURL;
  urlDatabase[req.params.id] = longURL;
  res.redirect("/urls")
})

app.post("/login", (req, res) =>{
  res.cookie('username', req.body.username);
  console.log('this', req.body.username);
  if(req.body.username){
    res.redirect("/urls/new")
  }
  else{
    res.redirect("/register")
  }
  //console.log(req.body.username + "****************************THIS ONE********************");


})

app.post("/logout", (req, res) => {
res.clearCookie('username');
res.redirect("/urls/new")
})

app.post("/register", (req, res) => {
  let userID = generateRandomString();
  let userEMAIL = req.body.email;
  let userPASSWORD = req.body.password;
  if(userEMAIL === '' || userPASSWORD === ''){
    res.statusCode = 400;
    let message = {message: "email and/or password can't be empty. D'uh."}
    res.render("urls_register", message);
  }
  // else{
  //   if(userEMAIL){
  //     res.statusCode = 400;
  //     res.render("/register")
  //   }
  //   res.redirect("/urls/new")
  // }
  users[userEMAIL] = {
    id: userID,
    email: userEMAIL,
    password: userPASSWORD
  }
  res.cookie("username", userEMAIL);
  console.log(users);

  res.redirect("/urls/new")
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}!`);
});