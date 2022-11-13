const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema.js');
const mongoString = require('./mongoString');

const app = express();

app.use('/graphql',graphqlHTTP({
	schema: schema,
	graphiql: true,
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});

mongoose.connect(`mongodb+srv://Bean:qya5q5D7voEjOek0@cluster0.8j8hhhd.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

mongoose.connection.once('open', () => {
	console.log('connected to database');
});
