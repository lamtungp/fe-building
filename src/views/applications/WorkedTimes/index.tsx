import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListWorkedTime from './ListWorkedTime';

const WorkedTimes: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Worked Times',
    subtitle: 'These are your recent Worked Times',
    redirect: 'statistics/add-worked-time',
    action: 'Add worked time'
  }

  return (
    <>
      <Helmet>
        <title>Worked Times</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader props={ props } />
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
            <ListWorkedTime />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default WorkedTimes;
