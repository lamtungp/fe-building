import React, { ChangeEvent } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import EmployeeServices from 'src/common/redux/employee/services';
import DatePicker from '@mui/lab/DatePicker';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CompanyServices from 'src/common/redux/company/services';

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('Name is required'),
  card_id: yup
    .string()
    .required('Address is required'),
  phone_number: yup
    .string()
    .required('Phone Number is required'),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormEmployee: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedCompany, setSelectedCompany] = React.useState('');

  const MySwal = withReactContent(Swal)

  const [employee, setEmployee] = React.useState({
    name: '',
    card_id: '',
    phone_number: '',
  })

  const [listCompany, setListCompany] = React.useState([])

  const getEmployee = async (id : string): Promise<any> => {
    const data = await EmployeeServices.show(id);
    setEmployee(data);
    setSelectedDate(data.dob)
    setSelectedCompany(data.company_id)
  }

  const getListCompany = async (): Promise<any> => {
    const data = await CompanyServices.index();
    setListCompany(data);
  }

  React.useEffect(() => {
    if (id) {
      getEmployee(id);
    }
    getListCompany();
  }, [])

  const handleEvent = async (values: any): Promise<any> => {
    values = {...values, dob: selectedDate, company_id: selectedCompany}
    let res: any;
    try {
      if (id) {
        res = await EmployeeServices.update(values)
      } else {
        res = await EmployeeServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update employee successfully' : 'Create employee successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/employees')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Create employee fail' : 'Update employee fail',
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

  const handleSelectedDate = (newValue: any): void => {
    setSelectedDate(newValue);
  };

  const handleSelectedCompany = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCompany(e.target.value)
  }

  return (
    <div>
      <Helmet>
        <title>Form Employee</title>
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
                    Employee Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to your employee details
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
              <Formik
                  initialValues={employee}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <form>
                      <Grid item xs={12}>
                        <TextField
                            margin={'normal'}
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
                          id="card_id"
                          name="card_id"
                          label="Card ID"
                          value={values.card_id}
                          onChange={handleChange}
                          error={touched.card_id && Boolean(errors.card_id)}
                          helperText={touched.card_id && errors.card_id}
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

                      <Grid container spacing={3}>
                      <Grid item xs={6}>
                          <FormControl fullWidth sx={{ marginTop: 1 }}>
                            <InputLabel>Select Company</InputLabel>
                            <Select
                              value={selectedCompany}
                              onChange={handleSelectedCompany}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                            >
                              {listCompany.map((company) => (
                                <MenuItem
                                  key={company.id}
                                  value={company.id}
                                >
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6} marginTop={1}>
                          <DatePicker
                              label="Day of Birth"
                              inputFormat="dd/MM/yyyy"
                              value={selectedDate}
                              onChange={handleSelectedDate}
                              renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/employees')}>
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

export default FormEmployee;