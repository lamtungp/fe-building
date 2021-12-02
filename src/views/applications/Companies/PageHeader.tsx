import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate, useParams } from 'react-router-dom';

const PageHeader: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams();
  
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Companies
        </Typography>
        <Typography variant="subtitle2">
          These are building's companiesrecent
        </Typography>
      </Grid>
      { !id ? 
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => navigate('/management/add-company')}
            >
              Add company
            </Button>
          </Grid>
        : <></>
      }
    </Grid>
  );
}

export default PageHeader;
