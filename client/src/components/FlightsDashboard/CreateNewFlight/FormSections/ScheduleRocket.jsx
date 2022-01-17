import React from "react";
import DivideFlights from "../../DivideFlights";
import styled from "styled-components";
import { useState, useEffect } from "react";
import rocketService from "../../../../services/rockets";

function ScheduleRocket({
  selectedRocket,
  setSelectedRocket,
  setFuelForFlight,
  setDurationSeconds,
}) {
  const [notification] = useState("");
  const [name, setName] = useState("Over the moon");
  const [time, setTime] = useState("12:15");
  const [date, setDate] = useState("2022-01-12");
  const [distance, setDistance] = useState(3000000);
  const [touchdownDate, setTouchdownDate] = useState(null);
  const [touchdownTime, setTouchdownTime] = useState(null);
  const [rockets, setRockets] = useState([]);

  const [durationHours, setDurationHours] = useState();
  const [durationMinutes, setDurationMinutes] = useState();
  const [durationDays, setDurationDays] = useState();

  useEffect(() => {
    const getAllRockets = async () => {
      const allRockets = await rocketService.getAll();
      setRockets(allRockets);
    };
    getAllRockets();
  }, []);

  // calculate touchdown
  useEffect(() => {
    if (!selectedRocket) return;

    const durationSeconds = distance / selectedRocket.speed;
    const takeOffTime = new Date(`${date} ${time}`);
    const takeOffTimeSeconds = takeOffTime.getTime() / 1000;
    const touchDown = takeOffTimeSeconds + durationSeconds;
    const touchDownTime = new Date(touchDown * 1000);
    const durationMinutes = (durationSeconds / 60) % 60;
    const durationHours = durationSeconds / 60 / 60;
    const durationDays = durationHours / 24;

    setDurationSeconds(durationSeconds);

    setTouchdownDate(touchDownTime.toLocaleDateString());
    setTouchdownTime(
      touchDownTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    setDurationHours(Math.round(durationHours));
    setDurationMinutes(Math.round(durationMinutes));
    setDurationDays(durationDays.toFixed(1));
  }, [selectedRocket, time, date, distance]);

  useEffect(() => {
    if (!selectedRocket) return;
    setFuelForFlight(distance * selectedRocket.consumption);
  }, [selectedRocket, distance]);

  return (
    <>
      <DivideFlights>schedule&rocket</DivideFlights>
      <StyledFormSection>
        <div className="item">
          <label>Mission name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label className="grow">Time of take off:</label>
          <input
            className="time"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <input
            className="date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <label className="grow">Distance:</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
            }}
          />
          KM
        </div>
        <div className="item">
          <label>Choose a rocket:</label>
          <select
            onChange={(e) => {
              setSelectedRocket(
                rockets.filter((r) => {
                  return r.name === e.target.value;
                })[0]
              );
            }}
          >
            {rockets.map((r) => {
              return (
                <option value={r.name} key={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="item calc">
          Time of touch down:{" "}
          <span>
            {touchdownTime}
            {"    "}
            {touchdownDate}
          </span>
        </div>
        <div className="item calc">
          Flight's duration:{" "}
          <span>
            {durationHours}hrs {durationMinutes}min {durationDays}days
          </span>{" "}
        </div>
        <div className="notification">{notification}</div>
      </StyledFormSection>
    </>
  );
}

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;

  .item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #f7911d54;
    padding: 0.5rem 1.5rem;
    margin: 2px 0;
  }

  .calc {
    border: 1px solid #191e3b16;
  }

  .time {
    width: 95px;
  }

  .date {
    width: 125px;
  }

  .grow {
    flex-grow: 1;
  }

  .notification {
    margin-top: 1rem;
    align-self: center;
  }
`;

export default ScheduleRocket;
