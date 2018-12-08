import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  lastfm_name: {
    type: String,
    required: false,
  },
  realname: {
    type: String,
  },
  url: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  playcount: {
    type: Number,
  },
  playlists: {
    type: Number,
  },
  registered: {
    unixtime: {
      type: String,
    },
  },
  incremental_id: {
    type: Number,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});


export default mongoose.model('User', UserSchema);
