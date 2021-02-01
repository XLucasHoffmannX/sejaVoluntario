const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database(
    './db/voluntarios.db',
    sqlite3.OPEN_READWRITE,
    err=>{
        if(err){
            console.log(err.message);
            return
        }
        console.log('succes, connected in voluntarios.db');
    },
)
// routes
router.get('/', (req, res, next)=>{
    const query = /*sql*/`
        SELECT id, email, description, title, country
        FROM anuncios
        ORDER BY id DESC
        LIMIT 10
    `
    db.all(query, (err, vagas)=>{ 
        if(err){
            console.log(err.message);
            return next(err)
        }
        res.render('index', { vagas });
    })
});

router.get('/search', (req, res, next)=>{
    const query = /*sql*/`
        SELECT id, email, description, title, country
        FROM anuncios
        WHERE LIKE(?, LOWER(country || description ||title))
        ORDER BY id DESC;
    `

    if(req.query.key){
        db.all(query, [`%${req.query.key}%`], (err, vagas)=>{
           if(err){
               console.log(err.message);
               return next(err)
           } 
           res.render('busca', {vagas, key:req.query.key});
        })
    } else {
        res.render('busca')
    }
});

router.get('/register', (req, res)=>{ res.render('cadastro.html')});

router.post('/register', (req, res, next)=>{
    const query = /*sql*/`
        INSERT INTO anuncios (email,description,title,country)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [req.body.email, req.body.description, req.body.title, req.body.country], err=>{
        if(err){
            console.log(err.message);
            return next(err)
        }
        res.redirect('/');
    })
});

router.get('/ad/:id', (req, res, next)=>{
    const query = /*sql*/`
        SELECT id, email, description, title, country
        FROM anuncios
        WHERE id = ?
    `;
    if(req.params.id){
        db.get(query, [req.params.id], (err, vaga)=>{
            if(err){
                console.log(err.message);
                return next(err);
            }
            res.render('anuncio', {vaga})
        })
    }
})

module.exports = router