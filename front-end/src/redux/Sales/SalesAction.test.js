import SalesActionTypes from './SalesActionTypes';
import SalesReducer from './SalesReducer';
const initialState = {
  posts: [],
};

describe('SalesReducer', () => {
  it('should return initial state', () => {
    expect(SalesReducer(undefined, {})).toEqual(initialState);
  });

  it('should set posts', () => {
    const mockPost = { id: 1, name: "Priyan's new product" };

    expect(
      SalesReducer(initialState, {
        type: SalesActionTypes.SET_SALES_POSTS,
        payload: [mockPost],
      }).posts
    ).toEqual([mockPost]);
  });
});
