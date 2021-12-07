import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import SvServices from 'src/common/redux/service/services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('Name building is required'),
  type: yup
    .string()
    .required('Address is required'),
  unit_price: yup
    .number()
    .required('Hotline is required')
});

const props = {
  title: 'Services',
  subtitle: 'These are your recent services',
  redirect: 'management/add-service',
  action: 'Add service'
}

const FormService: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  
  const { id } = useParams();

  const [service, setService] = useState({
    name: '',
    type: '',
    unit_price: ''
  })

  const getService = async (id: string) => {
    try {
      const data = await SvServices.show(id)
      setService(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getService(id);
    }
  }, [id])

  const handleEvent = async (values: any) => {
    let res: any;
    try {
      if (id) {
        res = await SvServices.update(values)
      } else {
        res = await SvServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update service successfully' : 'Create service successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/services')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Create service fail' : 'Update service fail',
          icon: 'error'
        })
      }
    } catch (error) {
      MySwal.fire({
        text: error.message,
        icon: 'error'
      })
    }
    // await BuildingServices.update(values)
  }

  return (
    <div>
      <Helmet>
        <title>Form Service</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader props={props} />
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
                    Service Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to your service details
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
                <Formik
                    initialValues={service}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {
                      handleEvent(values);
                    }}
                    validateOnChange={true}
                  >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <form>
                      {( id && ( values.name === "Security service" || values.name === "Cleaning service" )) ? 
                        <Grid item xs={12}>
                          <TextField
                            margin={'normal'}
                            fullWidth
                            id="name"
                            name="name"
                            label="Name Service"
                            value={values.name}
                            disabled
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Grid>
                      : <Grid item xs={12}>
                          <TextField
                              margin={'normal'}
                              fullWidth
                              id="name"
                              name="name"
                              label="Name Service"
                              value={values.name}
                              onChange={handleChange}
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                        </Grid> 
                      }

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="type"
                          name="type"
                          label="Type"
                          value={values.type}
                          onChange={handleChange}
                          error={touched.type && Boolean(errors.type)}
                          helperText={touched.type && errors.type}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="unit_price"
                          name="unit_price"
                          label="Unit Price"
                          value={values.unit_price}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                          }}
                          error={touched.unit_price && Boolean(errors.unit_price)}
                          helperText={touched.unit_price && errors.unit_price}
                        />
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/services')}>
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

export default FormService;