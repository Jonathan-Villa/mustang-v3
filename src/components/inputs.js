import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import useInput from "../helpers/useInput";
import { inputStyles } from "./inputstyles";
import axios from "axios";

function Inputs(props) {
  const styles = inputStyles();
  const [firstName, bindFirstName, resetFirstName] = useInput("");
  const [lastName, bindLastName, resetLastName] = useInput("");
  const [zip, bindZip, resetZip] = useInput("");
  const [location, setLocation] = useState({ state: "", city: "" });

  useEffect(() => { 
    
    const getZip = async () => 
      await axios
        .get(`https://zip.getziptastic.com/v2/US/${zip}`)
        .then(({ data }) =>
          setLocation({
            city: data.city,
            state: data.state,
          })
        )
        .catch((err) =>
          setLocation({
            city: "Enter a valid postal code",
            state: "Enter a valid postal code ",
          })
        );
    getZip();
  }, [zip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInputData = {
      // object with form data
      firstName: firstName,
      lastName: lastName,
      city: location.city,
      state: location.state,
      zip: zip,
    };

    await axios
      .post("http://localhost:4000/api/create", userInputData)
      .then((e) => console.log("Successful register"))
      .catch((err) => console.log(err));

    // clear fields
    resetFirstName();
    resetLastName();
    resetZip();
  };

  return (
    <form typeof="post" className="form-container" onSubmit={handleSubmit}>
      <TextField
        size="small"
        className={styles.root}
        type="text"
        required={true}
        variant="standard"
        name="firstName"
        autoFocus={true}
        label="First Name"
        inputProps={props.inputFName}
        {...bindFirstName}
      />

      <TextField
        size="small"
        className={styles.root}
        required={true}
        variant="standard"
        name="lName"
        label="Last Name"
        {...bindLastName}
      />

      <TextField
        disabled
        size="small"
        className={styles.root}
        required={true}
        name="state"
        label="State"
        value={location.state}
      />
      <TextField
        disabled
        size="small"
        className={styles.root}
        required={true}
        name="city"
        label="City"
        value={location.city}
      />

      <TextField
        size="small"
        className={styles.root}
        required={true}
        variant="standard"
        name="zip"
        label="Zip"
        {...bindZip}
      />

      <Button
        className={styles.btn}
        variant="outlined"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default Inputs;
