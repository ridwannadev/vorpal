import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export default function EditData() {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [registrationForm, setRegistrationForm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/datas/${id}`)
      .then((response) => {
        const data = response.data;
        setEventName(data.eventName || "");
        setDescription(data.description || "");
        setDate(data.date || "");
        setCategory(data.category || "");
        setEligibility(data.eligibility || "");
        setLocation(data.location || "");
        setCost(data.cost || "");
        setRegistrationForm(data.registrationForm || "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    await axios.put(`/datas/${id}`, {
      eventName,
      description,
      date,
      category,
      eligibility,
      location,
      cost,
      registrationForm,
    });
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-4">
        <h2 className="my-5">Edit Event Data</h2>
        <div className="row">
          <div className="col">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="eventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the event name"
                    value={eventName}
                    onChange={(ev) => setEventName(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Select the event date"
                    value={date}
                    onChange={(ev) => setDate(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(ev) => setCategory(ev.target.value)}
                    required
                  >
                    <option disabled>Choose</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    {/* Add more categories as needed */}
                  </Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="eligibility">
                  <Form.Label>Eligibility</Form.Label>
                  <Form.Control
                    as="select"
                    value={eligibility}
                    onChange={(ev) => setEligibility(ev.target.value)}
                    required
                  >
                    <option disabled>Choose</option>
                    <option value="Open for all">Open for all</option>
                    <option value="Age-restricted">Age-restricted</option>
                    {/* Add more eligibility options as needed */}
                  </Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the location"
                    value={location}
                    onChange={(ev) => setLocation(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="cost">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the cost"
                    value={cost}
                    onChange={(ev) => setCost(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="registrationForm">
                  <Form.Label>Registration Form</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter the registration form link"
                    value={registrationForm}
                    onChange={(ev) => setRegistrationForm(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="Enter the event description"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <p>
                  <br />
                </p>
                <Button type="submit" className="py-2 px-3 rounded btn-red">
                  Submit
                </Button>
                <a
                  href="/"
                  type="button"
                  className="py-2 px-3 rounded btn-red ms-2"
                >
                  Back
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
