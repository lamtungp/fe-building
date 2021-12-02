import React from 'react'

import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
// import Label from 'src/components/Label';
import { useNavigate } from 'react-router-dom';
import BuildingServices from 'src/common/redux/building/services'
import { BuildingParams } from 'src/common/redux/building/ActionTypes';

const BuildingInformation: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();

  const [building, setBuilding] = React.useState<BuildingParams>({})

  const getInforBuilding = async () => {
    const data = await BuildingServices.show()
    setBuilding(data)
  }

  React.useEffect(() => {
    getInforBuilding()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Building Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your building details
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />} onClick={() => navigate('/building/edit-profile')}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4} textAlign={{ sm: 'left' }}>
                  <Box pr={3} pb={2}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Text color="black">
                    <b>{building.name}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={4} textAlign={{ sm: 'left' }}>
                  <Box pr={3} pb={2}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">
                      <b>{building.address}</b>
                    </Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} textAlign={{ sm: 'left' }}>
                  <Box pr={3} pb={2}>
                    Hotline:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Text color="black">
                      <b>{building.hotline}</b>
                    </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BuildingInformation