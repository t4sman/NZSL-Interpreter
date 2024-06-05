const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use('/models', express.static(path.join(__dirname, 'models')));


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

    app.get('/sign_profile/:id', (req, res) => {
      const id = parseInt(req.params.id);
      getSignProfile(id)
      .then(result => {
        res.send(result);
      }).catch(error => console.error(error));
    });

    function getSignProfile(id) { //get a sign profile by id and return the words for that sign
      let profile = sign_profile.findOne({ id: id });

      let englishjoin = eng_signs_to_profiles.findOne({ profile_id: id });

      let englishwords = english_signs.findOne({ id: englishjoin.english_id }, { _id: 0, id: 0, english_sign: 1 });

      return {
        profile: profile.toArray(),
        englishwords: englishwords.toArray()
      };
    }

    app.get('/search', async (req, res) => {
      // create text index on english_signs collection
      english_signs.createIndex({ english_sign: 'text' });

      // search for the query in the english_signs collection
      const search = req.query.q;

      let query = { $text: { $search: search } };
      let projection = { id: 1, english_sign: 1, _id: 0 };

      // find the matching signs
      const englishsigns = await english_signs.find(query,projection).limit(10).toArray();

      // for each matching sign, find the entry in the join table
      let profilesPromises = englishsigns.map(async sign => {
        let joinprofiles = await eng_signs_to_profiles.find({ english_id: sign.id }).toArray();

        return joinprofiles.map(profile => ({...profile, name: sign.english_sign}));
      });

      let profiles = await Promise.all(profilesPromises);
      profiles = profiles.flat();



      // for each entry in the join table, find the sign profile
      let signprofilesPromises = profiles.map(async profile => {
        let signprofile = await sign_profile.findOne({ id: profile.profile_id });
        let joinmaori = await maori_signs_to_profiles.find({ profile_id: profile.profile_id }).toArray();
        let maoriPromises = joinmaori.map(async maori => {
          let maorisigns = await maori_signs.find({ id: maori.maori_id }).toArray();
          let maoriWords = maorisigns.map(maori => maori.maori_sign);
          return maoriWords;
        });
        let maoriWords = await Promise.all(maoriPromises);
        return {...signprofile, name: profile.name, maori: maoriWords.join(', ')};
      });

      let signprofiles = await Promise.all(signprofilesPromises);
      console.log("searched: " + search)
      res.send(signprofiles);
    });
  });

