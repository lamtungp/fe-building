import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate } from 'react-router-dom';
import Footer from 'src/components/Footer';
import CompanyServices from 'src/common/redux/company/services';

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('The name of company is required'),
  tax_code: yup
    .string()
    .required('Tax code is required'),
  capital: yup
    .string()
    .required('Capital is required'),
  filed_operation: yup
    .string()
    .required('Filed operation is required'),
    phone_number: yup
    .string()
    .required('Phone number is required')
});

const FormCompany: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      tax_code: '',
      capital: '',
      filed_operation: '',
      phone_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUpdate(values)
    },
  });

  const handleUpdate = async (values: any) => {
    console.log(values);
    // await CompanyServices.update(values)
  }

  return (
    <div>
      <Helmet>
        <title>Form Company</title>
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
                    Company Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to your company details
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
                        label="Name"
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
                      id="tax_code"
                      name="tax_code"
                      label="Tax Code"
                      value={formik.values.tax_code}
                      onChange={formik.handleChange}
                      error={formik.touched.tax_code && Boolean(formik.errors.tax_code)}
                      helperText={formik.touched.tax_code && formik.errors.tax_code}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      margin={'normal'}
                      fullWidth
                      id="capital"
                      name="capital"
                      label="Authorized capital"
                      value={formik.values.capital}
                      onChange={formik.handleChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                      }}
                      error={formik.touched.capital && Boolean(formik.errors.capital)}
                      helperText={formik.touched.capital && formik.errors.capital}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin={'normal'}
                      fullWidth
                      id="filed_operation"
                      name="filed_operation"
                      label="Filed Operation"
                      value={formik.values.filed_operation}
                      onChange={formik.handleChange}
                      error={formik.touched.filed_operation && Boolean(formik.errors.filed_operation)}
                      helperText={formik.touched.filed_operation && formik.errors.filed_operation}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin={'normal'}
                      fullWidth
                      id="phone_number"
                      name="phone_number"
                      label="Phone Number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                      helperText={formik.touched.phone_number && formik.errors.phone_number}
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

export default FormCompany;