import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListFloor from './ListFloor';

const Floors: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Floors',
    subtitle: 'These are your recent floors',
    redirect: 'management/add-floor',
    action: 'Add floor'
  }

  return (
    <>
      <Helmet>
        <title>Floors</title>
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
            <ListFloor />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Floors;
