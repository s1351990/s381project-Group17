const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 8099;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['yourSecretKey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.set('view engine', 'ejs');

// MongoDB
mongoose.connect('mongodb+srv://lkw1:123@cluster0.wfka4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

// Login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

// Register
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if email already register
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// CRUD
// Create
app.get('/create', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('create');
});

app.post('/create', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  
  const newItem = new Item({
    ...req.body,
    createdBy: req.session.user._id
  });
  await newItem.save();
  res.redirect('/read');
});

// Read
app.get('/read', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const items = await Item.find({ createdBy: req.session.user._id }); // Modify this line
    res.render('read', { items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving items");
  }
});

// Update
app.get('/update/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
 
  try {
    const item = await Item.findOne({ _id: req.params.id, createdBy: req.session.user._id }); 
    if (!item) return res.status(404).send('Item not found');
    res.render('update', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving item");
  }
});

// Update
app.post('/update/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.session.user._id }, // Modify this line
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).send('Item not found');
    res.redirect('/read');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating item");
  }
});

// Delete
app.post('/delete/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, createdBy: req.session.user._id }); 
    if (!item) return res.status(404).send('Item not found');
    res.redirect('/read');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
