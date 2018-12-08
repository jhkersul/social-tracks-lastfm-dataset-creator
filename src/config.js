const { LASTFM_API_KEY } = process.env;

if (!LASTFM_API_KEY) {
  console.error('You need to set LASTFM_API_KEY on your env');
  process.exit(22);
}

export const LASTFM = {
  API_KEY: LASTFM_API_KEY,
  API_URL: 'https://ws.audioscrobbler.com/2.0',
};

export const MONGO = {
  HOST: 'mongodb://localhost:27017',
  DB: 'social_tracks_recommender',
};

export const START_USER = 'joaohkfaria';
