var router = require("express").Router();
var controller = require("./controller.js");

router
  .route("/profiles")
  .get(controller.fetch)
  .post(controller.post);

router.route("/finder").get(controller.finder);

router.route("/logout").get(controller.logout);

router
  .route("/savedArticles")
  .get(controller.getSavedArticles)
  .post(controller.postSavedArticles)
  .delete(controller.delete);

module.exports = router;
