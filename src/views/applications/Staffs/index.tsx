import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListStaff from './ListStaff';

const Staffs: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Staff Building',
    subtitle: 'These are recent staff of building',
    redirect: 'management/add-staff',
    action: 'Add staff'
  }

  return (
    <>
      <Helmet>
        <title>Staff Building</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader props={props}/>
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
            <ListStaff />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Staffs;
