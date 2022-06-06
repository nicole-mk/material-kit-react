import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import account from '../../components/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: '비밀번호 변경',
    icon: 'eva:settings-2-fill',
    linkTo: '/home/reset-pass',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [signOut, setSignOut] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const handleSignOutClose = () => {
    setSignOut(false);
  };
  const handleSignOutOpen = () => {
    setSignOut(true);
  };

  // 권한
  const UserAuthority = sessionStorage.getItem('authority') ? sessionStorage.getItem('authority') : 'GUEST';

  // 로그아웃
  const Logout = () => {
    // fetch("/api/user/logout", {
    // method: "POST",
    // credentials: "include",
    // headers: {
    // "Content-type": "application/json",
    // },
    // }).then((response) => {
    // if (response.ok && response.status === 200) {
    // sessionStorage.removeItem("authority");
    // sessionStorage.removeItem("idx");
    // sessionStorage.removeItem("user_id");
    // sessionStorage.removeItem("user_name");
    // sessionStorage.removeItem("idx_ocr");
    navigate('/login', { replace: true });
    // } else {
    // alert("로그아웃 실패. 관리자에게 문의하세요.");
    // }
    // });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {UserAuthority === 'admin' && (
            <Typography variant="subtitle2" noWrap>
              ADMIN
            </Typography>
          )}
          {UserAuthority === 'typist' && (
            <Typography variant="subtitle2" noWrap>
              유통사
            </Typography>
          )}
          {UserAuthority === 'GUEST' && (
            <Typography variant="subtitle2" noWrap>
              GUEST
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={Logout} sx={{ m: 1 }}>
          로그아웃
        </MenuItem>
      </MenuPopover>
    </>
  );
}
