import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import "./Director.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getDirector } from "../../features/apiCall";

export default function EditDirector() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { director } = useSelector((state) => state.director);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.general);

  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Edit Director" }));
  },[])

  useEffect(() => {
    getDirector(dispatch, token, id);
  }, [dispatch, token, id]);

  useEffect(() => {
    if (director.name) {
      setName(director.name);
      
    }
  }, [director]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name && !profile) {
      toast.warning("Please Fill Atleast One Fieled");
      return;
    }
    try {
      dispatch(setLoading());
      const formData = new FormData();
      formData.append("name",name);
      profile&&formData.append("image",profile);
      const { data } = await axios.patch(
        `/api/director/update-director/${id}`,
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Director Updated Successfully.  Redirecting...");
        setTimeout(() => {
          navigate("/admin/directors");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
  
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Director Name</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Profile</label>
            </Col>
            <Col sm={12} md={8}>
            <Form.Control
                
                onChange={(e) => setProfile(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={submitHandler}>
                {loading ? <Spinner /> : "Update"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
