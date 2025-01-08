import * as React from 'react';
import Stack from '@mui/material/Stack';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <div className="flex items-center space-x-4">
        <img
            src="./logo512.png"
            alt="TrendWiz Logo"
            className="h-8 w-8 object-contain" // Ensures consistent dimensions
          />
          <span className="text-xl font-bold text-black-800">TrendWiz</span>
        </div>
      <NavbarBreadcrumbs />
      
           <Stack direction="row" sx={{ gap: 1 }}>
        <CustomDatePicker />
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
