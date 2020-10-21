import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isOrange, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        (isOrange && "infoBox--orange") || (isRed && "infoBox--red")
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${isOrange ? "infoBox__cases--orange":((!isRed)&& "infoBox__cases--green")}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
