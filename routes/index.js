import express from 'express';
import db from '../db/db';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.render('index', { title: 'Express' })
);

router.route('/paste/:author')
	/* GET all Pastes by author */
    .get((req, res) => { 
    	db.Paste.find({ 'author': req.params.author }, (err, pastes) => {
    		if (err || pastes === null || pastes.length === 0)
    			res.status(404).send({ error: 'No Pastes made by this Author' });
    		else
    			res.status(200).send(pastes);
    	});
    })
    /* POST new Paste */
    .post((req, res) => {
    	let paste = new db.Paste();
    	paste.title = req.body.title;
    	paste.body = req.body.body;
    	paste.author = req.params.author;
    	paste.date = Date();
    	paste.syntax = req.body.syntax;
    	paste.save((err, paste) => {
    		if (err || paste === null)
    			res.status(500).send({ error: "Error saving paste to DB" });
    		else {
    			console.log(`New Paste: ${paste.body}`);
    			res.status(200).send(paste);
    		}
    	});
    });

router.route('/paste/:id')
	/* DELETE a Paste */
    .delete((req, res) => {
	    db.Paste.findOne({ '_id': req.params.id }, (err, paste) => {
	        if (err || paste === null)
	            res.status(500).send({ error: "Paste not found" });
	        else {
	            paste.remove();
	            return res.status(200).send({ success: paste });
	        }
	    });
    })
    /* PATCH a Paste */
    .patch((req, res) => {
	    db.Paste.findOne({ '_id': ObjectId(req.params.id) }, function (err, paste) {
	        if (err || paste === null)
	            res.status(400).send({ error: "No Paste found for Id" });
	        else {
	            const updatedPaste = req.body;
	            const id = req.params.id;
	            db.Paste.update({_id  : ObjectId(id)}, {$set: updatedPaste}, function (err, paste) {
	                if (err || paste === null)
	                    res.status(500).send({ error: "Error saving Paste" });
	                else
	                    res.status(200).send(paste);
	            });
	        }
	    })
    });

router.route('/git-pun')
	.get((req, res) => {
    	db.Pun.find((err, puns) => {
        	if (err || puns === null || puns.length === 0) {
        		res.status(400).send({ error: "No Puns :(" });
        	} else {
        		const size = Object.keys(puns).length - 1
        		const min = Math.ceil(0);
  				const max = Math.floor(size);
  				const idx = Math.floor(Math.random() * (max - min)) + min;
  				res.status(200).send(puns[idx].body);
        	}
    	}); 
	});

export default router;
