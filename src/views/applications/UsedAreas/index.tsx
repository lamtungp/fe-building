import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import ListUsedArea from './ListUsedArea';
import PageHeader from 'src/components/PageHeader';

const UsedAreas: React.FunctionComponent = (): React.ReactElement => {
  const props = {
    title: 'Used Area',
    subtitle: 'These are your recent Used Areas',
    redirect: 'statistics/add-used-area',
    action: 'Add Used Area'
  }
  return (
    <>
      <Helmet>
        <title>Used Areas</title>
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
            <ListUsedArea />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UsedAreas;
