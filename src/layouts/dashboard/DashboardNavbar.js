import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';
//
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function DashboardNavbar({ onOpenSidebar }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changePage = () => {
    navigate('/home/purchase-management', { replace: true });
  };
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="발주관리"
            onClick={() => {
              navigate('/home/purchase-management', { replace: true });
            }}
            count={0}
          />
          <Tab
            label="상품관리"
            onClick={() => {
              navigate('/home/product-management', { replace: true });
            }}
            count={1}
          />
          <Tab
            label="거래처 상품관리"
            onClick={() => {
              navigate('/home/client-product-management', { replace: true });
            }}
            count={2}
          />
        </Tabs>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
