exports.upload = function(request, response) {
    console.log(`Rozpoczynam przetwarzać żądanie upload`);
    response.write(`Rozpoczyna upload`);
    response.end();
}

exports.welcome = function(request, response) {
    console.log(`Rozpoczynam przetwarzać żądanie welcome`);
    response.write(`Witaj na stronie`);
    response.end();
}

exports.error = function(request, response) {
    console.log(`Nie wiem co robić`);
    response.write(`404`);
    response.end();
}