import Track from '../schemas/Track';
import UserTrack from '../schemas/UserTrack';

async function trySaveTrack(lastFmTrack) {
  try {
    // Getting incremental ID
    const incrementalId = await Track.countDocuments({});
    // Trying to create track
    const track = await Track.create({
      ...lastFmTrack,
      incremental_id: incrementalId,
    });
    console.info(`SAVED TRACK: ${track.name}`);

    return track;
  } catch (error) {
    if (error.code === 11000) {
      console.info(`DUPLICATED TRACK: ${lastFmTrack.name}`);
    }

    return null;
  }
}

async function trySaveUserTrack(user, lastFmTrack) {
  try {
    let userTrack = await UserTrack.findOne({ user, track_mbid: lastFmTrack.mbid });
    // Updating already existing user track
    if (userTrack) {
      await userTrack.set({ playcount: lastFmTrack.playcount }).save();
    } else {
      const track = await Track.findOne({ mbid: lastFmTrack.mbid });
      // Creating as new UserTrack
      userTrack = await UserTrack.create({
        user,
        track,
        user_incremental_id: user.incremental_id,
        track_incremental_id: track.incremental_id,
        user_name: user.name,
        track_name: track.name,
        track_mbid: track.mbid,
        playcount: lastFmTrack.playcount,
        artist_mbid: track.artist.mbid,
        artist_name: track.artist.name,
      });
    }

    console.info(`NEW PLAYCOUNT ${userTrack.playcount} USER ${userTrack.user_name} TRACK ${userTrack.track_name}`);
  } catch (error) {
    console.info('ERROR SAVING USER TRACK', error);
  }
}

export async function saveTracksInfo(user, lastFmTracks) {
  for (let i = 0; i <= lastFmTracks.length; i += 1) {
    const lastFmTrack = lastFmTracks[i];
    // If the track don't have MBID, ignore it
    if (!lastFmTrack || !lastFmTrack.mbid) continue; // eslint-disable-line
    // Trying to save the track
    await trySaveTrack(lastFmTrack);
    // Saving or updating user track activity
    await trySaveUserTrack(user, lastFmTrack);
  }
}
