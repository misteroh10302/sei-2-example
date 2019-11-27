const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Fruit = require('./models/fruits.js');
const methodOverride = require('method-override');

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/basiccrud', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true
});
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

// Index
app.get('/fruits', (req, res) => {
	Fruit.find({}, (error, allFruits) => {
		res.render('Index', {
			fruits: allFruits
		});
	});
});

// New
app.get('/fruits/new', (req, res) => {
	res.render('New');
});

// Create
app.post('/fruits/', (req, res) => {
	if (req.body.readyToEat === 'on') {
		req.body.readyToEat = true;
	} else {
		req.body.readyToEat = false;
	}
	Fruit.create(req.body, (error, createdFruit) => {
		res.redirect('/fruits');
	});
});

// show
app.get('/fruits/:id', (req, res) => {
	Fruit.findById(req.params.id, (err, foundFruit) => {
		res.render('Show', {
			fruit: foundFruit
		});
	});
});

// delete
app.delete('/fruits/:id', (req, res) => {
	// res.send('deleting');
	Fruit.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/fruits');
	});
});

// edit
app.get('/fruits/:id/edit', (req, res) => {
	Fruit.findById(req.params.id, (err, foundFruit) => {
		res.render('Edit.jsx', {
			fruit: foundFruit
		});
	});
});

// put
app.put('/fruits/:id', (req, res) => {
	if (req.body.readyToEat === 'on') {
		req.body.readyToEat = true;
	} else {
		req.body.readyToEat = false;
	}
	// res.send(req.body);
	Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
		// res.send(updatedModel)
		res.redirect('/fruits');
	});
});

app.listen(3000, () => {
	console.log('listening');
});
