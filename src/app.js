var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('sync-request');
var REST_PORT = (process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

/**
 * Send Welcome
 * Show an inline_keyboard actions in Telegram
 * @param res
 */
function sendWelcome(res) {
	console.log("WELCOME");

	//Create response for Telegram with INLINE_KEYBOARD
	var telegramAnswer = {
		text: "What do you want to do?",
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text: 'Show my contacts', url: "www.google.es"}],
				[{text: 'Show the nearest offices', callback_data: "buttonTextCallback2"}]]
		})
	};

	res.send({
		speech: "BankBotCXLAB Speech",
		displayText: "What do you want to do?",
		source: "BankBot",
		data: {
			telegram: telegramAnswer,
			apibot: {text: "papapapappapapapa"} //Response for own bot
		}
	});
}

/**
 * GetNearOffices
 * Get the nearest offices from DigitalBank server
 * @param res
 */
function getNearOffices(res) {
	console.log("OFFICES");

	var officesResponse = request('POST', 'https://digitalbank-int.gftlabs.com/digitalbank-office/rest/office/branches/find', {
		json: {
			latitude: 41.491488,
			longitude: 2.0732503,
			radius: 10
		}
	});

	var botResponse = {
		speech: "BankBotCXLAB Speech",
		displayText: "The nearest offices are: ",
		source: "BankBot",
		data: officesResponse.getBody('utf8')   //retrieve the response of the server
	};
	res.send(botResponse);
}

/**
 * GetContacts
 * Get contacts of the user
 * CREATE INLINE_KEYBOARD RESPONSE FOR TELEGRAM
 * @param res
 */
function getContacts(res) {
	console.log("CONTACTS");

	//Create static "INLINE_KEYBOARD"
	var telegramAnswer = {
		text : "Select user",
		reply_markup : JSON.stringify({
			inline_keyboard : ["Tim", "Monica", "Lisa", "Jane", "William"]
		})
	};

	res.send({
		speech: "BankBotCXLAB Speech",
		displayText: "You contacts are: ",
		source: "BankBot",
		data: {
			telegram: telegramAnswer
		}
	});
}

/**
 * Confirm Action
 * Confirm action for a transfer/pay/send money....
 * @param res
 */
function confirmAction(res) {
	console.log("CONFIRMATION");

	//Create KEYBOARD buttons for telegram
	var telegramAnswer = {
		text : "Operation summary Action...., Amount...., Addresses to...., Is it okey?",
		reply_markup : JSON.stringify({
			keyboard : [["Yes", "No"]]
		})
	};

	res.send({
		speech: "BankBotCXLAB Speech",
		displayText: "This is my displayText from ViladegutApiBackend",
		source: "BankBot",
		data: {
			telegram: telegramAnswer,
			apibot: {text: "Yes, No"}
		}
	});
}


app.post('/', function (req, res) {
	console.log(req.body.result.action);

	switch(req.body.result.action) {
		case "sayWelcome":
			sendWelcome(res);
			break;

		case "nearOffices":
			getNearOffices(res);
			break;

		case "showContacts":
			getContacts(res);
			break;

		case "confirmAction":
			confirmAction(res);
			break;

		default:
			res.send();
	}

});


app.listen(REST_PORT, function () {
	console.log('Example app listening on port: ' + REST_PORT);
});
