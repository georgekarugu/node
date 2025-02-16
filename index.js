const startupDebugger=require('debug')('app:startup')
const dbDebugger=require('debug')('app:db')
const config=require('config')
const morgan= require('morgan');
const helmet= require('helmet')
const logger= require('./logger')
const Joi= require('joi');
const courses=require('./courses')
const express= require('express');
const app= express();

app.set('view engine', 'pug');
app.set('views','./views'); //default



// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses)

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env')==='development') {
  app.use(morgan('tiny')); // or 'common', 'dev', 'short', 'tiny'
  startupDebugger('morgan enabled....');
} 

//Db work

dbDebugger('Connected to the database....');




app.use(logger);



app.get('/', (req, res)=>{
  res.render('index', {title: 'My Express App', message:"Hallo"})
});



const port= process.env.PORT || 3000;

app.listen(3000, console.log(`Listening on port ${port}....`));