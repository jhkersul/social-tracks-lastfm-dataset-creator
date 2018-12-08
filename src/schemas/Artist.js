import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mbid: {
    type: String,
    required: false,
  },
  date: {
    uts: {
      type: String,
    },
    '#text': {
      type: String,
    },
  },
  url: {
    type: String,
  },
  playcount: {
    type: Number,
  },
  '@attr': {
    rank: {
      type: Number,
    },
  },
});

export default ArtistSchema;
