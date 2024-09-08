import { Link } from "react-router-dom";
import { TableRow, TableCell, Button, ButtonGroup, Typography } from '@mui/material';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import formatAsRupiah from "../helpers/currencyFormatter";

export default function TableRowProduct({ 
  index, id, name, slug, description, price, mainImg, category, author,
  onClickEditButton, onClickDeleteButton
} = {}) {

  return (
    <TableRow>
      <TableCell>
        {index+1}
      </TableCell>
      <TableCell>
        <img src={mainImg} alt={name} width="100%" />
      </TableCell>
      <TableCell>
        <div>
          <Typography>
            <Link to={`/products/${id}`}>{name}</Link>
          </Typography>
          <Typography paragraph>
            {description}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        {formatAsRupiah(price)}
      </TableCell>
      <TableCell>
        {category?.name}
      </TableCell>
      <TableCell>
        {author?.email}
      </TableCell>
      <TableCell>
        <ButtonGroup size="small" aria-label="small button group">
          <Button variant="outlined" size="small" onClick={onClickEditButton(id)}>
            <CreateTwoToneIcon />
          </Button>
          <Button variant="outlined" size="small" onClick={onClickDeleteButton(id)}>
            <DeleteTwoToneIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  )
}