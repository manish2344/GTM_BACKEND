const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type: String,
        required: true,
        min: 12,
    },
    // photo: {
    //     type: String,
    //     required: true,
    // },
      avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }, 
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: [],
    }
}, {timestamps: true})

module.exports = mongoose.model("Blog", BlogSchema)