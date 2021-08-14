import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
// import ReactMarkdown from "react-markdown";
import {
  clearErrorAction,
  createNoteAction,
} from "../state/actions/noteActions";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

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

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category, token, history));
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
      <div className="page-title my-2">NEW NOTE</div>
      <div className="page-title-brdbtm mb-3"></div>
      <Form onSubmit={handleCreate}>
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
          Create{" "}
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
          variant="warning"
          type="reset"
          disabled={loading}
          onClick={() => {
            setTitle("");
            setContent("");
            setCategory("");
          }}
        >
          Reset
        </Button>
      </Form>
    </Container>
  );
};

export default CreateNote;
