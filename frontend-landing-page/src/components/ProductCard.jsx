import { Link } from "react-router-dom";
import {
  Card, CardContent, CardMedia, 
  Typography
} from '@mui/material';
import formatAsRupiah from "../helpers/currencyFormatter";

export default function ProductCard({id, mainImg, name: productName, description, price, slug, category}) {
  return (
    <Link to={`/${slug}`}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', minWidth: '200px', maxWidth: '250px' }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '100%',
        }}
        image={mainImg}
      />
      <CardContent sx={{ flexGrow: 1 }}>

        <Typography className="product-card-category">
          {category?.name}
        </Typography>

        <Typography 
          className="product-card-name"
          gutterBottom variant="h5" component="h5" 
          sx={{ minHeight: '140px' }}
        >
          {productName}
        </Typography>

        <Typography
          className="product-card-price"
        >
          {formatAsRupiah(price)}
        </Typography>

      </CardContent>

    </Card>
    </Link>
  )
}