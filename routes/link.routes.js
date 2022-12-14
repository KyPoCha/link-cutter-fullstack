const {Router} = require("express");
const Link = require("../models/link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");
const router = Router();

router.post("/generate", auth , async (req, res)=>{
    try {
        const baseUrl = process.env.BASE_URL;
        const {from} = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if(existing){
            return res.status(200).json({ link: existing });
        }

        const to = baseUrl + "/t/" + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({ link });
    }
    catch (e){
        res.status(500).json({message: "Something gone wrong. Try again"});
    }
});

router.get("/", auth, async (req,res)=>{
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    }
    catch (e){
        res.status(500).json({message: "Something gone wrong. Try again"});
    }
});

router.get("/:id", auth, async (req,res)=>{
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    }
    catch (e){
        res.status(500).json({message: "Something gone wrong. Try again"});
    }
});

module.exports = router;