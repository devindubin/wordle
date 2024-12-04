import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export const PopupWin = ({ isOpen, onClose, solution }) => {
  //return <div className={`pop-up-modal ${isOpen ? '' : 'hidden'}`}>Congrats You Did It</div>

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

  content = (
    <div className='modal'>
      <Modal open={isOpen}>
        <Box sx={style}>
          <h2>You win!</h2>
          <p>The answer was {solution}</p>
          <Button onClick={()=> onClose()} >Close</Button>
        </Box>
      </Modal>
    </div>
  );
  return content;
};

export const PopupLose = ({ isOpen, onClose, solution }) => {
  //return <div className={`pop-up-modal ${isOpen ? '' : 'hidden'}`}>Congrats You Did It</div>

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

  content = (
    <div className='modal'>
      <Modal open={isOpen}>
        <Box sx={style}>
          <h2>Better Luck Next Time</h2>
          <p>The answer was {solution}</p>
          <Button onClick={()=> onClose()} >Close</Button>
        </Box>
      </Modal>
    </div>
  );
  return content;
};
