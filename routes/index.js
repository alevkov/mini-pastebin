import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.render('index', { title: 'Express' })
);

router.route('/paste')
    .get((req, res) => {

    })
    .post((req, res) => {

    })
    .delete((req, res) => {

    })
    .patch((req, res) => {

    });

export default router;
