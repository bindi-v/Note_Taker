const express = require('express');
const router = express.Router();

const fs = require('fs');
const uniqid = require('uniqid');

router.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }else {
            res.json(JSON.parse(data))
        }
    })
} )


router.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }else {
            const dbNotes = JSON.parse(data);
            const newNotes = req.body;
            const noteId = uniqid();
            const idKey = 'id';
            newNotes[idKey] = noteId;
            dbNotes.push(newNotes);
            fs.writeFile('db/db.json', JSON.stringify(dbNotes), (err) => {
                if (err) throw err;
         res.json(dbNotes);
            })
        } 
    })
})

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }else {
            const dbNotes = JSON.parse(data);
            for (let i = 0; i < dbNotes.length; i++){
                if(noteId === dbNotes[i].id){
                    dbNotes.splice([i], 1);
                    fs.writeFile('db/db.json', JSON.stringify(dbNotes), (err) => {
                        if (err) throw err;
                        res.json(dbNotes);  
                    })
                }
            }
        }
    })
})
module.exports = router;