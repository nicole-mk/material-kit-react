import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, MenuItem, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

export default function ProductInput() {
  // console.warn = console.error = () => {};

  const navigate = useNavigate();

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

  // 입금 확인
  const handleSave = () => {
    alert('입금이 확인되었습니다.');
  };

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [currency, setCurrency] = useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleProduct = () => {
    alert('상품이 등록/수정되었습니다');
    navigate('/home/product-management', {
      replace: true,
    });
  };

  return (
    <Page title="입력/수정">
      <Container>
        <Card style={{ padding: 20 }}>
          <Scrollbar>
            <Typography variant="h3" align="center" gutterBottom>
              상품 등록 / 수정
            </Typography>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                대카테고리
              </Typography>
              <TextField
                required
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="대카테고리를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                중카테고리
              </Typography>
              <TextField
                required
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="중카테고리를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                상품명&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField required id="filled-required" helperText="상품명을 입력하세요" />
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                진열여부&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="진열여부를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                삭제여부&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="삭제여부를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                단위당가격
              </Typography>
              <TextField required id="filled-required" helperText="단위 금액을 입력하세요" />
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="단위를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField required id="filled-required" helperText="단위당 가격을 입력하세요" />
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                원산지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="원산지를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                중량/용량&nbsp;&nbsp;
              </Typography>
              <TextField required id="filled-required" helperText="단위금액을 입력하세요" />
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="단위를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                보관법&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="보관법을 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={2}>
              <Typography variant="h6" align="center" gutterBottom>
                주문단위&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField
                id="filled-select-currency"
                select
                value={currency}
                onChange={handleChange}
                helperText="주문단위를 선택하세요"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={12} alignItems="center" justifyContent="flex-start" paddingBottom={8}>
              <Typography variant="h6" align="center" gutterBottom>
                상품명&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <TextField required id="filled-required" helperText="바코드를 입력하세요" />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Button variant="contained" color="success" onClick={handleProduct}>
                등록하기
              </Button>
            </Stack>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
