import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MenuProps } from 'src/common/constants/MenuProps';
import WorkedTimeServices from 'src/common/redux/worked_time/services';
import StaffServices from 'src/common/redux/staff/services';

const validationSchema = yup.object({  
  worked_days: yup
    .number()
    .min(1, "Worked Days must be greater than or equal to 1 day")
    .max(22, "Worked Days must be less than or equal to 22 days")
    .required('Worked Days is required')
});

const props = {
  title: 'Worked Times',
  subtitle: 'These are your recent Worked Times',
  redirect: 'statistics/add-worked-time',
  action: 'Add worked time'
}

const FormWorkedTime: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  
  const { id } = useParams();

  const [workedTime, setWorkedTime] = useState({
    worked_days: 0
  })
  const [staffs, setStaffs] = useState([])

  const [selectedStaff, setSelectedStaff] = useState('')

  const getListStaff = async () => {
    const data = await StaffServices.index();
    setStaffs(data)
    if (data.length > 0 && !id) {
      setSelectedStaff(data[0].id)
    }
  }

  const getWorkedTime = async (id: string) => {
    try {
      const data = await WorkedTimeServices.show(id)
      setWorkedTime({ worked_days: data.worked_days });
      setSelectedStaff(data.staff.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getWorkedTime(id);
    }
    getListStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSelectedStaff = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedStaff(e.target.value)
  }

  const handleEvent = async (values: any) => {
    values.staff_id = selectedStaff;
    let res: any;
    try {
      if (id) {
        res = await WorkedTimeServices.update(values, id)
      } else {
        res = await WorkedTimeServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update Worked Time successfully' : 'Add Worked Time successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/statistics/worked-times')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Add Worked Time fail' : 'Update Worked Time fail',
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
        <title>Form Worked Time</title>
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
                    Worked Time
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage information related to worked time of staff building details
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
                <Formik
                  initialValues={workedTime}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <form onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                          <InputLabel>Select Staff</InputLabel>
                          { id ? 
                            <Select
                              value={selectedStaff}
                              onChange={handleSelectedStaff}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                              disabled
                              
                            >
                              {staffs.map((staff) => (
                                <MenuItem
                                  key={staff.id}
                                  value={staff.id}
                                >
                                  {staff.name}
                                </MenuItem>
                              ))}
                            </Select> : 
                            <Select
                              value={selectedStaff}
                              onChange={handleSelectedStaff}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                            >
                              {staffs.map((staff) => (
                                <MenuItem
                                  key={staff.id}
                                  value={staff.id}
                                >
                                  {staff.name}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                              fullWidth
                              id="worked_days"
                              name="worked_days"
                              label="Worked Days"
                              value={values.worked_days}
                              onChange={handleChange}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">days</InputAdornment>,
                              }}
                              error={touched.worked_days && Boolean(errors.worked_days)}
                              helperText={touched.worked_days && errors.worked_days}
                            />
                        </Grid>
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/statistics/worked-times')}>
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

export default FormWorkedTime;