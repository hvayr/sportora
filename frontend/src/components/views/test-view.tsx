import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }),
);

const tileData = [
  {
    img: 'https://picsum.photos/200/300',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/200/300',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/200/300',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/200/300',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/200/300',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
];
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={2}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 2}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
