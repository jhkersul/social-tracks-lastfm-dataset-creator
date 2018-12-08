import express from 'express';
import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getFollowing, getTopTracks } from './services/lastfm';
import { addUniqueLastFmUsers, getUserAtIndex } from './services/UserService';
import { saveTracksInfo } from './services/TracksService';
import { MONGO, START_USER } from './config';

mongoose.connect(`${MONGO.HOST}/${MONGO.DB}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * GETTING DATA
 */
async function getData(lastFmName, index = 0) {
  // Getting following
  const users = await getFollowing(lastFmName);
  // Saving users on DB
  await addUniqueLastFmUsers(users);
  // Getting the index user from DB
  console.info('GETTING USER INDEX:', index);
  const user = await getUserAtIndex(index);
  if (!user) {
    console.info('NO MORE USER FOUND. EXITING');
    process.exit(0);
    return;
  }
  // Getting user tracks
  const lastFmTracks = await getTopTracks(user.lastfm_name);
  // Saving tracks info and user tracks
  await saveTracksInfo(user, lastFmTracks);

  await getData(user.lastfm_name, index + 1);
}

getData(START_USER);

module.exports = app;
