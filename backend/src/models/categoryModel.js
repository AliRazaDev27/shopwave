import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 32
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, { timestamps: true })
export default mongoose.model('Category', categorySchema)
