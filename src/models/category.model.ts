import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: false
});

const Category = mongoose.model("Category", categorySchema);

Category.create(
  { name: 'Groceries' },
  { name: 'Clothing' },
  { name: 'Electronics' },
  { name: 'Toys & games' }
);

export default Category;
