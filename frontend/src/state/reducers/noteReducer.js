const initialState = { loading: false, err: false, errmsg: "" };

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE/UPDATE/DELETE_REQUEST":
      return { ...state, loading: true };
    case "CREATE/UPDATE/DELETE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE/UPDATE/DELETE_FAIL":
      return { ...state, loading: false, err: true, errmsg: action.payload };
    case "CLEAR_ERROR":
      return { ...state, err: false, errmsg: "" };
    default:
      return state;
  }
};
