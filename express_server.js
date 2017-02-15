var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080

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
//generateRandomString();

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "8qp9PO": "http://www.youtube.com"
};

//app.get("/", (req, res) => {
  //res.end("Hello!");
//});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
})

app.get("/urls/new", (req, res) => {
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars)
})

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  console.log("longURL is" + longURL);
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  let o = generateRandomString();
  console.log(o);
  let longURL = req.body.longURL;
  console.log(longURL);
  urlDatabase[o] = longURL;
  console.log(urlDatabase);
  res.render("urls_show", {'longURL':longURL, 'shortURL':o});
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}!`);
});