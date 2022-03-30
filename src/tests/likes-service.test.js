import {userTogglesTuitLikes, findAllTuitsLikedByUser,
  userTogglesTuitDislikes, findAllTuitsDislikedByUser}
from "../services/likes-service"
import {
  createTuit,
  deleteTuitsByTuit
} from "../services/tuits-service"
import {createUser, deleteUsersByUsername} from "../services/users-service"

describe('toggle likes on tuit', () => {
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
});

describe('find all tuits liked by user', () => {
  // Mock user for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  // Test Tuits
  const tuitMessage = ["Test Tuit 1", "Test Tuit 2"]

  // Setup data before testing
  beforeAll(() =>
      // Delete previous data
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  // Cleanup after test
  afterAll(() =>
      // Delete inserted tuits
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  test('find all tuits that a user liked', async () => {
    // Insert several known tuits
    const user = await createUser(mockUser)
    const tuit1 = await createTuit(user._id, {tuit: tuitMessage[0]})
    const tuit2 = await createTuit(user._id, {tuit: tuitMessage[1]})

    // Like the tuits
    await userTogglesTuitLikes(user._id, tuit1._id);
    await userTogglesTuitLikes(user._id, tuit2._id);

    // Retrieve all tuits
    const tuits = await findAllTuitsLikedByUser(user._id);

    // Minimum expected tuits
    expect(tuits.length).toBeGreaterThanOrEqual(tuitMessage.length);

    // Check tuits we made
    const tuitsWeInserted = tuits.filter(
        tuit => tuitMessage.indexOf(tuit.tuit) >= 0);

    // Compare tuits in database with ones we made
    tuitsWeInserted.forEach(tuit => {
      const message = tuitMessage.find(message => message === tuit.tuit);
      expect(tuit.tuit).toEqual(message);
    });

    // Deletes Mock User
    deleteUsersByUsername(mockUser.username)
  });
});

describe('toggle dislikes on tuit', () => {
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
});

describe('find all tuits disliked by user', () => {
  // Mock user for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  // Test Tuits
  const tuitMessage = ["Test Tuit 1", "Test Tuit 2"]

  // Setup data before testing
  beforeAll(() =>
      // Delete previous data
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  // Cleanup after test
  afterAll(() =>
      // Delete inserted tuits
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  test('find all tuits that a user disliked', async () => {
    // Insert several known tuits
    const user = await createUser(mockUser)
    const tuit1 = await createTuit(user._id, {tuit: tuitMessage[0]})
    const tuit2 = await createTuit(user._id, {tuit: tuitMessage[1]})

    // Dislike the tuits
    await userTogglesTuitDislikes(user._id, tuit1._id);
    await userTogglesTuitDislikes(user._id, tuit2._id);

    // Retrieve all tuits
    const tuits = await findAllTuitsDislikedByUser(user._id);

    // Minimum expected tuits
    expect(tuits.length).toBeGreaterThanOrEqual(tuitMessage.length);

    // Check tuits we made
    const tuitsWeInserted = tuits.filter(
        tuit => tuitMessage.indexOf(tuit.tuit) >= 0);

    // Compare tuits in database with ones we made
    tuitsWeInserted.forEach(tuit => {
      const message = tuitMessage.find(message => message === tuit.tuit);
      expect(tuit.tuit).toEqual(message);
    });

    // Deletes Mock User
    deleteUsersByUsername(mockUser.username)
  });
});