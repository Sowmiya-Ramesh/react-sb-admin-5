import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

function EditProfile() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [desc, setDesc] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = () => {
    editProfile(name, avatar, desc);
  };
  function getProfile(name, avatar, desc) {
    fetch(`https://616e34a2a83a850017caa86c.mockapi.io/profile/${id}`, {})
      .then((data) => data.json())
      .then((data) => {
        setName(data.name);
        setAvatar(data.avatar);
        setDesc(data.desc);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProfile();
  }, []);

  function editProfile(name, avatar, desc) {
    fetch(`https://616e34a2a83a850017caa86c.mockapi.io/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        avatar,
        desc
      })
    })
      .then((data) => data.json())
      .then((data) => history.push("/profiles"))
      .then((data) => alert("Profile updated successfully"))
      .catch((e) => console.log(e));
  }

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <br />
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Edit your Profile here !
      </Typography>
      <div
        className="vote-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <TextField
          className="input"
          style={{ padding: "10px" }}
          multiline
          id="outlined-multiline-static"
          label="Enter Name"
          rows={2}
          type="text"
          name="name"
          value={name}
          onChange={(data) => setName(data.target.value)}
        />
        <TextField
          className="input"
          style={{ padding: "10px" }}
          multiline
          id="outlined-multiline-static"
          label="Enter Image"
          rows={4}
          type="text"
          name="avatar"
          value={avatar}
          onChange={(data) => setAvatar(data.target.value)}
        />
        <TextField
          className="input"
          multiline
          id="outlined-multiline-static"
          label="Enter description"
          type="text"
          name="desc"
          value={desc}
          onChange={(data) => setDesc(data.target.value)}
          rows={4}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Edit Profile
          </Button>
          <Link to="/" className="btn btn-danger ml-2">
            Cancel
          </Link>
        </Stack>
      </div>
    </div>
  );
}
export default EditProfile;
