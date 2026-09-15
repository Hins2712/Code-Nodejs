const Book = require('../models/Book');
const mongoose = require('mongoose');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBooksByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const books = await Book.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, category, price, stock } = req.body;

    if (!title || !author || !category || price === undefined) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc (title, author, category, price)' });
    }

    const newBook = await Book.create({ title, author, category, price, stock });
    res.status(201).json(newBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Không tìm thấy sách để cập nhật' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Không tìm thấy sách để xóa' });
    }

    res.status(200).json({ message: 'Xóa sách thành công', book: deletedBook });
  } catch (error) {
    next(error);
  }
};