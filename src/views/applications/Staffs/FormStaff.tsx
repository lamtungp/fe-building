import React, { ChangeEvent, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import StaffServices from 'src/common/redux/staff/services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DatePicker } from '@mui/lab';
import { MenuProps } from 'src/common/constants/MenuProps';
import SalaryServices from 'src/common/redux/salary/services';
import FloorServices from 'src/common/redux/floor/services';

const validationSchema = yup.object({  
  name: yup
    .string()
    .required('Name building is required'),
  address: yup
    .string()
    .required('Address is required'),
  phone_number: yup
    .string()
    .required('Phone Number is required'),
});

const props = {
  title: 'Staff Building',
  subtitle: 'These are recent staff of building',
  redirect: 'management/add-staff',
  action: 'Add staff'
}

const FormStaff: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams()
  const MySwal = withReactContent(Swal)

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedPosition, setSelectedPosition] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');

  const [listPosition, setListPosition] = useState([])
  const [listLocation, setListLocation] = useState([])

  const [staff, setStaff] = useState({
    name: '',
    address: '',
    phone_number: '',
  })

  const getStaff = async (id : string): Promise<any> => {
    const data = await StaffServices.show(id);
    setStaff(data);
    setSelectedDate(data.dob);
    setSelectedLocation(data.floor_id);
    setSelectedPosition(data.salary_id)
  }

  const getListPosition = async (): Promise<any> => {
    const data = await SalaryServices.index();
    setListPosition(data)
  }

  const getListLocation = async (): Promise<any> => {
    const data = await FloorServices.index();
    setListLocation(data)
  }

  React.useEffect(() => {
    if (id) {
      getStaff(id);
    }
    getListPosition();
    getListLocation()
  }, [id])

  const handleEvent = async (values: any) => {
    values.dob = selectedDate;
    values.salary_id = selectedPosition;
    values.floor_id = selectedLocation;

    let res: any;
    try {
      if (id) {
        res = await StaffServices.update(values, id)
      } else {
        res = await StaffServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update Staff successfully' : 'Create Staff successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/staff-building')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Create Staff fail' : 'Update Staff fail',
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

  const handleSelectedPosition = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedPosition(e.target.value)
  }

  const handleSelectedLocation = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedLocation(e.target.value)
  }

  return (
    <div>
      <Helmet>
        <title>Form Staff</title>
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
                    Staff Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to your staff details
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
                <Formik
                  initialValues={staff}
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
                          id="address"
                          name="address"
                          label="Address"
                          value={values.address}
                          onChange={handleChange}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
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
                          <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel>Select Position</InputLabel>
                            <Select
                              value={selectedPosition}
                              onChange={handleSelectedPosition}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                            >
                              {listPosition.map((ps) => (
                                <MenuItem
                                  key={ps.id}
                                  value={ps.id}
                                >
                                  {`${ps.position} ${ps.salary_grade}`}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6} marginTop={2}>
                          <DatePicker
                              label="Day of Birth"
                              inputFormat="dd/MM/yyyy"
                              value={selectedDate}
                              onChange={handleSelectedDate}
                              renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth sx={{ marginTop: 3 }}>
                          <InputLabel>Select Location Working</InputLabel>
                          <Select
                            value={selectedLocation}
                            onChange={handleSelectedLocation}
                            input={<OutlinedInput label="Select Location Working" />}
                            MenuProps={MenuProps}
                          >
                            {listLocation.map((location) => (
                              <MenuItem
                                key={location.id}
                                value={location.id}
                              >
                                {location.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/staff-building')}>
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

export default FormStaff;