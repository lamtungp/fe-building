import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import CompanyServices from 'src/common/redux/company/services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('The name of company is required'),
  tax_code: yup
    .string()
    .required('Tax code is required'),
  capital: yup
    .number()
    .required('Capital is required'),
  field_operation: yup
    .string()
    .required('Filed operation is required'),
  phone_number: yup
    .string()
    .required('Phone number is required')
});

const FormCompany: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const { id } = useParams()

  const [company, setCompany] = React.useState({
    name: '',
    tax_code: '',
    capital: 0,
    field_operation: '',
    phone_number: ''
  })

  const getCompany = async (id : string) => {
    const data = await CompanyServices.show(id);
    setCompany(data);
  }

  React.useEffect(() => {
    if (id) {
      getCompany(id);
    }
  }, [id])

  const handleEvent = async (values: any) => {
    console.log(values);
    values.capital = Number(values.capital)
    let res: any;
    try {
      if (id) {
        res = await CompanyServices.update(values)
      } else {
        res = await CompanyServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update company successfully' : 'Create company successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/companies')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Create company fail' : 'Update company fail',
          icon: 'error'
        })
      }
    } catch (error) {
      MySwal.fire({
        text: error.message,
        icon: 'error'
      })
    }
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
                <Formik
                  initialValues={company}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="tax_code"
                          name="tax_code"
                          label="Tax Code"
                          value={values.tax_code}
                          onChange={handleChange}
                          error={touched.tax_code && Boolean(errors.tax_code)}
                          helperText={touched.tax_code && errors.tax_code}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="capital"
                          name="capital"
                          label="Authorized capital"
                          value={values.capital}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                          }}
                          error={touched.capital && Boolean(errors.capital)}
                          helperText={touched.capital && errors.capital}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="field_operation"
                          name="field_operation"
                          label="Field Operation"
                          value={values.field_operation}
                          onChange={handleChange}
                          error={touched.field_operation && Boolean(errors.field_operation)}
                          helperText={touched.field_operation && errors.field_operation}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="phone_number"
                          name="phone_number"
                          label="Phone Number"
                          value={values.phone_number}
                          onChange={handleChange}
                          error={touched.phone_number && Boolean(errors.phone_number)}
                          helperText={touched.phone_number && errors.phone_number}
                        />
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/companies')}>
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

export default FormCompany;