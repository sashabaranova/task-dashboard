import React from 'react';
import { useForm } from "react-hook-form";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import styles from './index.module.scss';


const MyCardCreate = ({ title, desc, onChangeTitle, onChangeDesc, onClose, onCreate }) => {

  const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
  const cardTitle = register('title', { value: title, required: 'Title is required' });
  const cardDesc = register('desc', { value: desc, required: 'Description is required' });

  const onCloseForm = () => {
    onClose();
    clearErrors();
  };

  const onSubmit = (data) => {
    onCreate(data);
    onClose();
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...cardTitle}
            value={title}
            onChange={onChangeTitle}
            placeholder="Enter title"
            variant="outlined"
            classes={{ root: styles.input, notchedOutline: styles.notched }}
          />
          {errors.title && <Typography color="secondary" variant="h6">{errors.title.message}</Typography>}
          <TextareaAutosize
            {...cardDesc}
            className={styles.noResize}
            value={desc}
            onChange={onChangeDesc}
            placeholder="Enter Description"
          />
          {errors.desc && <Typography color="secondary" variant="h6">{errors.desc.message}</Typography>}
          <Button variant="contained" color="primary" type="submit">Add</Button>
          <IconButton classes={{ root: styles.iconBtn }} aria-label="close" onClick={onCloseForm}>
            <Close />
          </IconButton>
        </form>
      </CardContent>
    </Card>
  )
};

export default MyCardCreate;