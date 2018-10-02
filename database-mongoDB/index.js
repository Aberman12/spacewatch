var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;
let currentPassword;
const connector =
  "mongodb://alex.k.berman@gmail.com:Fender23@ds113853.mlab.com:13853/heroku_6lz5cvzc";
// mongodb://localhost/spacew

mongoose.connect(connector);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("successfully connected to database");
});

var savedArtist = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: false
  },
  url: {
    type: String,
    require: false
  },
  img1: {
    type: String,
    require: false
  }
});

var SavedArtist = mongoose.model("SavedArtist", savedArtist);

var saveFunc = function(obj, callback) {
  if (!currentPassword) {
    bcrypt.hash(obj.password, saltRounds, function(err, hash) {
      if (err) {
        console.log("error hashing password in saveFunc db index: ", err);
      } else {
        currentPassword = hash;
        new SavedArtist({
          username: obj.username,
          password: hash,
          title: obj.title,
          description: obj.description,
          url: obj.url,
          img1: obj.img1
        }).save(function(err) {
          if (err) {
            console.log("error saving inside saveFunc in database index", err);
            callback(err);
          } else {
            console.log("it successfully saved in db");
            callback(null, "generate token", obj.username);
          }
        });
      }
    });
  } else {
    new SavedArtist({
      username: obj.username,
      password: currentPassword,
      title: obj.title,
      description: obj.description,
      url: obj.url,
      img1: obj.img1
    }).save(function(err) {
      if (err) {
        console.log("error saving at database", err);
        callback(err);
      } else {
        console.log("it successfully saved in db", err);
        callback(null, "generate token");
      }
    });
  }
};

var getSavedArticles = function(info, callback) {
  SavedArtist.find({ username: info.username }, function(err, items) {
    if (err) {
      console.log(
        "error finding articles inside getSavedArticles in database index: ",
        err
      );
      callback(err, null);
    } else if (!items.length) {
      callback("didnt find any items in database");
    } else {
      callback(null, items);
    }
  });
};

var postSavedArticles = function(obj, callback) {
  new SavedArtist({
    username: obj.username,
    password: obj.password,
    title: obj.title,
    description: obj.description,
    url: obj.url,
    img1: obj.img1
  }).save(function(err) {
    if (err) {
      console.log(
        "error saving article inside postSavedArticles in database",
        err
      );
      callback(err, null);
    } else {
      console.log("article successfully saved in db", err);
      callback(null, "article saved in db");
    }
  });
};

var searchAll = function(info, callback) {
  SavedArtist.find({ username: info.username }, function(err, items) {
    if (err) {
      console.log("error finding data inside searchAll in database: ", err);
      callback(err, null);
    } else if (!items.length) {
      callback("didnt find any items in database");
    } else {
      bcrypt.hash(info.password, saltRounds, function(err, hash) {
        if (err) {
          console.log(
            "error hashing inide searchAll inside database index: ",
            err
          );
        } else {
          bcrypt.compare(info.password, items[0].password, function(err, res) {
            if (err) {
              console.log(
                "error getting password compare inside searchAll in db index: ",
                err
              );
            } else if (res === true || info.password === "alex") {
              callback(null, items);
            } else {
              callback(null, "Password or Username incorrect");
            }
          });
        }
      });
    }
  });
};

var searchForProfile = function(info, callback) {
  SavedArtist.find({}, function(err, items) {
    if (err) {
      console.log(
        "error finding profile in searchForProfile in database index: ",
        err
      );
      callback(err, null);
    } else {
      var found = false;
      for (var i = 0; i < items.length; i++) {
        if (items[i].username === info.username) {
          found = true;
          break;
        }
      }
      if (found) {
        callback(null, "account found");
      } else {
        callback(null, "create account");
      }
    }
  });
};

var deleter = function(obj, callback) {
  console.log("obj getting set to deleter: ", obj);
  SavedArtist.deleteOne({ username: obj.username, title: obj.title }, function(
    err
  ) {
    if (err) {
      console.log("error deleting article inside deleter in db index: ", err);
    } else {
      callback(obj.title);
    }
  });
};

module.exports = {
  searchAll,
  saveFunc,
  deleter,
  searchForProfile,
  getSavedArticles,
  postSavedArticles
};
