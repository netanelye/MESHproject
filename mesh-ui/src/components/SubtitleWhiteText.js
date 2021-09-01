import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

export default function SubtitleWhiteText() {
  return (
    <div className="SubtitleWhiteText" style={{ backgroundColor: "black" }}>
      <WhiteTextTypography variant="h3">
      רעבים?
ספרו לנו אילו מצרכים יש לכם בבית ותשאירו לנו לעשות את העבודה
Mesh מחפש עבורך את המתכון המתאים מתוך מאות מתכונים מרחבי הרשת

      </WhiteTextTypography>
    </div>
  );
}