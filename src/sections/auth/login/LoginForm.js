import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Stack, TextField, IconButton, InputAdornment, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Iconify from '../../../components/Iconify';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const LoginSchema = Yup.object().shape({
    user_id: Yup.string().required('아이디를 입력하세요'),
    user_pass: Yup.string().required('비밀번호를 입력하세요'),
  });

  const formik = useFormik({
    initialValues: {
      user_id: '',
      user_pass: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      sessionStorage.setItem('authority', 'admin');
      navigate('/', { replace: true });

      /* fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: values.user_id,
          user_pass: values.user_pass,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            sessionStorage.setItem("authority", response.data.authority);
            sessionStorage.setItem("idx", response.data.idx);
            sessionStorage.setItem("user_id", response.data.user_id);
            sessionStorage.setItem("user_name", response.data.user_name);
            navigate("/", { replace: true });
          }
        })
        .catch(() => {
          alert("아이디/패스워드 정보가 정확하지 않습니다. 다시 입력해주세요.");
          setErrorMessage(
            "아이디/패스워드 정보가 정확하지 않습니다. 다시 입력해주세요."
          );
          return false;
        }); */
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="text"
            label="아이디"
            {...getFieldProps('user_id')}
            error={Boolean(touched.user_id && errors.user_id)}
            helperText={touched.user_id && errors.user_id}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            {...getFieldProps('user_pass')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.user_pass && errors.user_pass)}
            helperText={touched.user_pass && errors.user_pass}
          />
        </Stack>
        <Stack sx={{ my: 2 }} />

        <LoadingButton color="warning" fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          로그인
        </LoadingButton>
        <Grid container mt={2}>
          <Grid item xs>
            <Link href="/find-id" variant="body2">
              아이디 찾기
            </Link>
          </Grid>
          <Grid item>
            <Link href="/find-pass" variant="body2">
              비밀번호 찾기
            </Link>
          </Grid>
        </Grid>
      </Form>
      {errorMessage && (
        <p className="error" align="center" style={{ color: 'red' }}>
          {errorMessage}
        </p>
      )}
    </FormikProvider>
  );
}
