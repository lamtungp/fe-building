import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListPosition from './ListPosition';

const Positions: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Positions',
    subtitle: 'These are your recent positions of building',
    redirect: 'management/add-position',
    action: 'Add position'
  }

  return (
    <>
      <Helmet>
        <title>Positions</title>
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
            <ListPosition />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Positions;
