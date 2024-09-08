import { useDispatch, useSelector } from 'react-redux';
import { hideNotificationSnackbar } from '../stores/actions/snackbar';

import { Snackbar, Alert, Slide } from "@mui/material"

export default function NotificationSnackbar() {

  const dispatch = useDispatch();
  const { type, message, show } = useSelector((state) => state.snackbar);

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />
  }

  const handleClose = () => {
    dispatch(hideNotificationSnackbar());
  }

  return (
    <>
    <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={show} 
      autoHideDuration={6000} 
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
    </>
  )
}