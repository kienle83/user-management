import userReducer, {
  UserState,
  userActions
} from './userSlice';

describe('user reducer', () => {
  const initialState: UserState = {
    loading: false,
    list: [],
    filter: {
      _page: 1,
      _limit: 15,
    }
  };

  it('should handle loading true by fetching', () => {
    expect(userReducer(initialState, userActions.fetchUserList)).toEqual({
      loading: true, list: [], filter: { _page: 1, _limit: 15 }
    });
  });

  it('should loading false after fetch user list failed', () => {
    const actual = userReducer(initialState, userActions.fetchUserListFailed);
    expect(actual).toEqual({
      loading: false, list: [], filter: { _page: 1, _limit: 15 }
    });
  });



});
