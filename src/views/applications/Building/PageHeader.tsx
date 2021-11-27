import { Typography, Grid } from '@mui/material';

const PageHeader: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        Building Information
        </Typography>
        <Typography variant="subtitle2">
          These are your recent building information
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
