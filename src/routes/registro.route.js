const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Connection = require('../config/mysql-config');

router.get('/registro',  (req, res) => {
  let nombre = "Angel";
    res.render('registro', {
      nombre
    });
});

router.post('/registro' ,(req,res) => {
  let nombre_bdy = req.body.nombre_bdy;
  let apellidos_bdy = req.body.apellidos_bdy;
  let correo_bdy = req.body.correo_bdy;
  let contrasenia_bdy = req.body.contrasenia_bdy;
  

  const querySentece = "INSERT INTO usuario(nombre,apellidos,correo,contrasenia)VALUES (?)";

    bcrypt.genSalt(10 , async(err , salt) => {
      await bcrypt.hash(contrasenia_bdy , salt , (err , password_hashed)=>{
        if(err){
          res.render("error");
        }
      const datos = [nombre_bdy , apellidos_bdy , correo_bdy , password_hashed];
      Connection.query(querySentece , [datos] , (err , response)=>{
        if(err){
          res.render("error");
        }
        else{
          res.render('login');
        }
      });
    });
  });
});



module.exports = router;