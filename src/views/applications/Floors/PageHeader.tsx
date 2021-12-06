import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import { useNavigate, useParams } from 'react-router-dom';

const PageHeader: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Floors
        </Typography>
        <Typography variant="subtitle2">
          These are your recent floor
        </Typography>
      </Grid>
      <Grid item>
        { !id ? 
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => navigate('/management/add-floor')}
          >
            Add Floor
          </Button>
          : <></>
        }
      </Grid>
    </Grid>
  );
}

export default PageHeader;
