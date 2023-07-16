const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIC_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "UPDATE_BOOKS":
      return {
        ...state,
        documents: action.payload,
      };
    case "UPDATE_FOLLOWS":
      return {
        ...state,
        followLibraries: action.payload,
      };
    case "UPDATE_FOLLOW_INUSER":
      return {
        ...state,
        user: {
          ...state.user,
          followLibraries: action.payload,
        },
      };
    case "UPDATE_MYLIBRARIES":
      return {
        ...state,
        libraries: action.payload,
      };
    case "UPDATE_MY_LIBRARIES":
      return {
        ...state,
        myLibrary: action.payload,
        loading: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
