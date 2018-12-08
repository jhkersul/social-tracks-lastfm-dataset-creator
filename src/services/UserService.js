import User from '../schemas/User';

export async function addUniqueLastFmUsers(lastFmUsers) {
  const users = [];

  for (let i = 0; i < lastFmUsers.length; i += 1) {
    const lastFmUser = lastFmUsers[i];
    try {
      const incrementalId = await User.countDocuments({});
      const user = await User.create({
        ...lastFmUser,
        name: `lastfm_${lastFmUser.name}`,
        lastfm_name: lastFmUser.name,
        origin: 'lastfm',
        incremental_id: incrementalId,
      });
      console.info(`ADDED: ${user.name}`);
      users.push(user);
    } catch (error) {
      if (error.code === 11000) {
        console.info(`DUPLICATED: lastfm_${lastFmUser.name}`);
      } else {
        console.error(error);
      }
    }
  }

  return users;
}

export async function getUserAtIndex(index) {
  const users = await User.find().sort({ created_at: 1 }).skip(index).limit(1);

  return users && users.length ? users[0] : null;
}
