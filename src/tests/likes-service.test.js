import {userTogglesTuitLikes, findAllTuitsLikedByUser,
  userTogglesTuitDislikes, findAllTuitsDislikedByUser}
from "../services/likes-service"
import {createTuit, deleteTuitsByTuit} from "../services/tuits-service"
import {createUser, deleteUsersByUsername} from "../services/users-service"

describe('toggleLikes', () => {
  // Mock user for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  // Test Tuit
  const message = {
    tuit: "Create Test Tuit"
  };

  // Setup test before running test
  beforeAll(() => {
    // remove mockuser and tuit
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  // Clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  test('toggle likes on a tuit', async () => {
    //Insert new tuit
    const user = await createUser(mockUser);
    const tuit = await createTuit(user._id, message);

    //Check to see if the count of likes changes
    expect(tuit.stats.likes).toEqual(0);

    await userTogglesTuitLikes(user._id, tuit._id);

    expect(tuit.stats.likes).toEqual(1);

    await userTogglesTuitLikes(user._id, tuit._id);

    expect(tuit.stats.likes).toEqual(0);
  });

  describe('toggleLikes', () => {
    // Mock user for testing
    const mockUser = {
      username: 'mockUser',
      password: 'test123',
      email: 'mockUser@email.com'
    };

    // Test Tuit
    const message = {
      tuit: "Create Test Tuit"
    };

    // Setup test before running test
    beforeAll(() => {
      // remove mockuser and tuit
      deleteUsersByUsername(mockUser.username);
      return deleteTuitsByTuit(message.tuit);
    })

    // Clean up after test runs
    afterAll(() => {
      // remove any data we created
      deleteUsersByUsername(mockUser.username);
      return deleteTuitsByTuit(message.tuit);
    })

    test('toggle likes on a tuit', async () => {
      //Insert new tuit
      const user = await createUser(mockUser);
      const tuit = await createTuit(user._id, message);

      //Check to see if the count of likes changes
      expect(tuit.stats.likes).toEqual(0);

      await userTogglesTuitLikes(user._id, tuit._id);

      expect(tuit.stats.likes).toEqual(1);

      await userTogglesTuitLikes(user._id, tuit._id);

      expect(tuit.stats.likes).toEqual(0);
    });

  describe('toggleDislikes', () => {
    // Mock user for testing
    const mockUser = {
      username: 'mockUser',
      password: 'test123',
      email: 'mockUser@email.com'
    };

    // Test Tuit
    const message = {
      tuit: "Create Test Tuit"
    };

    // Setup test before running test
    beforeAll(() => {
      // remove mockuser and tuit
      deleteUsersByUsername(mockUser.username);
      return deleteTuitsByTuit(message.tuit);
    })

    // Clean up after test runs
    afterAll(() => {
      // remove any data we created
      deleteUsersByUsername(mockUser.username);
      return deleteTuitsByTuit(message.tuit);
    })

    test('toggle dislikes on a tuit', async () => {
      //Insert new tuit
      const user = await createUser(mockUser);
      const tuit = await createTuit(user._id, message);

      //Check to see if the count of dislikes changes
      expect(tuit.stats.dislikes).toEqual(0);

      await userTogglesTuitDislikes(user._id, tuit._id);

      expect(tuit.stats.dislikes).toEqual(1);

      await userTogglesTuitDislikes(user._id, tuit._id);

      expect(tuit.stats.dislikes).toEqual(0);
    });
})