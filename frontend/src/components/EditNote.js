import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import {
  clearErrorAction,
  deleteNoteAction,
  updateNoteAction,
} from "../state/actions/noteActions";

const EditNote = () => {
  const location = useLocation();
  const { note } = location.state;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);

  const userLogin_RegisterReducer = useSelector(
    (state) => state.userLogin_RegisterReducer
  );
  const {
    userInfo: { token },
  } = userLogin_RegisterReducer;
  const noteReducer = useSelector((state) => state.noteReducer);
  const { loading, err, errmsg } = noteReducer;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateNoteAction(title, content, category, note._id, token, history)
    );
  };
  return (
    <Container className="p-3">
      {err && (
        <Alert
          variant={"danger"}
          onClose={() => dispatch(clearErrorAction())}
          dismissible
        >
          {errmsg}
        </Alert>
      )}
      <div className="page-title my-2">EDIT NOTE</div>
      <div className="page-title-brdbtm mb-3"></div>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label>Content</Form.Label>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            style={{ resize: "none" }}
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoComplete="off"
          />
        </Form.Group>
        <Button
          className="mb-3"
          variant="success"
          type="submit"
          disabled={loading}
        >
          Save{" "}
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        <Button
          className="mx-3 mb-3"
          variant="danger"
          disabled={loading}
          onClick={() =>
            dispatch(deleteNoteAction(note._id, token, history, "/notes"))
          }
        >
          Delete{" "}
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default EditNote;
