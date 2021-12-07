import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListCompany from './ListCompany';

const Companies: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Companies',
    subtitle: "These are building's companies recent",
    redirect: 'management/add-company',
    action: 'Add company'
  }

  return (
    <>
      <Helmet>
        <title>Companies</title>
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
            <ListCompany />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Companies;
