import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Todo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;