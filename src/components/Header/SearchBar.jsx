import React from 'react';
import classes from './Header.module.css';
import loupe from './../../images/header/loupe.png';
import { useFormik } from 'formik';

export const SearchBar = ({ search }) => {

  const formik = useFormik({
    initialValues: {
      searchRequest: ''
    },
    onSubmit: (values, actions) => {
      search(values.searchRequest);
      actions.resetForm(formik.initialValues);
    }
  })

  return <form className={classes.searchBar}
    onSubmit={formik.handleSubmit}
    onKeyDown={(event) => {
      if (event.key === 'Enter') {
        formik.handleSubmit();
      }
    }
    }  >
    <input type={'text'}
      name='searchRequest'
      className={classes.searchInput}
      value={formik.values.searchRequest}
      onChange={formik.handleChange} />
    <img className={classes.loupe} href='' alt='' src={loupe} onClick={formik.handleSubmit} />
  </form>
   

}

