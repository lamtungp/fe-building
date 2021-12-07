import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListUsedService from './ListUsedService';

const Services: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Used Services',
    subtitle: 'These are your recent Used Services',
    redirect: 'statistics/add-used-service',
    action: 'Register service'
  }

  return (
    <>
      <Helmet>
        <title>Used Services</title>
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
            <ListUsedService />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Services;
