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
import SalaryServices from 'src/common/redux/salary/services';

const props = {
  title: 'Positions',
  subtitle: 'These are your recent positions of building',
  redirect: 'management/add-position',
  action: 'Add position'
}

const validationSchema = yup.object({
  position: yup
    .string()
    .required('Position is required'),
  salary: yup
    .number()
    .min(1)
    .required('Salary is required'),
})

const FormPosition: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const { id } = useParams();

  const salary_grade = [
    {
      id: 1,
      name: '1'
    },
    {
      id: 2,
      name: '2'
    },
    {
      id: 3,
      name: '3'
    }
  ]

  const [position, setPosition] = useState({
    position: '',
    salary: 0
  })

  const [selectedSalaryGrade, setSelectedSalaryGrade] = useState(3)

  const getPosition = async (id: string) => {
    try {
      const data = await SalaryServices.show(id)
      setPosition({ position: data.position, salary: data.salary });
      setSelectedSalaryGrade(data.salary_grade)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getPosition(id);
    }
  }, [])

  const handleSelectedSalaryGrade = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedSalaryGrade(Number(e.target.value))
  }

  const handleEvent = async (values: any) => {
    values.salary_grade = selectedSalaryGrade;
    let res: any;
    try {
      if (id) {
        res = await SalaryServices.update(values, id)
      } else {
        res = await SalaryServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update position successfully' : 'Register position successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/positions')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Register position fail' : 'Update position fail',
          icon: 'error'
        })
      }
    } catch (error) {
      MySwal.fire({
        text: 'System do not for add position now',
        icon: 'error'
      })
    }
  }

  return (
    <div>
      <Helmet>
        <title>Form Position</title>
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
                  initialValues={position}
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
                        {id ?
                          <TextField
                            margin={'normal'}
                            fullWidth
                            id="position"
                            name="position"
                            label="Position"
                            value={values.position}
                            onChange={handleChange}
                            disabled
                            error={touched.position && Boolean(errors.position)}
                            helperText={touched.position && errors.position}
                          /> :
                          <TextField
                            margin={'normal'}
                            fullWidth
                            id="position"
                            name="position"
                            label="Position"
                            value={values.position}
                            onChange={handleChange}
                            error={touched.position && Boolean(errors.position)}
                            helperText={touched.position && errors.position}
                          />
                        }
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          margin={'normal'}
                          fullWidth
                          id="salary"
                          name="salary"
                          label="Salary"
                          value={values.salary}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                          }}
                          error={touched.salary && Boolean(errors.salary)}
                          helperText={touched.salary && errors.salary}
                        />
                      </Grid>

                      <Grid item xs={6} marginTop={2}>
                        <FormControl fullWidth>
                          <InputLabel>Select Salary Grade</InputLabel>
                          {id ?
                            <Select
                              value={selectedSalaryGrade}
                              disabled
                              onChange={handleSelectedSalaryGrade}
                              input={<OutlinedInput label="Select Salary Grade" />}
                              MenuProps={MenuProps}
                            >
                              {salary_grade.map((e) => (
                                <MenuItem
                                  key={e.id}
                                  value={e.id}
                                >
                                  {e.name}
                                </MenuItem>
                              ))}
                            </Select> :
                            <Select
                              value={selectedSalaryGrade}
                              onChange={handleSelectedSalaryGrade}
                              input={<OutlinedInput label="Select Salary Grade" />}
                              MenuProps={MenuProps}
                            >
                              {salary_grade.map((e) => (
                                <MenuItem
                                  key={e.id}
                                  value={e.id}
                                >
                                  {e.name}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                        </FormControl>
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/positions')}>
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

export default FormPosition;