const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Connection = require('../config/mysql-config');

router.get('/login' , (req,res)=>{
    res.render('login');
});

router.post('/login' , (req,res) => {
    let correo_bdy = req.body.correo_bdy;
    let contrasenia_bdy = req.body.contrasenia_bdy;

    let querySentence = 'select * from usuario where correo = ?';
    Connection.query(querySentence , correo_bdy , (error , results , fields)=>{
        if(results.length <= 0){
            res.send("[]");
        }
        if(error){
            res.render("error");
        }
        bcrypt.compare(contrasenia_bdy , results[0].contrasenia).then(compared_result=>{
            if(compared_result == true){
                res.render("home",
                    data = {    
                        nombre:     results[0].nombre,
                        apellidos:  results[0].apellidos,
                        correo:     results[0].correo
                });
            }
            if(compared_result == false){
                res.send("Contraseña o correo incorrecto");
            }
        });         
    });
});


module.exports = router;