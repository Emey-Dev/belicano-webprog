const Article = require('../models/Article');
const fs = require('fs');
const path = require('path');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const uploadArticleImage = async (req, res) => {
  try {
    const { imageData } = req.body;
    const match = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(imageData || '');

    if (!match) {
      return res.status(400).json({ message: 'Please upload a valid image file.' });
    }

    const extensions = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/svg+xml': 'svg',
      'image/x-icon': 'ico',
      'image/vnd.microsoft.icon': 'ico',
    };
    const mimeType = match[1].toLowerCase();
    const extension =
      extensions[mimeType] ||
      mimeType
        .replace('image/', '')
        .replace('+xml', '')
        .replace(/[^a-z0-9]/g, '');

    const uploadDir = path.join(__dirname, '..', 'uploads', 'articles');
    fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));

    res.status(201).json({
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/articles/${fileName}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
};
