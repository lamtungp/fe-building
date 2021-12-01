import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate } from 'react-router-dom';
import Footer from 'src/components/Footer';
import BuildingServices from 'src/common/redux/building/services';
import { BuildingParams } from 'src/common/redux/building/ActionTypes';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('Name building is required'),
    address: yup
    .string()
    .required('Address is required'),
    hotline: yup
    .string()
    .required('Hotline is required')
});

const FormBuilding: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const [building, setBuilding] = React.useState<BuildingParams>({
    name: '',
    address: '',
    hotline: ''
  })

  const getInforBuilding = async () => {
    const data = await BuildingServices.show()
    setBuilding(data)
  }

  React.useEffect(() => {
    getInforBuilding()
  }, [])

  

  const handleUpdate = async (values: any) => {
    const res = await BuildingServices.update(values)
    if (res) {
      MySwal.fire({
        text: 'Update building information successfully',
        icon: 'success',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await getInforBuilding();
        }
      })
    }
  }

  return (
    <div>
      <Helmet>
        <title>Form Building</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg" fixed>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
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
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
              <Formik
                initialValues={building}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => {
                  handleUpdate(values);
                }}
                validateOnChange={true}
            >
              {({ handleChange, handleSubmit, errors, touched, values }) => (
                <form>
                  <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name Building"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                  </Grid>

                  <Grid item xs={12} marginTop={2}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12} marginTop={2}>
                    <TextField
                      fullWidth
                      id="hotline"
                      name="hotline"
                      label="Hotline"
                      value={values.hotline}
                      onChange={handleChange}
                      error={touched.hotline && Boolean(errors.hotline)}
                      helperText={touched.hotline && errors.hotline}
                    />
                  </Grid>

                  <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                    <Button color="primary" variant="outlined" onClick={() => navigate('/management/building-information')}>
                      Back
                    </Button>
                    <Button color="primary" variant="contained" onClick={() => handleSubmit()}>
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
                
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default FormBuilding;