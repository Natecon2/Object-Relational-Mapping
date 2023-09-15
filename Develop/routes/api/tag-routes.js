const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET All Tags
router.get('/', async (req, res) => {
  try {
    // Find all tags
    const tags = await Tag.findAll({
      // Include associated Product data
      include: [Product],
    });

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET One Tag by ID
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
      // Include associated Product data
      include: [Product],
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a New Tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Tag's Name by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const updatedTag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a Tag by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
