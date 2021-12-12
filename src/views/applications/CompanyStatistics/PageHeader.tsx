import { Typography, Grid } from '@mui/material';

const PageHeader: React.FunctionComponent = (): React.ReactElement => {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Salary's Staff
        </Typography>
        <Typography variant="subtitle2">
          These are your recent Salary's Staff
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
