import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { List, ListItem } from '@material-ui/core';
import { IUser } from '../../api/utils';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  names: IUser[];
}

export default function ParticipantPopOver({
  anchorEl,
  setAnchorEl,
  names,
}: Props) {
  const classes = useStyles();

  const nameList = () => {
    return (
      <List>
        {names.map((p: any) => (
          <ListItem key={p.id}>{p.user.nickName}</ListItem>
        ))}
      </List>
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {nameList()}
      </Popover>
    </div>
  );
}
