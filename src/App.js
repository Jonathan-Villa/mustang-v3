import * as M from "@material-ui/core";
import { useState, useEffect } from "react";
import "./index.css";
import { useStyles } from "./styles/styles";
import Inputs from "./components/inputs";
import { MdAddCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import useInput from "./helpers/useInput";
import axios from "axios";

function App() {
  const styles = useStyles();

  const [input, setInput] = useState({});
  const [createClick, setCreateClick] = useState(false);
  const [updateClick, setUpdateClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [state, bindState, resetState] = useInput("");
  const [city, bindCity, resetCity] = useInput("");
  const [zip, bindZip, resetZip] = useInput("");

  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      await axios
        .get("http://localhost:4000/")
        .then(({ data }) =>
          setStorage({
            items: data.map((index) => ({
              id: index._id,
              firstName: index.firstName,
              lastName: index.lastName,
              state: index.state,
              city: index.city,
              zip: index.zip,
            })),
          })
        )
        .catch((err) => console.log(err));
    };
    fetchContacts();
  }, []);

  const handleReadClick = () => {
    setReadOnly(true);
    setCreateClick(false);
    setUpdateClick(false);
    setDeleteClick(false);
  };

  const handleClickDelete = async () => {
    setReadOnly(true);
    setDeleteClick(true);
    setUpdateClick(false);
    setCreateClick(false);
  };

  const handleCreateClick = () => {
    setCreateClick(true);
    setDeleteClick(false);
    setUpdateClick(false);
  };

  const handleUpdateClick = () => {
    setReadOnly(true);
    setUpdateClick(true);
    setCreateClick(false);
    setDeleteClick(false);
  };

  const handleItemClick = (e) => {
    storage.items.forEach((element, key) => {
      if (key === e) {
        return setInput(element);
      }
    });
  };

  const handleTrashClick = (e) => {
    storage.items.forEach(async (element, key) => {
      if (key === e) {
        return await axios
          .post("http://localhost:4000/delete", element)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/update", {
        id: input.id,
        firstName: firstName,
        lastName: lastName,
        state: state,
        city: city,
        zip: zip,
      })
      .then((res) => console.log(res))
      .catch((err) => alert(err));

    // clear the input fields
    resetFirstName();
    resetLastName();
    resetState();
    resetCity();
    resetZip();
  };

  return (
    <M.Container className={styles.root}>
      <M.Container maxWidth="md" className={styles.subRoot}>
        <M.Container
          maxWidth="xs"
          className={styles.btnContainer}
          variant="elevation"
          elevation={3}
        >
          <div className="input-container">
            <h2>Create, Read, Update, Delete</h2>
            <div className="btn-container">
              <M.Button
                variant="contained"
                onClick={handleCreateClick}
                aria-label="Clear"
                color="primary"
                className={styles.btnCrud}
              >
                Create
              </M.Button>
              <M.Button
                className={styles.btnCrud}
                variant="contained"
                onClick={handleReadClick}
                aria-label="click me"
                color="primary"
              >
                Read
              </M.Button>
              <M.Button
                className={styles.btnCrud}
                onClick={handleUpdateClick}
                variant="contained"
                aria-label="Clear"
                color="primary"
              >
                Update
              </M.Button>

              <M.Button
                className={styles.btnCrud}
                onClick={handleClickDelete}
                variant="contained"
                aria-label="Clear"
                color="primary"
              >
                Delete
              </M.Button>
            </div>
            {createClick ? <Inputs /> : null}

            {updateClick ? (
              input !== null ? (
                <form
                  className="form-update-container"
                  onSubmit={handleUpdateSubmit}
                >
                  <M.IconButton className={styles.iconBtn} type="submit">
                    <MdAddCircle />
                  </M.IconButton>

                  <input
                    list="firstName"
                    placeholder={input.firstName}
                    name="firstName"
                    {...bindFirstName}
                  />

                  <input
                    list="lastName"
                    placeholder={input.lastName}
                    name="lastName"
                    {...bindLastName}
                  />

                  <input
                    list="state"
                    placeholder={input.state}
                    name="state"
                    {...bindState}
                  />
                  <input
                    list="city"
                    placeholder={input.city}
                    name="city"
                    {...bindCity}
                  />
                  <input
                    list="zip"
                    name="zip"
                    placeholder={input.zip}
                    {...bindZip}
                  />

                  <datalist id="firstName">
                    {storage.items.map((m, key) => (
                      <div key={key}>
                        <option value={m.firstName} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="lastName">
                    {storage.items.map((m, key) => (
                      <div key={key}>
                        <option value={m.lastName} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="state">
                    {storage.items.map((m, key) => (
                      <div key={key}>
                        <option value={m.state} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="city">
                    {storage.items.map((m, key) => (
                      <div key={key}>
                        <option value={m.city} />
                      </div>
                    ))}
                  </datalist>
                  <datalist id="zip">
                    {storage.items.map((m, key) => (
                      <div key={key}>
                        <option value={m.zip} />
                      </div>
                    ))}
                  </datalist>
                </form>
              ) : (
                ""
              )
            ) : null}
          </div>
        </M.Container>

        <M.Paper className={styles.paper2} variant="elevation" elevation={3}>
          <div className="input-container2">
            <h1>Contact URLs</h1>

            <div>
              {readOnly
                ? storage.items.map((m, index) => (
                    <ul
                      className={styles.ul}
                      onClick={() => handleItemClick(index)}
                      key={index}
                    >
                      <div>
                        {deleteClick ? (
                          <M.IconButton
                            onClick={() => handleTrashClick(index)}
                            className={styles.iconBtnTrash}
                          >
                            <FaTrash size="20px" />
                          </M.IconButton>
                        ) : null}
                      </div>
                      <li className="api-container2">
                        {`First Name: ${m.firstName}`}
                        <br />
                        {`Last Name: ${m.lastName}`}
                        <br />
                        {`State: ${m.state}`}
                        <br />
                        {`City: ${m.city}`}
                        <br />
                        {`Zip: ${m.zip}`}
                      </li>
                    </ul>
                  ))
                : null}
            </div>
          </div>
        </M.Paper>
      </M.Container>
    </M.Container>
  );
}

export default App;
