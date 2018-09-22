var db = require("../database-mongoDB");

module.exports = {
  fetch: function(req, res) {
    db.searchAll(req.query, function(err, info) {
      if (err) {
        res.status(404).send(err);
      } else {
        if (req.session.Auth === undefined || !req.session.Auth) {
          req.session.Auth = {
            username: req.query.username,
            password: req.query.password
          };
        }
        res.status(200).send(info);
      }
    });
  },

  getSavedArticles: function(req, res) {
    db.getSavedArticles(
      { username: req.session.Auth.username },
      (err, savedArticles) => {
        if (err) {
          console.log("error getting saved articles in controller: ", err);
        } else {
          res.status(200).send(savedArticles);
        }
      }
    );
  },

  postSavedArticles: function(req, res) {
    var obj = {};
    obj = req.body;
    obj.username = req.session.Auth.username;
    obj.password = req.session.Auth.password;
    db.postSavedArticles(obj, function(err, items) {
      if (err) {
        console.log("error posting article in controller", err);
        res.status(400).send(err);
      } else {
        res.status(200).send(items);
      }
    });
  },

  logout: function(req, res) {
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) {
          console.log("did not delete session: ", err);
        } else {
          res.send("successfully logged out");
        }
      });
    }
  },

  post: function(req, res) {
    var obj = {};

    if (!req.session.Auth) {
      req.session.Auth = {
        username: req.body.username,
        password: req.body.password
      };
    }

    obj.username = req.session.Auth.username;
    obj.password = req.session.Auth.password;
    if (req.body.title && req.body.description) {
      obj.title = req.body.title;
      obj.description = req.body.description;
      obj.url = req.body.url;
      obj.img1 = req.body.img1;
    }

    db.saveFunc(obj, function(err, results, user) {
      if (err) {
        console.log("error in controller save ", err);
        res.status(404);
      } else {
        res.status(200).send(results);
      }
    });
  },

  delete: function(req, res) {
    db.deleter(req.query, function(message) {
      if (message) {
        console.log("successfully deleted article: ", message);
        res.status(200).send(message);
      }
    });
  },

  finder: function(req, res) {
    db.searchForProfile(req.query, function(err, items) {
      if (err) {
        console.log("error finding items in finder inside controller: ", err);
      } else {
        res.status(200).send(items);
      }
    });
  }
};
