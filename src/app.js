var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var request = require('sync-request');
var REST_PORT = (process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies


app.post('/', function (req, res) {

	if (req.body.result.action === "nearOffices") {
		var response = request('POST', 'https://digitalbank-int.gftlabs.com/digitalbank-office/rest/office/branches/find', {
			json: {
				latitude: 41.491488,
				longitude: 2.0732503,
				radius: 10
			}
		});
		var message = {
			speech: "ApiBackendNodeViladegut Speech",
			displayText: "This is my displayText from ViladegutApiBackend",
			source: "BankBot",
			data: response.getBody('utf8')
		};
		res.send(message);

/*		axios.post('https://digitalbank-int.gftlabs.com/digitalbank-office/rest/office/branches/find', {
			latitude: 41.491488,
			longitude: 2.0732503,
			radius: req.body.result.parameters.radius
		})
			.then(function (response) {
				//console.log(response.data.result);

				var serviceResponse = createServiceResponse(response.data.result);

				res.send(JSON.stringify(serviceResponse));
			})
			.catch(function (error) {
				console.log(error);
			});*/
	}
	else if (req.body.result.action === "showContacts") {
		console.log("CONTACTS");
		res.send({
			speech: "ApiBackendNodeViladegut Speech",
			displayText: "This is my displayText from ViladegutApiBackend",
			source: "BankBot",
			data: {telegram: {
				reply_markup:{
					keyboard: [
						[{text: 'Yes, you are the bot of my life ❤', callback_data: "buttonTextCallback1"}],
						[{text: 'No, sorry there is another one...', callback_data: "buttonTextCallback2"}]]
				}
			}}
		});
	}
	//res.send('Hello World!');
});

app.listen(REST_PORT, function () {
	console.log('Example app listening on port: ' + REST_PORT);
});



function createServiceResponse(data) {
	console.log(data);
	var message = {
		speech: "ApiBackendNodeViladegut Speech",
		displayText: "This is my displayText from ViladegutApiBackend",
		source: "BankBot"
	};
	return message;
}

function reqWithSync() {
	var res = request('POST', 'https://digitalbank-int.gftlabs.com/digitalbank-office/rest/office/branches/find', {
		json: {
			latitude: 41.491488,
			longitude: 2.0732503,
			radius: 10
		}
	});

	return JSON.parse(res.getBody('utf8'));
	//console.log(response);
}
