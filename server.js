var express = require('express'),
	bodyParser = require('body-parser'),
	_ = require('lodash'),
	app = express();

var PORT = 3000;

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// POSTS DATA
var posts = [
	{ id: 1, title: 'How to train a dragon', description: 'Step 1: Find Dragon, Step 2: Train dragon, Step 3: Watch Inside Out cause it is a really good pixar movie. Toy Story 3 is pretty good too. Lorem ipsum.' },
	{ id: 2, title: 'Where are the wild things?', description: 'In a book.' },
	{ id: 3, title: 'Am I cool enough to use react?', description: 'Yes. React is for the cool kids. Can you say isomorphic javascript? No? Me neither.' },
	{ id: 4, title: 'NaNaNaNaNaN Batman!', description: 'The Dark Knight Rises is a good movie.' }
];

app.get('/api/posts/:id', function(req, res){
	console.log(req.params);
	var post = _.find(posts, function(post) {
	     return  post.id == req.params.id;
	});
	console.log(post);
	res.json(post);
});

app.get('/api/posts', function(req, res){
	res.json(posts);
});

// ROUTES
app.get('/', function(req, res){
	res.sendFile('index.html');
});

// Start server
app.listen(PORT, function(){
  console.log('Server listening on port ' + PORT)
});