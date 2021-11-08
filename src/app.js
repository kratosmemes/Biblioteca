const express = require('express');
const app = express();

const morgan = require('morgan');
const path = require('path');

//Middlewares}
app.use(express.static(path.join(__dirname , "/public/")));
app.use(morgan('dev'));
app.use(express.urlencoded(true));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('./routes/routes.main'));
app.all('*' , (req,res)=>{
	res.send('Esta pagina no existe');
});


app.listen(3000 , () => {
	console.log("Server working");
});
