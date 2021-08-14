const initialState = { loading: false, err: false, errmsg: "", userInfo: null };

export const userLogin_RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN/REGISTER_REQUEST":
      // console.log(action.type);
      return { ...state, loading: true };
    case "LOGIN/REGISTER_SUCCESS":
      // console.log(action.type);
      return { ...state, loading: false, userInfo: action.payload };
    case "LOGIN/REGISTER_FAIL":
      // console.log(action.type);
      return { ...state, loading: false, err: true, errmsg: action.payload };
    case "CLEAR_ERROR":
      // console.log(action.type);
      return { ...state, err: false, errmsg: "" };
    case "LOGOUT":
      // console.log(action.type);
      return {};
    default:
      return state;
  }
};
