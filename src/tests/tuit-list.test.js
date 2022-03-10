import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const USERS = [
  {username: 'alice', password: 'alice1', email: 'alice@email.com', _id: "123"},
  {username: 'bob', password: 'bob2', email: 'bob@email.com', _id: "234"},
  {username: 'charlie', password: 'char3', email: 'charlie@email.com', _id: "345"}
]

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const TUITS = [
  {tuit: "alice's tuit", postedBy: "123"},
  {tuit: "bob's tuit", postedBy: "234"},
  {tuit: "charlie's tuit", postedBy: "345"}
]

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
      <HashRouter>
        <Tuits tuits={TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(/In 2021, our @NASAPersevere Mars/i);
  expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
  const mock = jest.spyOn(axios, 'get'); // Set up Mock for testing
  mock.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}}));

  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuit = screen.getByText(/tuit/i);
  expect(tuit).toBeInTheDocument();

  mock.mockRestore();  // restore original implementation
});
