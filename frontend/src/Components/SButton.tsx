import { Button, styled } from "@mui/material";

export const SButton = styled(Button)({
    background: 'linear-gradient(45deg, #1e1e1e 30%, #4a4a4a 90%)',
    border: '2px solid #00e5ff',
    borderRadius: '15px',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(0, 229, 255, .3)',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, rgba(0,229,255,.3) 30%, rgba(0,255,204,.3) 90%)',
      borderRadius: 'inherit',
      zIndex: -1,
      transition: 'opacity 0.3s ease-in-out',
      opacity: 0,
    },
    '&:hover:before': {
      opacity: 1,
    },
    '&:hover': {
      border: '2px solid #00b8d4',
      boxShadow: '0 6px 10px 4px rgba(0, 229, 255, .5)',
    },
  });
