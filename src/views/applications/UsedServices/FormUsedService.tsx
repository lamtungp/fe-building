import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button, Grid, Container, Box, Card, CardContent, Divider, Typography, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/components/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from 'src/components/Footer';
import SvServices from 'src/common/redux/service/services';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UsedSvServices from 'src/common/redux/used_service/services';
import CompanyServices from 'src/common/redux/company/services';
import { ServiceEnums } from 'src/common/enums';
import { MenuProps } from 'src/common/constants/MenuProps';

const props = {
  title: 'Used Services',
  subtitle: 'These are your recent Used Services',
  redirect: 'statistics/add-used-service',
  action: 'Register service'
}

const FormUsedService: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  
  const { id } = useParams();

  const [usedService, setUsedService] = useState({
    company: '',
    service: ''
  })
  const [services, setServices] = useState([])
  const [companies, setCompanies] = useState([])

  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedService, setSelectedService] = useState('')

  const getListService = async () => {
    const data = await SvServices.index();
    setServices(data)
    if (data.length > 0 && !id) {
      setSelectedService(data[0].id)
    }
  }

  const getListCompany = async () => {
    const data = await CompanyServices.index();
    setCompanies(data)
    if (data.length > 0 && !id) {
      setSelectedCompany(data[0].id)
    }
  }

  const getUsedService = async (id: string) => {
    try {
      const data = await UsedSvServices.show(id)
      setUsedService({ company: data.company.name, service: data.service.name });
      console.log(usedService)
      setSelectedService(data.service.id)
      setSelectedCompany(data.company.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (id) {
      getUsedService(id);
    }
    getListService();
    getListCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSelectedService = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedService(e.target.value)
  }

  const handleSelectedCompany = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCompany(e.target.value)
  }

  const handleEvent = async (values: any) => {
    values.company_id = selectedCompany;
    values.service_id = selectedService; 
    let res: any;
    try {
      if (id) {
        res = await UsedSvServices.update(values, id)
      } else {
        res = await UsedSvServices.create(values)
      }
      if (res) {
        MySwal.fire({
          text: id ? 'Update service successfully' : 'Register service successfully',
          icon: 'success',
        }).then(async (result) => {
          if (result.isConfirmed) {
            navigate('/statistics/used-services')
          }
        })
      } else {
        MySwal.fire({
          text: id ? 'Register service fail' : 'Update service fail',
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
        <title>Form Used Service</title>
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
                  initialValues={{ company_id: '', service_id: '' }}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleEvent(values);
                  }}
                  validateOnChange={true}
                >
                  {({ handleSubmit }) => (
                    <form onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}>
                      <Grid container spacing={3}>
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
                            <InputLabel>Select Service</InputLabel>
                            { usedService.service === ServiceEnums.CLEANING || usedService.service === ServiceEnums.SECURITY ? 
                              <Select
                                value={selectedService}
                                onChange={handleSelectedService}
                                input={<OutlinedInput label="Select Service" />}
                                MenuProps={MenuProps}
                                disabled
                              >
                                {services.map((service) => (
                                  <MenuItem
                                    key={service.id}
                                    value={service.id}
                                  >
                                    {service.name}
                                  </MenuItem>
                                ))}
                              </Select> :
                              <Select
                                value={selectedService}
                                onChange={handleSelectedService}
                                input={<OutlinedInput label="Select Service" />}
                                MenuProps={MenuProps}
                              >
                                {services.map((service) => (
                                  <MenuItem
                                    key={service.id}
                                    value={service.id}
                                  >
                                    {service.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Box textAlign='center' marginTop={2} sx={{ '& > button': { m: 1 } }}>
                        <Button color="primary" variant="outlined" onClick={() => navigate('/statistics/used-services')}>
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