import { ImageList, ImageListItem } from '@mui/material'

export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={2} rowHeight={250}>
      {images.map(image => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=200&h=200&fit=crop&auto=format`}
            srcSet={`${image}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
            alt="Note Image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
