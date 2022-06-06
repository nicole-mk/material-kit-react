import * as React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, Paper, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Page from '../components/Page';

export default function ChangePassword() {
  // console.warn = console.error = () => {};
  const location = useLocation();

  // 뒤로가기 탐지
  useEffect(() => {
    const preventGoBack = () => {
      // eslint-disable-next-line no-restricted-globals
      history.go(-1);
    };
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Page title="상품관리 | 상품등록&수정">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 변경
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="현재 비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Divider />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="새 비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="새 비밀번호 확인"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              확인
            </Button>
            <Button type="submit" fullWidth variant="outlined" color="error" sx={{ mt: 3, mb: 2 }}>
              취소
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
