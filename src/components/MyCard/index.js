import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const MyCard = ({ title, desc }) => (
  <Card>
    <CardContent>
      <Typography component="h5" variant="h5">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {desc}
      </Typography>
    </CardContent>
  </Card>
);

export default MyCard;