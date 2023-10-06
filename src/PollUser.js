import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Radio } from "antd";

const PollUser = () => {
  const [polls, setPolls] = useState([]);
  const [values, setValues] = useState([]);
  const [texts, setTexts] = useState([]);
  const token = localStorage.getItem("authToken");
  const { name } = JSON.parse(localStorage.getItem("userData"));
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

  const onChange = (e, pollIndex) => {
    let updatedValues = [...values];
    updatedValues[pollIndex] = e.target.value;
    setValues(updatedValues);
  };

  const handleTextChange = (e, pollIndex) => {
    let updatedTexts = [...texts];
    updatedTexts[pollIndex] = e.target.value;
    setTexts(updatedTexts);
  };

  const handleSubmit = async (pollId, name, selectedOption) => {
    try {
      const payload = {
        name: name,
        optionIdx: selectedOption,
      };

      await axios.post(`${baseURL}/polls/${pollId}/vote`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== pollId));
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {polls.map((poll, pollIndex) => (
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
          <Radio.Group
            onChange={(e) => onChange(e, pollIndex)}
            value={values[pollIndex]}
            style={{ display: "block", marginBottom: "16px" }}
          >
            {poll.options.map((text, key) => (
              <Radio
                key={key}
                value={key}
                style={{ display: "block", marginBottom: "10px" }}
              >
                {text}
              </Radio>
            ))}
          </Radio.Group>
          <Input
            style={{ marginBottom: "16px" }}
            placeholder="Enter your name here"
            value={texts[pollIndex] || name}
            onChange={(e) => handleTextChange(e, pollIndex)}
          />
          <Button
            type="primary"
            onClick={() =>
              handleSubmit(poll.id, texts[pollIndex], values[pollIndex])
            }
          >
            Submit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PollUser;
