const express = require('express');
const router = express.Router();
const Pun = require('../models/Pun');

// GET all puns, or filter by category: /api/puns?category=animals
router.get('/', async (req, res) => {
    try {
        const category = req.query.category;

        if (!category) {
            return res.json(await Pun.find());
        }

        if (!Pun.CATEGORIES.includes(category)) {
            return res.status(400).json({ message: `"${category}" is not a valid category` });
        }

        res.json(await Pun.find({ category: category }));
    } catch (error) {
        res.status(500).json({ message: 'Could not get the puns' });
    }
});

// GET all categories: ["animals", "education", ...]
// Must be above /:punId, otherwise "categories" would be treated as a pun id
router.get('/categories', (req, res) => {
    res.json(Pun.CATEGORIES);
});

// GET one pun: /api/puns/6650c1...
router.get('/:punId', async (req, res) => {
    try {
        const pun = await Pun.findById(req.params.punId);
        if (!pun) return res.status(404).json({ message: 'Pun not found' });
        res.json(pun);
    } catch (error) {
        // /api/puns/abc isn't a valid MongoDB id: findById throws
        res.status(404).json({ message: 'Pun not found' });
    }
});

// POST a new pun: { "content": "...", "category": "food" }
router.post('/', async (req, res) => {
    if (!req.body.content || !req.body.category) {
        return res.status(400).json({ message: 'Content and category are required' });
    }

    try {
        const pun = new Pun({
            content: req.body.content,
            category: req.body.category,
        });
        const savedPun = await pun.save();
        res.status(201).json(savedPun);
    } catch (error) {
        // e.g. a category that isn't in Pun.CATEGORIES
        res.status(400).json({ message: error.message });
    }
});

// PATCH: change only the fields that are sent, e.g. { "category": "food" }
router.patch('/:punId', async (req, res) => {
    if (req.body.content === undefined && req.body.category === undefined) {
        return res.status(400).json({ message: 'Missing required fields (content and/or category)' });
    }

    try {
        const pun = await Pun.findByIdAndUpdate(
            req.params.punId,
            req.body,
            { new: true, runValidators: true }  // new: send back the updated pun. runValidators: check the category
        );
        if (!pun) return res.status(404).json({ message: 'Pun not found' });
        res.json(pun);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE one pun
router.delete('/:punId', async (req, res) => {
    try {
        const result = await Pun.deleteOne({ _id: req.params.punId });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Pun not found' });
        res.json({ message: 'Pun deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Pun not found' });
    }
});

module.exports = router;
