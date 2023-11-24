import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchbatches } from "../../features/batch/batchSlice";
import { Col, Container, Row } from "react-bootstrap";
import { fetchAccounts } from "../../features/account/accountSlice";
import Loading from "../../utils/Loading";

const AdminDash = () => {
  const { user } = useAuth();
  const { accounts, isLoading, isError, error } = useSelector(
    (state) => state.accounts
  );
  const { batches } = useSelector((state) => state.batches);

  // profile image upload
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    // You can implement the image upload logic here
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchbatches());
  }, [dispatch]);

  const filterAccount = accounts.filter((a) => a.email === user?.email);

  console.log(filterAccount);
  const filterTeacher = accounts.filter((a) => a.teacher == true);
  const filterStudents = accounts.filter((a) => a.student == true);
  // what to render
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && !isError && accounts.length > 0) {
    content = (
      <div className="batch admin_dash">
        <h4>Profile </h4>
        <Row>
          <h5>
            Name: {filterAccount[0]?.name}
          
          </h5>
          <Col md={6} lg={6}>
            <div className="profile_left">
              <p>Department: {filterAccount[0]?.department}</p>
              <p>email: {filterAccount[0]?.email}</p>
              <p>Joined: {filterAccount[0]?.createdAt}</p>
              <p>Blood: {filterAccount[0]?.blood}</p>
              <p>Birthday: {filterAccount[0]?.birth}</p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <>
      <Container>
        <div className="batch boxes">
          <div className="pro_img">
            {selectedImage && (
              <div className="pro_img_holder">
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            )}
            <img src="https://drive.google.com/file/d/1XVbfPQyfjR084yBQVNNLBMVhBGKTCta1/view" alt="amar" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
          </div>
          {content}
          <Row>
            <Col md={4}>
              <div className="box">
                <h5>{filterTeacher.length}</h5>
                <p>Total Teacher</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="box">
                <h5>{filterStudents.length}</h5>
                <p>Total Students</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="box">
                <h5>{batches.length}</h5>
                <p>Total Batches</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default AdminDash;
