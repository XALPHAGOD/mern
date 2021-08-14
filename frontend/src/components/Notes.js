import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Card, Accordion } from "react-bootstrap";
import "../styles/Notes.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteNoteAction } from "../state/actions/noteActions";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const userLogin_RegisterReducer = useSelector(
    (state) => state.userLogin_RegisterReducer
  );
  const {
    userInfo: { name, token },
  } = userLogin_RegisterReducer;

  const fetchData = async () => {
    const res = await axios.get("/user/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data.reverse());
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="notes-title my-2">Welcome Back {name}</div>
      <div className="notes-title-brdbtm mb-3"></div>
      <Link to="/createnote">
        <button type="button" className="btn btn-success btn-lg">
          Add Note
        </button>
      </Link>
      <div className="py-4">
        <Accordion>
          {notes?.map((note, ind) => (
            <Card key={ind} className="my-3">
              <Accordion.Item eventKey={ind.toString()}>
                <Accordion.Header>
                  <div className="fs-5">{note.title}</div>
                </Accordion.Header>
                <Accordion.Body className="px-3 py-1">
                  <blockquote className="blockquote mb-0">
                    <p className="mt-1 mb-0 pe-4">{note.content}</p>
                    <footer className="blockquote-footer my-1">
                      <span className="badge rounded-pill bg-success pb-1">
                        {note.category}
                      </span>
                    </footer>
                  </blockquote>
                  <div className="w-100 d-flex">
                    <div className=" ms-auto mb-1">
                      <Link to={{ pathname: "/editnote", state: { note } }}>
                        <button
                          type="button"
                          className="btn btn-info btn-sm px-2 mx-2"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm px-2 mx-2"
                        onClick={() =>
                          dispatch(
                            deleteNoteAction(note._id, token, history, "/login")
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};

export default Notes;
