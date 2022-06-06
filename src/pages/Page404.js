import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="페이지 오류">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            페이지를 찾을 수 없습니다.
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            원하시는 결과를 찾을 수 없습니다. 올바른 URL을 입력하였는지 확인하세요. 자세한 내용은 사이트 소유자에게
            문의하시기 바랍니다.
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            HOME으로
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
