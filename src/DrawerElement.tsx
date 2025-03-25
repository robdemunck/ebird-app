import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import "./DrawerElement.css";

interface DrawerComponentProps {
  sendSlideDataToParent: (back: number, dist: number) => void;
}

const DrawerElement: React.FC<DrawerComponentProps> = ({
  sendSlideDataToParent,
}) => {
  const [open, setOpen] = useState(false);

  const [back, setBack] = useState(14);

  const [dist, setDist] = useState(25);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handlebackChange = (event: any, newBack: any) => {
    setBack(newBack);
    sendSlideDataToParent(back, dist);
  };

  const handledistChange = (event: any, newDist: any) => {
    setDist(newDist);
    sendSlideDataToParent(back, dist);
  };

  const SliderElement = (
    <Box sx={{ width: 300 }} role="presentation">
      <p>Days</p>
      <Slider
        aria-label="Small steps"
        defaultValue={14}
        step={1}
        marks
        min={1}
        max={30}
        valueLabelDisplay="auto"
        onChange={handlebackChange}
      />
      <p>Distance</p>
      <Slider
        aria-label="Small steps"
        defaultValue={25}
        step={1}
        marks
        min={1}
        max={50}
        valueLabelDisplay="auto"
        onChange={handledistChange}
      />
    </Box>
  );

  return (
    <div>
      <button className="drawerbutton" onClick={toggleOpen}>
        Open Slider
      </button>
      <Drawer open={open} onClose={toggleOpen}>
        {SliderElement}
      </Drawer>
    </div>
  );
};

export default DrawerElement;
