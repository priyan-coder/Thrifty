import UserActionTypes from './UserActionTypes';
import UserReducer from './UserReducer';

const initialState = {
  currentUser: null,
};

describe('userReducer', () => {
  it('should return initial state', () => {
    expect(UserReducer(undefined, {})).toEqual(initialState);
  });

  it('should set currentUser to payload on signInSuccess action', () => {
    const mockUser = { id: 1, displayName: 'Priyan' };

    expect(
      UserReducer(initialState, {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: mockUser,
      }).currentUser
    ).toEqual(mockUser);
  });
});
