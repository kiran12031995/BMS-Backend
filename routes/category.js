const router = require("express").Router();
const Category = require("../modals/Categories");

router.post("/",async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCate = await newCat.save();
        res.status(200).json(savedCate);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",async(req,res)=>{
    try{
        const Categories = await Category.find();
        res.status(200).json(Categories);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;