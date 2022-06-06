import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  TableFooter,
  Box,
  TableHead,
  Input,
  Modal,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import krLocale from 'date-fns/locale/ko';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TABLE_HEAD = [
  { id: 'payment_date', label: '상품번호', alignRight: false },
  { id: 'store_name', label: '대카테고리명', alignRight: false },
  { id: 'total_price', label: '중카테고리명', alignRight: false },
  { id: 'store_nm', label: '원산지', alignRight: false },
  { id: 'reg_date', label: '상품명', alignRight: false },
  { id: 'work_start_date', label: '중량', alignRight: false },
  { id: 'work_end_date', label: '단위당 판매가', alignRight: false },
  { id: 'work_runtime', label: '판매가', alignRight: false },
  { id: 'user_name', label: '진열상태', alignRight: false },
  { id: 'update_date', label: '가격 업데이트일', alignRight: false },
];

function applySortFilter(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const localeMap = {
  ko: krLocale,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProductManagement() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [locale, setLocale] = useState('ko');
  const [userCompletionList, setUserCompletionList] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [selected, setSelected] = useState([]);
  // const [totalCount, setTotalCount] = useState(parseInt(totalDataCount.props, 10));

  const [option, setOption] = React.useState('EUR');

  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleTap = (event, newValue) => {
    setValue(newValue);
  };

  const filteredUsers = applySortFilter(userCompletionList);

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

  /* useEffect(() => {
    fetch(
      `/api/typist/home-complete-list?pagesize=${rowsPerPage}&page=${page + 1}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        if (response.status) {
          const userCompletionData = [...Array(response.data.length)].map(
            (_, index) => ({
              idx: response.data[index].idx,
              payment_date: response.data[index].payment_date,
              store_name: response.data[index].store_name,
              total_price: response.data[index].total_price,
              store_nm: response.data[index].store_nm,
              reg_date: response.data[index].reg_date,
              work_start_date: response.data[index].work_start_date,
              work_end_date: response.data[index].work_end_date,
              work_runtime: response.data[index].work_runtime,
              user_name: response.data[index].user_name,
            })
          );
          setTotalCount(parseInt(response.total));
          setUserCompletionList(userCompletionData);
        }
      });
  }, [page, rowsPerPage]); */

  /* const handleSearch = () => {
    const scDate = moment(searchDate).isValid() ? moment(searchDate).format('YYYY-MM-DD') : '';
    const scWord = searchWord.trim();
    fetch(`/api/typist/home-complete-list?sc_date=${scDate}&sc_word=${encodeURIComponent(scWord)}`, {
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
      .then((response) => {
        if (response.status) {
          const userCompletionData = [...Array(response.data.length)].map((_, index) => ({
            idx: response.data[index].idx,
            payment_date: response.data[index].payment_date,
            store_name: response.data[index].store_name,
            total_price: response.data[index].total_price,
            store_nm: response.data[index].store_nm,
            reg_date: response.data[index].reg_date,
            work_start_date: response.data[index].work_start_date,
            work_end_date: response.data[index].work_end_date,
            work_runtime: response.data[index].work_runtime,
            user_name: response.data[index].user_name,
          }));
          setTotalCount(parseInt(response.total, 10));
          setUserCompletionList(userCompletionData);
        }
      });
  }; */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    alert('업로드 하시겠습니까?');
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClick = (event) => {
    navigate('/home/product-list', {
      replace: true,
    });
  };

  /* const handleClick = (event, idx, storeName, paymentDate) => {
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
              idx,
              storeName,
              paymentDate,
              item: response.data.item,
              impossibility_reason: response.data.impossibility_reason,
            },
          });
        } else {
          return false;
        }
      });
  };*/

  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const firstOption = ['채소', '과일', '육류'];
  const secondOption = ['부추', '사과', '항정살'];

  const handleRegister = () => {
    navigate('/home/product-list', { replace: true });
  };

  const onDownload = () => {
    const link = document.createElement('a');
    link.download = `product.txt`;
    link.href = '../product.txt';
    link.click();
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }

  return (
    <Page title="상품관리">
      <Container>
        <Card>
          <Scrollbar>
            <Stack sx={{ minWidth: 650 }} direction="row" alignItems="center" justifyContent="flex-start" mb={3}>
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Tabs
                  value={value}
                  onChange={handleTap}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="진열" {...a11yProps(0)} />
                  <Tab label="미진열" {...a11yProps(1)} />
                  <Tab label="삭제" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>대카테고리</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>대카테고리</em>
                    </MenuItem>
                    {firstOption.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>중카테고리</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>중카테고리</em>
                    </MenuItem>
                    {secondOption.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                  <div>
                    <DatePicker
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
              >
                <TextField
                  id="outlined-search"
                  label="검색어를 입력해주세요"
                  type="search"
                  onChange={(event) => {
                    setSearchWord(event.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // handleSearch();
                    }
                  }}
                />
              </Box>
              <Box>
                {/* <Button variant="contained" style={{ marginRight: '30px' }} onClick={handleSearch}> */}
                <Button variant="contained" style={{ marginRight: '30px' }}>
                  검색
                </Button>
              </Box>
            </Stack>

            <Stack
              Stack
              sx={{ minWidth: 1200 }}
              direction="row"
              alignItems="baseline"
              justifyContent="flex-end"
              spacing={2}
              mb={4}
            >
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Button onClick={handleRegister} variant="contained">
                  상품등록
                </Button>
              </Box>
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Button onClick={handleOpen} variant="contained">
                  상품 엑셀 일괄 등록
                </Button>
              </Box>
              <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                <Button onClick={onDownload} variant="contained">
                  상품 샘플파일 다운로드
                </Button>
              </Box>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    상품 일괄 등록
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} color="error" mb={4}>
                    상품 샘플파일을 다운로드 하신 후 가이드에 맞게 엑셀 파일을 작성해 주세요. 타입에 맞지 않거나,
                    허용되지 않은 문자가 있으면 업로드가 되지 않습니다.
                  </Typography>
                  <Stack direction="row">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button variant="contained" component="span" onclick={handleUpload}>
                        파일첨부
                      </Button>
                    </label>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3}>
                    <Button onClick={handleClose}>등록</Button>
                    <Button onClick={handleClose}>취소</Button>
                  </Stack>
                </Box>
              </Modal>
            </Stack>

            <TabPanel value={value} index={0}>
              <TableContainer sx={{ minWidth: 1200 }}>
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
                    {/*  const isItemSelected = isSelected(row.idx);*/}
                    {/*  const {*/}
                    {/*    paymentDate,*/}
                    {/*    storeName,*/}
                    {/*    totalPrice,*/}
                    {/*    storeNm,*/}
                    {/*    regDate,*/}
                    {/*    workStartDate,*/}
                    {/*    workEndDate,*/}
                    {/*    workRuntime,*/}
                    {/*    userName,*/}
                    {/*  } = row;*/}
                    {/* return ( */}
                    <TableRow
                      hover
                      // onClick={(event) => {
                      //   handleClick(event, row.idx, row.storeName, row.paymentDate);
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
                      <TableCell style={{ width: 160 }} align="center">
                        {'1003'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'축산물'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'소고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'국내산'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'안심 스테이크용 소고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'5kg'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'100g/900원'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'90,000원'}
                      </TableCell>
                      <TableCell align="center">{'진열중'}</TableCell>
                      <TableCell align="center">{'2022-06-06 02:05:04'}</TableCell>
                    </TableRow>
                    {/* ); })} */}
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
              <TableContainer sx={{ minWidth: 1200 }}>
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
                    {/*  const isItemSelected = isSelected(row.idx);*/}
                    {/*  const {*/}
                    {/*    payment_date,*/}
                    {/*    store_name,*/}
                    {/*    total_price,*/}
                    {/*    store_nm,*/}
                    {/*    reg_date,*/}
                    {/*    work_start_date,*/}
                    {/*    work_end_date,*/}
                    {/*    work_runtime,*/}
                    {/*    user_name,*/}
                    {/*  } = row;*/}
                    {/*  return (*/}
                    <TableRow
                      hover
                      // onClick={(event) => {
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
                      <TableCell style={{ width: 160 }} align="center">
                        {1002}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'농산물'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'닭고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'아르헨티나'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'닭강정용 뼈없는 닭고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'1kg'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'100g/500원'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'50,000원'}
                      </TableCell>
                      <TableCell align="center">{'미진열'}</TableCell>
                      <TableCell align="center">{'2021-09-09 11:22:33'}</TableCell>
                    </TableRow>
                    {/* ); })} */}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50, 60, 80, 100]}
                        count={1}
                        // count={totalCount}
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
            <TabPanel value={value} index={2}>
              <TableContainer sx={{ minWidth: 1200 }}>
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
                    {/*  const isItemSelected = isSelected(row.idx);*/}
                    {/*  const {*/}
                    {/*    payment_date,*/}
                    {/*    store_name,*/}
                    {/*    total_price,*/}
                    {/*    store_nm,*/}
                    {/*    reg_date,*/}
                    {/*    work_start_date,*/}
                    {/*    work_end_date,*/}
                    {/*    work_runtime,*/}
                    {/*    user_name,*/}
                    {/*  } = row;*/}
                    {/*  return (*/}
                    <TableRow
                      hover
                      // onClick={(event) => {
                      //   handleClick(event, row.idx, row.store_name, row.payment_date);
                      // }}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      onClick={(event) => {
                        handleClick(event);
                      }}
                      // key={row.idx}
                      // selected={isItemSelected}
                    >
                      <TableCell style={{ width: 160 }} align="center">
                        {1001}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'축산물'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'돼지고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'호주'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'안심 스테이크용 소고기'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'10kg'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'100g/9000원'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'90,000원'}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {'삭제됨'}
                      </TableCell>
                      <TableCell align="center">{'2022-01-03 10:30:45'}</TableCell>
                    </TableRow>
                    {/* ); })} */}
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
