const router = require("express").Router();
const category =require("../models/category.js");

//create category
router.post("/", async (req, res) => {
    const newcategory = new category(req.body);
    try {
      const savedcat = await newcategory.save();
      res.status(200).json(savedcat);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  



  router.get("/", async (req, res) => {
    
    try {
      const cats = await category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router