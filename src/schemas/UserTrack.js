import mongoose from 'mongoose';
import Track from './Track';
import User from './User';

const { Schema } = mongoose;

const UserTrack = new Schema({
  track: {
    type: Schema.Types.ObjectId,
    ref: Track,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  user_incremental_id: {
    type: Number,
    required: true,
  },
  track_incremental_id: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  track_name: {
    type: String,
    required: true,
  },
  track_mbid: {
    type: String,
    required: true,
  },
  artist_mbid: {
    type: String,
    required: true,
  },
  artist_name: {
    type: String,
    required: true,
  },
  playcount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export default mongoose.model('UserTrack', UserTrack);
