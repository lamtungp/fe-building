import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate } from 'react-router-dom';
import Footer from 'src/components/Footer';
import StaffServices from 'src/common/redux/staff/services';

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

const FormStaff: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      hotline: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdate(values)
    },
  });

  const handleUpdate = async (values: any) => {
    console.log(values);
    // await StaffServices.update(values)
  }

  return (
    <div>
      <Helmet>
        <title>Form Staff</title>
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
                <form onSubmit={formik.handleSubmit}>
                  <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name Building"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin={'normal'}
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin={'normal'}
                      fullWidth
                      id="hotline"
                      name="hotline"
                      label="Hotline"
                      value={formik.values.hotline}
                      onChange={formik.handleChange}
                      error={formik.touched.hotline && Boolean(formik.errors.hotline)}
                      helperText={formik.touched.hotline && formik.errors.hotline}
                    />
                  </Grid>

                  <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                    <Button color="primary" variant="outlined" onClick={() => navigate('/management/building-information')}>
                      Back
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default FormStaff;