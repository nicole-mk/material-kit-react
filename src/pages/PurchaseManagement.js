// 발주관리 - 대기중
import * as React from 'react';
import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import krLocale from 'date-fns/locale/ko';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';

const TABLE_HEAD = [
  { id: 'payment_date', label: '번호', alignRight: false },
  { id: 'store_name', label: '결제일', alignRight: false },
  { id: 'total_price', label: '거래처명', alignRight: false },
  { id: 'store_nm', label: '결제금액', alignRight: false },
  { id: 'reg_date', label: '처리상태', alignRight: false },
  { id: 'status', label: '입금상태', alignRight: false },
];

function applySortFilter(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const localeMap = {
  ko: krLocale,
};

export default function PurchaseManagement() {
  // / ////////////////////////////////////////////////////////
  // State ------------------------------------------------
  const [value, setValue] = useState(0);
  const [searchDate, setSearchDate] = useState('');
  const [locale, setLocale] = useState('ko');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const navigate = useNavigate();

  // const filteredUsers = applySortFilter(userPendingList);

  // Function ---------------------------------------------
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 발주서 이동
  // 원본
  /* const handleClick = (event, idx, store_name, payment_date) => {
    fetch('/api/typist/typist-worker-regist', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ocr_idx: idx,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          fetch(`/api/typist/ocr-detail-data?ocr_idx=${idx}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                sessionStorage.setItem('idx_ocr', idx);
                navigate('/home/ocr', {
                  replace: true,
                  state: {
                    idx: idx,
                    store_name: store_name,
                    payment_date: payment_date,
                    item: response.data.item,
                    impossibility_reason: response.data.impossibility_reason,
                  },
                });
              } else {
                return false;
              }
            });
        } else {
          alert(response.msg);
          return false;
        }
      });
  }; */
  const handleClick = (event) => {
    navigate('/home/purchase-order', {
      replace: true,
    });
  };

  // 검색
  const handleSearch = () => {
    /*
    const sc_date = moment(searchDate).isValid() ? moment(searchDate).format('YYYY-MM-DD') : '';
    const sc_word = searchWord.trim();
    fetch(`/api/typist/home-waiting-list?sc_date=${sc_date}&sc_word=${encodeURIComponent(sc_word)}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        const userPendingData = [...Array(res.data.length)].map((_, index) => ({
          idx: res.data[index].idx,
          payment_date: res.data[index].payment_date,
          reg_date: res.data[index].reg_date,
          store_name: res.data[index].store_name,
          store_nm: res.data[index].store_nm,
          total_price: res.data[index].total_price,
          status: '대기중',
        }));
        setTotalCount(parseInt(res.total));
        setUserPendingList(userPendingData);
      }); */
  };

  // 페이지 뒤로가기 탐지
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

  // 테이블 페이지 관련
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // Table Pagination
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Box>
    );
  }

  // / ////////////////////////////////////////////////////////
  return (
    <Page title="발주관리">
      <Container>
        <Card>
          <Scrollbar>
            <Stack
              sx={{ minWidth: 650 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={3}
              mb={3}
              mt={2}
            >
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="대기중" {...a11yProps(0)} />
                  <Tab label="배송완료" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                  <div>
                    <DesktopDatePicker
                      value={searchDate}
                      onChange={(newValue) => setSearchDate(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
              >
                <TextField
                  id="outlined-search"
                  label="검색어를 입력해주세요"
                  type="search"
                  // onChange={(event) => {
                  //   setSearchWord(event.target.value);
                  // }}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') {
                  //     handleSearch();
                  //   }
                  // }}
                />
              </Box>
              <Box sx={{ width: 1 / 2 }}>
                <Button variant="contained" onClick={handleSearch} startIcon={<Iconify icon="eva:search-fill" />}>
                  검색
                </Button>
              </Box>
            </Stack>
            <TabPanel value={value} index={0}>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD.map((headCell) => (
                        <TableCell
                          style={{ width: 160 }}
                          key={headCell.id}
                          align={headCell.alignRight ? 'right' : 'center'}
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {filteredUsers.map((row) => { */}
                    {/*  const isItemSelected = isSelected(row.idx); */}
                    {/*  const { payment_date, store_name, total_price, store_nm, reg_date, status } = row; */}

                    {/*  return ( */}
                    <TableRow
                      hover
                      // 원본: onClick={(event) => {
                      //   handleClick(event, row.idx, row.store_name, row.payment_date);
                      // }}
                      onClick={(event) => {
                        handleClick(event);
                      }}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={row.idx}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell align="center">{payment_date ? payment_date : '-'}</TableCell> */}
                      <TableCell align="center">{255}</TableCell>

                      {/* <TableCell align="center">{store_name ? store_name : '-'}</TableCell> */}
                      <TableCell align="center">{'2022-06-02-12:06:20'}</TableCell>

                      {/* <TableCell align="center"> */}
                      {/*  {total_price ? total_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '-'} */}
                      {/* </TableCell> */}
                      <TableCell align="center">{'청담동 오로라 상회'}</TableCell>

                      {/* <TableCell align="center">{store_nm ? store_nm : '-'}</TableCell> */}
                      <TableCell align="center">{'200,000원'}</TableCell>

                      {/* <TableCell align="center">{reg_date ? reg_date : '-'}</TableCell> */}
                      <TableCell align="center">{'배송대기'}</TableCell>

                      {/* <TableCell align="center"> */}
                      {/*  <Label variant="ghost" color={(status === '대기중' && 'primary') || 'warning'}> */}
                      {/*    {status} */}
                      {/*  </Label> */}
                      {/* </TableCell> */}
                      <TableCell align="center">
                        <Label variant="ghost" color={'warning'}>
                          {'입금대기'}
                        </Label>
                      </TableCell>
                    </TableRow>
                    {/*  ); */}
                    {/* })} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50, 60, 80, 100]}
                        // count={totalCount}
                        count={1}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={'페이지 당 표시할 리스트 수'}
                        page={page}
                        labelDisplayedRows={({ from, to, count }) => `${from} - ${to} 개 / 총 ${count}개`}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        // ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD.map((headCell) => (
                        <TableCell
                          style={{ width: 160 }}
                          key={headCell.id}
                          align={headCell.alignRight ? 'right' : 'center'}
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {filteredUsers.map((row) => { */}
                    {/*  const isItemSelected = isSelected(row.idx); */}
                    {/*  const { */}
                    {/*    payment_date, */}
                    {/*    reg_date, */}
                    {/*    store_name, */}
                    {/*    store_nm, */}
                    {/*    total_price, */}
                    {/*    user_name, */}
                    {/*    work_start_date, */}
                    {/*    status, */}
                    {/*  } = row; */}
                    {/* return ( */}
                    <TableRow
                      hover
                      onClick={(event) => {
                        handleClick(event);
                      }}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={row.idx}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell align="center">{payment_date || '-'}</TableCell> */}
                      <TableCell align="center">{1}</TableCell>

                      {/* <TableCell align="center">{store_name || '-'}</TableCell> */}
                      <TableCell align="center">{'2022-06-03 14:40:15'}</TableCell>

                      {/* <TableCell align="center"> */}
                      {/*  {total_price ? total_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : '-'} */}
                      {/* </TableCell> */}
                      <TableCell align="center">{'청담동 오로라 상회'}</TableCell>

                      {/* <TableCell align="center">{store_nm || '-'}</TableCell> */}
                      <TableCell align="center">{'200,000원'}</TableCell>

                      {/* <TableCell align="center">{reg_date || '-'}</TableCell> */}
                      <TableCell align="center">{'배송대기'}</TableCell>

                      {/* <TableCell align="center">{work_start_date || '-'}</TableCell> */}
                      <TableCell align="center">{'입금완료'}</TableCell>
                    </TableRow>
                    {/* );  })} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50, 60, 80, 100]}
                        // count={totalCount}
                        count={1}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={'페이지 당 표시할 리스트 수'}
                        page={page}
                        labelDisplayedRows={({ from, to, count }) => `${from} - ${to} 개 / 총 ${count}개`}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        // ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </TabPanel>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
