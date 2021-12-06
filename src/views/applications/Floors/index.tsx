import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListUsedService from './ListFloor';

const Services: React.FunctionComponent = (): React.ReactElement =>{
  return (
    <>
      <Helmet>
        <title>Floors</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
