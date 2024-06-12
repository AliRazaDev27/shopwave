import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    picture_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}
  , { timestamps: true })
export default mongoose.model('Product', productSchema)
