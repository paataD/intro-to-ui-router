var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

var PORT = 3000;

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// POSTS DATA
var posts = [
	{ title: 'How to train a dragon', description: 'Step 1: Find Dragon, Step 2: Train dragon, Step 3: Watch Inside Out cause it is a really good pixar movie. Toy Story 3 is pretty good too. Lorem ipsum.' },
	{ title: 'Where are the wild things?', description: 'In a book.' },
	{ title: 'Am I cool enough to use react?', description: 'Yes. React is for the cool kids. Can you say isomorphic javascript? No? Me neither.' },
	{ title: 'NaNaNaNaNaN Batman!', description: 'The Dark Knight Rises is a good movie.' }
];

// ROUTES
app.get('/', function(req, res){
	res.sendFile('index.html');
})

// Start server
app.listen(PORT, function(){
  console.log('Server listening on port ' + PORT)
});