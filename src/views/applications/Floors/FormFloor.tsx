import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container, Box, Card, CardContent, Divider, Typography, InputAdornment, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FloorServices from 'src/common/redux/floor/services';

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

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  floor_area: yup
    .number()
    .required('Floor Area is required'),
  unit_price: yup
    .number()
    .required('Unit Price is required'),
})

const FormUsedService: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  
  const { id } = useParams();

  const [floor, setFloor] = useState({
    name: '',
    floor_area: 0,
    unit_price: 0
  })

  const statusOptions = [
    {
      id: 'available',
      name: 'Available'
    },
    {
      id: 'unavailable',
      name: 'Unavailable'
    },
  ]

  const [selectedStatus, setSelectedStatus] = useState('')

  const getFloor = async (id: string) => {
    try {
      const data = await FloorServices.show(id)
      setFloor(data);
      setSelectedStatus(data.status)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getFloor(id);
    }
  }, [id])

  const handleSelectedStatus = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedStatus(e.target.value)
  }

  const handleEvent = async (values: any) => {
    values.status = selectedStatus; 
    let res: any;
    try {
      if (id) {
        res = await FloorServices.update(values, id)
      } else {
        res = await FloorServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update floor successfully' : 'Add floor successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/management/floors')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Add floor fail' : 'Update floor fail',
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
        <title>Form Floor</title>
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
                  initialValues={floor}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleSubmit, handleChange, errors, touched, values }) => (
                    <form>
                      <Grid item xs={12}>
                        <TextField
                            margin={'normal'}
                            fullWidth
                            id="name"
                            name="name"
                            label="Name Floor"
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
                          id="floor_area"
                          name="floor_area"
                          label="Floor Area"
                          value={values.floor_area}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
                          }}
                          error={touched.floor_area && Boolean(errors.floor_area)}
                          helperText={touched.floor_area && errors.floor_area}
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

                      <Grid item xs={6}>
                          <FormControl margin='normal' fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={selectedStatus}
                              onChange={handleSelectedStatus}
                              input={<OutlinedInput label="Status" />}
                              MenuProps={MenuProps}
                            >
                              {statusOptions.map((status) => (
                                <MenuItem
                                  key={status.id}
                                  value={status.id}
                                >
                                  {status.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/management/floors')}>
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