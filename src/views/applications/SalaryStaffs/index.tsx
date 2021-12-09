import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListSalaryStaff from './ListSalaryStaff';

const WorkedTimes: React.FunctionComponent = (): React.ReactElement => {

  return (
    <>
      <Helmet>
        <title>Worked Times</title>
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
            <ListSalaryStaff />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default WorkedTimes;
