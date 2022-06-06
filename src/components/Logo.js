import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src="/static/brand_logo.png"
        sx={{ width: 40, height: 45, ...sx }}
        style={{ marginRight: '20px' }}
      />
    </RouterLink>
  );
}
