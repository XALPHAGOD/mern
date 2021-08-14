import axios from "axios";

export const createNoteAction =
  (title, content, category, token, history) => async (callReducer) => {
    callReducer({ type: "CREATE/UPDATE/DELETE_REQUEST" });

    if (!title || !content || !category)
      callReducer({
        type: "CREATE/UPDATE/DELETE_FAIL",
        payload: "All Fields are Mandatory",
      });
    else {
      try {
        await axios.post(
          "/user/create",
          { title, content, category },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        callReducer({ type: "CREATE/UPDATE/DELETE_SUCCESS" });
        history.replace("/notes");
      } catch (error) {
        callReducer({
          type: "CREATE/UPDATE/DELETE_FAIL",
          payload: error.response.data.msg,
        });
      }
    }
  };

export const updateNoteAction =
  (title, content, category, id, token, history) => async (callReducer) => {
    callReducer({ type: "CREATE/UPDATE/DELETE_REQUEST" });

    if (!title || !content || !category)
      callReducer({
        type: "CREATE/UPDATE/DELETE_FAIL",
        payload: "All Fields are Mandatory",
      });
    else {
      try {
        await axios.put(
          `/user/note/${id}`,
          { title, content, category },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        callReducer({ type: "CREATE/UPDATE/DELETE_SUCCESS" });
        history.replace("/notes");
      } catch (error) {
        callReducer({
          type: "CREATE/UPDATE/DELETE_FAIL",
          payload: error.response.data.msg,
        });
      }
    }
  };

export const deleteNoteAction =
  (id, token, history, to) => async (callReducer) => {
    callReducer({ type: "CREATE/UPDATE/DELETE_REQUEST" });

    try {
      await axios.delete(`user/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      callReducer({ type: "CREATE/UPDATE/DELETE_SUCCESS" });
      history.replace(to);
    } catch (error) {
      callReducer({
        type: "CREATE/UPDATE/DELETE_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

export const clearErrorAction = () => async (callReducer) => {
  callReducer({ type: "CLEAR_ERROR" });
};
