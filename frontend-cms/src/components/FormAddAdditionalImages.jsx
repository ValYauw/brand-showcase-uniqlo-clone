import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { 
  Box, Container,
  FormControl, FormLabel, 
  TextField,
  Button, IconButton, 
} from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export default function FormAddAdditionalImages({ imageState = useState([]) }) {

  const { product } = useSelector(state => state.cms);

  const [images, setImages] = imageState;
  useEffect(() => {
    if (product) {
      setImages([...product.images])
    } else {
      setImages([])
    }
  }, []);

  function AddNewAdditionalImageButton() {
    return (
      <Container>
        <Box>
          <Button size="small" sx={{ display: 'inline-flex' }} onClick={addNewAdditionalImageInputField}>
            <AddCircleTwoToneIcon />
            Add new image
          </Button>
        </Box>
      </Container>
    )
  }

  function addNewAdditionalImageInputField() {
    setImages([
      ...images,
      { imgUrl: '' }
    ]);
  }

  function deleteNewAdditionalImageInputField(index) {
    return () => setImages([
      ...images.slice(0, index), 
      ...images.slice(index + 1, images.length)
    ]);
  }

  return (
    <FormControl 
      fullWidth
      component="fieldset"
      sx={{
        px: '5px',
        py: '10px',
        border: 'solid 1px grey',
        borderRadius: '5px',
        marginTop: '5px'
      }}
    >

      <FormLabel component="legend" sx={{ fontSize: "1rem", padding: "2px" }}>
        Additional Images
      </FormLabel>

      { images?.map((el, index) => {
        return (
          <Container 
            key={index}
            sx={{ 
              display: 'flex', 
              px: '0px', 
              mx: '0px',
              marginBottom: '5px' 
            }}
          >
            <TextField 
              margin="none"
              size="small"
              fullWidth
              value={images[index].imgUrl}
              onChange={(e) => {
                setImages(images.map((image, idx) => {
                  if (idx === index) image.imgUrl = e.target.value;
                  return image;
                }));
              }}
              type="url"
            />
            <IconButton size="small" sx={{ display: 'inline-flex' }} onClick={deleteNewAdditionalImageInputField(index)}>
              <DeleteTwoToneIcon />
            </IconButton>
            
          </Container>
        )
      }) }

      <AddNewAdditionalImageButton />

    </FormControl>
  )

}