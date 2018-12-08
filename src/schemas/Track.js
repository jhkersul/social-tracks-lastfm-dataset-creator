import mongoose from 'mongoose';

const { Schema } = mongoose;

const Track = new Schema({
  name: {
    type: String,
    required: true,
  },
  mbid: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    uts: {
      type: String,
    },
    '#text': {
      type: String,
    },
  },
  artist: {
    name: {
      type: String,
      required: true,
    },
    mbid: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  url: {
    type: String,
  },
  duration: {
    type: Number,
  },
  incremental_id: {
    type: Number,
    required: true,
    unique: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export default mongoose.model('Track', Track);
