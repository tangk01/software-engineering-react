import {
  createTuit, deleteTuit,
  findAllTuits, findTuitById,
  deleteTuitsByTuit
} from "../services/tuits-service";

import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
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
    // remove any/all tuits to make sure we create it in the test
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  // Clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  test('insert tuit using REST API', async () => {
    //Insert new tuit
    const user = await createUser(mockUser);
    const tuit = await createTuit(user._id, message);

    expect(tuit.tuit).toEqual(message.tuit);
    expect(tuit.postedBy).toEqual(user._id);
  });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
  // Mock user for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  // Test Tuit
  const message = {
    tuit: "Delete Test Tuit"
  };

  // Setup test before running test
  beforeAll(() => {
    // Delete previous data
    return deleteUsersByUsername(mockUser.username);
  })

  // Clean up after test runs
  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  test('delete tuit using REST API', async () => {
    // Delete tuit by its ID, assuming that it exists
    const user = await createUser(mockUser);
    const tuit = await createTuit(user._id, message);
    const status = await deleteTuit(tuit._id);

    // Check to see we deleted some Tuit
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
  // Mock user for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  // Test Tuit
  const message = {
    tuit: "Get Test Tuit"
  };

  // Setup test before running test
  beforeAll(() => {
    // Delete previous data
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  // Clean up after test runs
  afterAll(() => {
    // Remove any data we created
    deleteUsersByUsername(mockUser.username);
    return deleteTuitsByTuit(message.tuit);
  })

  test('retrieve tuit using REST API', async () => {
    // Insert the tuit
    const user = await createUser(mockUser);
    const tuit = await createTuit(user._id, message);

    // Verify tuit made is same as our tuit
    expect(tuit.tuit).toEqual(message.tuit);
    expect(tuit.postedBy).toEqual(user._id);

    // Retrieve Tuit
    const retrieveTuit = await findTuitById(tuit._id);

    // Verify retrieved tuit is same as our tui
    expect(retrieveTuit.tuit).toEqual(message.tuit);
    expect(retrieveTuit.postedBy).toEqual(user._id);
  })
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this

  // Sample tuits for testing
  const mockUser = {
    username: 'mockUser',
    password: 'test123',
    email: 'mockUser@email.com'
  };

  const tuitMessage = [
    "tuit1", "tuit2", "tuit3"
  ];

  // Setup data before testing
  beforeAll( () =>
      // Delete previous data
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  // Cleanup after test
  afterAll( () =>
      // Delete inserted tuits
      Promise.all(tuitMessage.map(tuit =>
          deleteTuitsByTuit(tuit)
      ))
  );

  test('retrieve all tuits', async () => {
    // Insert several known tuits
    const user = await createUser(mockUser)
    tuitMessage.map((tuit =>
        createTuit(user._id, {tuit: tuit})))

    // Retrieve all tuits
    const tuits = await findAllTuits();

    // Minimum expected tuits
    expect(tuits.length).toBeGreaterThanOrEqual(tuitMessage.length);

    // Check tuits we made
    const tuitsWeInserted = tuits.filter(
        tuit => tuitMessage.indexOf(tuit.tuit) >= 0);

    // Compare tuits in database with ones we made
    tuitsWeInserted.forEach( tuit => {
      const message = tuitMessage.find(message => message === tuit.tuit);
      expect(tuit.tuit).toEqual(message);
    });

    // Deletes Mock User
    deleteUsersByUsername(mockUser.username)
  });
});