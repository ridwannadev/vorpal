import eventLogo from "./assets/event.svg";
import eventPhoto from "./assets/eventPhoto.svg";
import Card from "react-bootstrap/Card";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { useState, useEffect } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/datas").then((res) => {
      setEvents(res.data);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div
        className="container hero"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div className="row d-flex align-items-center justify-content-evenly">
          <div
            className="col-5 fw-bold text-capitalize"
            style={{ borderBottom: "none" }}
          >
            Notes and manages events
            <a href="/add" style={{ textDecoration: "none", color: "green" }}>
              {" "}
              Add
            </a>
          </div>
          <div className="col-5">
            <img src={eventLogo} alt="Event Logo" />
          </div>
        </div>
      </div>

      <hr />

      <div className="container my-4">
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-3 mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={eventPhoto}
                  alt={event.eventName}
                />
                <Card.Body>
                  <Card.Title>{event.eventName}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <a
                    href={`/detail/${event._id}`}
                    className="py-2 px-3 rounded btn"
                  >
                    Detail
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
