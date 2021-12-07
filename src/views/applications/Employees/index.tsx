import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListEmployee from './ListEmployee';

const Employees: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Employees',
    subtitle: "These are building's employees recent",
    redirect: 'management/add-employee',
    action: 'Add employee'
  }

  return (
    <>
      <Helmet>
        <title>Employees</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader props={props} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ListEmployee />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Employees;
