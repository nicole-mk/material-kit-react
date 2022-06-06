import * as React from 'react';
import { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Toolbar,
  Button,
  Badge,
  AppBar,
  Stack,
  Container,
  TableContainer,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

export default function PurchaseOrder() {
  // console.warn = console.error = () => {};

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

  // 발주 취소
  const handleCancel = () => {
    alert('발주가 취소되었습니다.');
  };

  const handleComplete = () => {
    alert('발주가 완료되었습니다.');
  };

  const Spacer = () => <Box m={1}>&nbsp;</Box>;

  return (
    <Page title="발주서">
      <Container>
        <Card style={{ padding: 20 }}>
          <Scrollbar>
            <Typography variant="h3" align="center" gutterBottom>
              발주서
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  발주처(식당)
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    믿음직화
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  발주일
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    2022-05-03 23:12:33
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Spacer />
            <Typography variant="h6" gutterBottom>
              발주상품 정보
            </Typography>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>원산지</TableCell>
                    <TableCell>보관</TableCell>
                    <TableCell>상품명[요청사항]</TableCell>
                    <TableCell>중량/주문단위</TableCell>
                    <TableCell>수량</TableCell>
                    <TableCell>단가</TableCell>
                    <TableCell>총금액</TableCell>
                    <TableCell>바코드</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow key={item.product_id}> */}
                  <TableRow>
                    <TableCell>
                      {/* <Link to={`/products/${item.product_id}`}> */}
                      {/*  {productsById[item.product_id].reference} */}
                      {/* </Link> */}국내산
                    </TableCell>
                    <TableCell>
                      상온
                      {/* {productsById[item.product_id].price.toLocaleString( */}
                      {/*  undefined, */}
                      {/*  { */}
                      {/*    style: "currency", */}
                      {/*    currency: "USD", */}
                      {/*  } */}
                      {/* )} */}
                    </TableCell>
                    <TableCell>갈치[수입]</TableCell>
                    <TableCell>
                      4kg/1박스
                      {/* {( */}
                      {/*  productsById[item.product_id].price * item.quantity */}
                      {/* ).toLocaleString(undefined, { */}
                      {/*  style: "currency", */}
                      {/*  currency: "USD", */}
                      {/* })} */}
                    </TableCell>
                    <TableCell>1개</TableCell>
                    <TableCell>15,900</TableCell>
                    <TableCell>200,000</TableCell>
                    <TableCell>220000163</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
            <Spacer />

            <Typography variant="h6" gutterBottom>
              결제정보
            </Typography>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table sx={{ minWidth: '35em' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>결제일</TableCell>
                    <TableCell>결제수단</TableCell>
                    <TableCell>배송비</TableCell>
                    <TableCell>총금액</TableCell>
                    <TableCell>외상가능금액</TableCell>
                    <TableCell>입금확인</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>2022-05-03 23:12:33</TableCell>
                    <TableCell>계좌이체</TableCell>
                    <TableCell>무료배송</TableCell>
                    <TableCell>234,000원</TableCell>
                    <TableCell>2,766,000원</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        size="small"
                        variant="outlined"
                        startIcon={<CheckIcon />}
                        onClick={handleSave}
                      >
                        입금확인
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Spacer />
            <Typography variant="h6" gutterBottom>
              배송 정보
            </Typography>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>주소</TableCell>
                    <TableCell>연락처</TableCell>
                    <TableCell>받는분</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow key={item.product_id}> */}
                  <TableRow>
                    <TableCell>
                      {/* <Link to={`/products/${item.product_id}`}> */}
                      {/*  {productsById[item.product_id].reference} */}
                      {/* </Link> */}(123432) 서울시 영등포구 여의도동 여의로 123 4층 믿음직화
                    </TableCell>
                    <TableCell>
                      010-2223-2263
                      {/* {productsById[item.product_id].price.toLocaleString( */}
                      {/*  undefined, */}
                      {/*  { */}
                      {/*    style: "currency", */}
                      {/*    currency: "USD", */}
                      {/*  } */}
                      {/* )} */}
                    </TableCell>
                    <TableCell>홍길동</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding={8}>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                발주취소
              </Button>
              <Button variant="outlined" color="success" onClick={handleComplete}>
                발주완료
              </Button>
            </Stack>
            <Toolbar />
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
