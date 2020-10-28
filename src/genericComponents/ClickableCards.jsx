import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: theme.spacing(0.5),
  },
  cardButton: {
    width: "100%",
    "& > *": {
      width: "100%",
      textAlign: "left",
    },
  },
}));

// List of cards which are clickable and show title and description
const ClickableCards = (props) => {
  const classes = useStyles();
  const { cardList, handleClick, clickDataKey } = props;

  return (
    <>
      {cardList.map((cardData) => (
        <Card className={classes.root} key={cardData.title}>
          <ButtonBase
            className={classes.cardButton}
            onClick={() => {
              handleClick(cardData[clickDataKey]);
            }}
          >
            <CardContent>
              <Typography variant="body1" component="p" noWrap>
                {cardData.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                noWrap
              >
                {cardData.description}
              </Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      ))}
    </>
  );
};

export default ClickableCards;
