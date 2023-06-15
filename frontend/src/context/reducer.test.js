import reducer, { initialState, actionTypes } from "./reducer";

describe("reducer", () => {
  test("returns initial state when no action is provided", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(undefined);
  });

  test("sets user and user-related data when SET_USER action is provided", () => {
    const user = { name: "John Doe", type: "admin", id: 123 };
    const action = {
      type: actionTypes.SET_USER,
      user: user,
      usertype: user.type,
      userid: user.id,
    };

    const state = reducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.usertype).toEqual(user.type);
    expect(state.userid).toEqual(user.id);
  });

  test("clears user and user-related data when LOGOUT action is provided", () => {
    const currentState = {
      user: { name: "John Doe", type: "admin", id: 123 },
      usertype: "admin",
      userid: 123,
    };

    const action = { type: actionTypes.LOGOUT };

    const state = reducer(currentState, action);

    expect(state.user).toBeNull();
    expect(state.usertype).toBeNull();
    expect(state.userid).toBeNull();
  });

  test("returns current state when unknown action is provided", () => {
    const currentState = {
      user: { name: "John Doe", type: "admin", id: 123 },
      usertype: "admin",
      userid: 123,
    };

    const action = { type: "UNKNOWN_ACTION" };

    const state = reducer(currentState, action);

    expect(state).toEqual(currentState);
  });
});
