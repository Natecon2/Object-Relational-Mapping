const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET All Categories
router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.findAll({
      // Include associated Products
      include: [Product],
    });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET One Category by ID
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // Include associated Products
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a New Category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
