import { request, GET } from './network';
import { LASTFM } from '../config';

export async function getTopTracks(lastFmUserName) {
  try {
    // Setting params
    const params = {
      method: 'user.gettoptracks',
      user: lastFmUserName,
      api_key: LASTFM.API_KEY,
      format: 'json',
      limit: 300,
    };
    // Getting users
    const response = await request(LASTFM.API_URL, GET, '', params);
    const topTracks = response.toptracks.track;

    return topTracks;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFollowing(userName) {
  try {
    // Setting paramsj
    const params = {
      method: 'user.getfriends',
      user: userName,
      api_key: LASTFM.API_KEY,
      format: 'json',
    };
    // Getting users
    const response = await request(LASTFM.API_URL, GET, '', params);
    const users = response.friends.user;

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}
