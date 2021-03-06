import React, { useState } from "react";
// import navbar from bootstrap
import { Form, Button } from "react-bootstrap";
import NavbarDNA from "../../components/Navbar/Navbar";
import styles from "./home.module.css";

const LOCALBACKEND = "http://localhost:8080";
const HEROKUBACKEND = "https://shrouded-mountain-85549.herokuapp.com/";

function Home() {
  const axios = require("axios");
  const axiosInstance = axios.create({
    baseURL: HEROKUBACKEND,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });

  const [namaPenyakit, setNamaPenyakit] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [sequence, setSequence] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChangePenyakit = (e) => {
    setNamaPenyakit(e.target.value);
  };

  const handleUploadText = function(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      setSequence(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      penyakit: namaPenyakit,
      sequence: sequence,
    };
    console.log(data);
    axiosInstance
      .post("/add", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setIsSuccess(true);
          setHasSubmitted(true);
        } else {
          setIsSuccess(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* show navbar from ../components/navbar */}
      <NavbarDNA />

      {/* create body form input name and upload file sequence dna */}
      <div className={styles.body}>
        <div class="align-self-center">
          {/* title "Tambahkan Penyakit" */}
          <div className={styles.container}>
            <div class="d-grid gap-3">
              <h1>Tambahkan Penyakit</h1>
              <Form>
                <div className={styles.form}>
                  <div class="d-grid gap-3">
                    <Form.Group controlId="formBasicNamaPenyakit">
                      <Form.Label>Nama Penyakit</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="contoh: HIV"
                        onChange={handleChangePenyakit}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicSequenceDNA">
                      <Form.Label>Upload Sequence DNA</Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="Enter file"
                        onChange={handleUploadText}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className={styles.submit}>
                  <div class="col-md-12 text-center">
                    <Button
                      variant="success"
                      type="button"
                      onClick={handleSubmit}
                    >
                      <strong>Submit</strong>
                    </Button>
                  </div>
                </div>
                <div className={styles.success}>
                  {hasSubmitted && isSuccess && (
                    <div class="alert alert-success" role="alert">
                      Sukses Menambahkan Penyakit!
                    </div>
                  )}
                  {hasSubmitted && !isSuccess && (
                    <div class="alert alert-danger" role="alert">
                      Gagal Menambahkan Penyakit!
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
