import React, { useState, useEffect } from "react";
import axios from "axios";

const PollAdmin = () => {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem("authToken");
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`${baseURL}/polls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolls(response.data.data.filter((poll) => !poll.isAlreadyVote));
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {polls.map((poll) => (
        <div
          key={poll.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "15px",
            margin: "10px 0",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              borderBottom: "2px solid #222",
              paddingBottom: "10px",
            }}
          >
            {poll.name}
          </h2>
          {poll.options.map((p) => (
            <div
              key={p.text}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "5px 0",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>{p.text}</p>
              <p style={{ fontSize: "16px" }}>{p.votes} votes</p>
            </div>
          ))}
          <p>Total Votes: {poll.totalVotes}</p>
          <p style={{ fontWeight: "bold" }}>Result: {poll.voteResult}</p>
        </div>
      ))}
    </div>
  );
};

export default PollAdmin;
