import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    sizes: [
      {
        size: {
          type: String,
          enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
        sold: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    image: {
      type: String,
      default: 'https://sisaket-charity.net/static/assets/img/logos/shirt_243_black.jpg',
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
