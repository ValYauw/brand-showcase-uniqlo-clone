import { 
  Paper
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function ImageCarousel({ images, productName, ...props }) {

  function CarouselItem({url, altText}) {
    // console.log(url);
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <img src={url} alt={altText} style={{objectFit: 'cover'}} />
      </Paper>
    )
  }

  return (
    <Carousel sx={{ minWidth: '60%', maxWidth: '600px', flexGrow: 2 }} {...props}>
      { images?.map( (image, index) => (
        <CarouselItem key={index} url={image} altText={productName} />
      ))}
    </Carousel>
  )

}