require('dotenv').config();

var mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = new Schema({
  name:  { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let  Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const document = new Person({name: 'Joe', age: 21, favoriteFoods: ['pizza', 'burger']});
  document.save((err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
      if (err) {
        done(err);
      }
    done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
      if (err) {
        done(err);
      }
    done(null, data);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
      if (err) {
        done(err);
      }
    done(null, data);
    });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
      if (err) {
        done(err);
      }
    done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, data) {
      if (err) {
        done(err);
      }

      data.favoriteFoods.push(foodToAdd);
      data.save((err, data) => (err ? done(err) : done(null, data)));
    });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true } , function (err, data) {
      if (err) {
        done(err);
      }

      done(null, data);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
      if (err) {
        done(err);
      }

      done(null, data);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function (err, data) {
      if (err) {
        done(err);
      }

      done(null, data);
    });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch}).sort({name : "asc"}).limit(2).select("-age").exec((err, data) => {
      if(err){
        done(err);
      }

      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
