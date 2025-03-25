import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Position = {
  lat: number;
  lng: number;
};

interface Bird {
  speciesCode: string;
  comName: string;
  sciName: string;
  locId: string;
  locName: string;
  obsDt: string;
  howMany: number;
  lat: number;
  lng: number;
  obsValid: boolean;
  obsReviewed: boolean;
  locationPrivate: boolean;
  subId: string;
}

function Birds() {
  const key = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  console.log(state);

  const [birdData, setBirdData] = useState<Bird[]>([]);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `https://api.ebird.org/v2/data/obs/geo/recent?lat=${state[0].lat}&lng=${state[0].lng}&back=${state[1]}&dist=${state[2]}`,
        {
          headers: {
            "X-eBirdApiToken": key,
          },
        }
      );
      setBirdData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("fail :(");
    }
  };

  const handleClick = () => {
    fetchdata();
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
      <button onClick={handleBackClick}>Back</button>
      <button onClick={handleClick}>Get data</button>

      {birdData ? (
        <>
          {birdData.map((bird, index) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {bird.howMany ? (
                  <Typography key={bird.speciesCode}>
                    {bird.comName} seen {bird.howMany} times
                  </Typography>
                ) : (
                  <Typography key={bird.speciesCode}>
                    {bird.comName} seen several times
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>seen at {bird.locName}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ) : (
        <>
          <p>data loading...</p>
        </>
      )}
    </>
  );
}

export default Birds;
