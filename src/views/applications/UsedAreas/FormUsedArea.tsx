import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { format } from 'date-fns';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CompanyServices from 'src/common/redux/company/services';
import UsedAreaServices from 'src/common/redux/used_area/services';
import FloorServices from 'src/common/redux/floor/services';
import { MenuProps } from 'src/common/constants/MenuProps';
import { LocalizationProvider, DateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const validationSchema = yup.object({  
  used_area: yup
    .number()
    .required('Used Area is required')
});

const FormUsedService: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const { id } = useParams();

  const [rentalTerm, setRentalTerm] = React.useState<any>([new Date(), new Date()]);
  const [usedArea, setUsedArea] = useState({
    used_area: 0
  })
  const [floors, setFloors] = useState([])
  const [companies, setCompanies] = useState([])

  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')

  const getListFloor = async () => {
    const data = await FloorServices.index();
    setFloors(data)
  }

  const getListCompany = async () => {
    const data = await CompanyServices.index();
    setCompanies(data)
  }

  const getUsedArea = async (id: string) => {
    try {
      const data = await UsedAreaServices.show(id)
      const arr = data.rental_term.split(" ");
      console.log(arr)
      console.log(new Date("01-12-2022"))
      setRentalTerm([new Date(arr[0]), new Date(arr[2])])
      setUsedArea({ used_area: data.used_area });
      setSelectedFloor(data.floor.id)
      setSelectedCompany(data.company.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getUsedArea(id);
    }
    getListFloor();
    getListCompany();
  }, [])

  const handleSelectedFloor = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedFloor(e.target.value)
  }

  const handleSelectedCompany = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCompany(e.target.value)
  }

  const handleEvent = async (values: any) => {
    values.company_id = selectedCompany;
    values.floor_id = selectedFloor; 
    values.rental_term = `${format(new Date(rentalTerm[0]), 'MM-dd-yyyy')} ~ ${format(new Date(rentalTerm[1]), 'MM-dd-yyyy')}`;
    console.log(values)
    let res: any;
    try {
      if (id) {
        res = await UsedAreaServices.update(values, id)
      } else {
        res = await UsedAreaServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update used area successfully' : 'Register used area successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/statistics/used-areas')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Register used area fail' : 'Update used area fail',
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
        <title>Form Used Area</title>
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
                    Used Area Details
                  </Typography>
                  <Typography variant="subtitle2">
                    Manage informations related to your used area details
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <CardContent sx={{ p: 4, mx: 6 }}>
                <Formik
                  initialValues={usedArea}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleChange, handleSubmit, errors, touched, values }) => (
                    <form>
                      <Grid container spacing={3} marginBottom={1}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                          <InputLabel>Select Company</InputLabel>
                          { id ? 
                            <Select
                              value={selectedCompany}
                              onChange={handleSelectedCompany}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                              disabled
                            >
                              {companies.map((company) => (
                                <MenuItem
                                  key={company.id}
                                  value={company.id}
                                >
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select> : 
                            <Select
                              value={selectedCompany}
                              onChange={handleSelectedCompany}
                              input={<OutlinedInput label="Select Company" />}
                              MenuProps={MenuProps}
                            >
                              {companies.map((company) => (
                                <MenuItem
                                  key={company.id}
                                  value={company.id}
                                >
                                  {company.name}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>Select Floor</InputLabel>
                            <Select
                              value={selectedFloor}
                              onChange={handleSelectedFloor}
                              input={<OutlinedInput label="Select Floor" />}
                              MenuProps={MenuProps}
                            >
                              {floors.map((floor) => (
                                <MenuItem
                                  key={floor.id}
                                  value={floor.id}
                                >
                                  {floor.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                            margin={'normal'}
                            fullWidth
                            id="used_area"
                            name="used_area"
                            label="Used Area"
                            value={values.used_area}
                            onChange={handleChange}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
                            }}
                            error={touched.used_area && Boolean(errors.used_area)}
                            helperText={touched.used_area && errors.used_area}
                          />
                      </Grid> 

                      <Grid item xs={12} marginTop={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateRangePicker
                            startText="Start"
                            endText="End"
                            value={rentalTerm}
                            onChange={(newValue) => {
                              setRentalTerm(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                              <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                              </React.Fragment>
                            )}
                          />
                        </LocalizationProvider>
                      </Grid> 

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/statistics/used-areas')}>
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

export default FormUsedService;