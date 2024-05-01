const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.send('Hello from MERN stack!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('NZSL');

    const sign_profile = db.collection('sign_profile');
    const english_signs = db.collection('english_signs');
    const topics = db.collection('topics');
    const usages = db.collection('usages');
    const maori_signs = db.collection('maori_signs');

    const eng_signs_to_profiles = db.collection('eng_signs_to_profiles');
    const maori_signs_to_profiles = db.collection('maori_signs_to_profiles');
    const usages_to_profiles = db.collection('usages_to_profiles');

    //get topics
    app.get('/listtopics', (_, res) => {
      topics.find().toArray()
        .then(results => {
          res.send(results);
        })
        .catch(error => console.error(error));
    });

    //get numbers of signs
    app.get('/numsigns', (_, res) => {
      sign_profile.countDocuments()
        .then(results => {
          console.log('Document count:', results);
          res.send(results.toString());
        })
        .catch(error => console.error(error));
    });

    //get all sign profiles
    app.get('/sign_profile', (_, res) => {
      sign_profile.find().toArray()
        .then(results => {
          res.send(results);
        })
        .catch(error => console.error(error));
    });

    app.get('/search', (req, res) => {
      const query = req.query.q;
      english_signs.find(
        { $english_sign: { $search: query } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .toArray()
      .then(results => {
        res.send(results);
      })
      .catch(error => console.error(error));
    });
  });

  //chur