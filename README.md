# Last.fm Dataset Creator for Social Tracks

This project will create the required data for Social Tracks recommender. It can be used by other projects that will require user-music interaction.

It will generate on a MongoDB database three collections: **users**, **tracks** and **usertracks**.

The collections:

* **users**: The Last.fm users data.

```json
{
   "_id":"5c04a0256489dd1589bb74bb",
   "name":"lastfm_example1",
   "realname":"Example Name",
   "url":"https://www.last.fm/user/example1",
   "country":"Brazil",
   "age":0,
   "gender":"n",
   "playcount":30017,
   "playlists":0,
   "registered":{
      "unixtime":"1245353741"
   },
   "lastfm_name":"example1",
   "origin":"lastfm",
   "incremental_id":0,
   "created_at":"2018-12-03T03:16:53.438Z",
   "updated_at":"2018-12-03T03:16:53.438Z"
}
```

* **tracks**: The Last.fm track data.

```json
{
   "_id":"5c04a0276489dd1589bb74c0",
   "name":"Gimme Some Truth",
   "duration":194,
   "mbid":"0b9928a1-d751-49df-a3bf-0978353cd99e",
   "url":"https://www.last.fm/music/John+Lennon/_/Gimme+Some+Truth",
   "artist":{
      "name":"John Lennon",
      "mbid":"4d5447d7-c61c-4120-ba1b-d7f471d385b9",
      "url":"https://www.last.fm/music/John+Lennon"
   },
   "incremental_id":2,
   "created_at":"2018-12-03T03:16:55.473Z",
   "updated_at":"2018-12-03T03:16:55.473Z",
}
```

* **usertracks**: The playcount for a user and a track.

```json
{
   "_id":"5c04a0276489dd1589bb74c1",
   "user":"5c04a0256489dd1589bb74bb",
   "track":"5c04a0276489dd1589bb74c0",
   "user_incremental_id":0,
   "track_incremental_id":2,
   "user_name":"lastfm_example1",
   "track_name":"Gimme Some Truth",
   "track_mbid":"0b9928a1-d751-49df-a3bf-0978353cd99e",
   "playcount":49,
   "artist_mbid":"4d5447d7-c61c-4120-ba1b-d7f471d385b9",
   "artist_name":"John Lennon",
   "created_at":"2018-12-03T03:16:55.480Z",
   "updated_at":"2018-12-03T03:16:55.480Z",
   "__v":0
}
```

## How to Run

### 1. Set your API key on ENV

On your .zshrc or .bashrc on home, add the following line:

```bash
export LASTFM_API_KEY="<YOUR_LAST_FM_API_KEY>"
```

### 2. Requirements

You'll need [Node 11.x](https://nodejs.org) and [Yarn](https://yarnpkg.com).

On the project folder, run:

```bash
yarn install
```

### 3. Set the config file

Inside **src** folder there's a **config.js** file. There you can change the mongodb host and database and the start user to create the dataset.

```javascript
export const MONGO = {
  HOST: 'mongodb://localhost:27017',
  DB: 'social_tracks_recommender',
};

export const START_USER = 'joaohkfaria';
```

### 4. Starting the creator

Run on the project root folder and it will automatically get the dataset:

```bash
yarn start
```

You'll need to run this script for several hours to create a big dataset.
