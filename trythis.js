const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h','i','j','k','l','m','n','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];

function generateRandomString() {
  var randomAlphas = '';
  for (var i = 0; i < 6; i++){
//var randomAlphas = [];
    var number = Math.floor(Math.random()*alphabet.length);
//console.log(alphabet[number]);
    randomAlphas += alphabet[number];
  }
console.log(randomAlphas);
return randomAlphas;
}
generateRandomString();