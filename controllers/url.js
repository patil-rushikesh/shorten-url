const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url');


async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            error: 'Url is required'
        });
    }
    const shortID = new ShortUniqueId({ length: 8 }).randomUUID(); // Generate the short ID string
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render("home", {
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json(
        {
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        }
    )
}

async function handleRedirection(req, res) {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).json({ error: "URL not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
}

async function handleGetUrlinViews(req,res){
    const allurls = await URL.find({});
    res.render("home", {
        urls: allurls,
    });
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
    handleRedirection,
    handleGetUrlinViews
}
