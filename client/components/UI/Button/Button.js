import React from 'react';

import classes from "./button.module.scss"

const Button = React.forwardRef((props,ref) => {
  return (
    <button className={classes.button} {...props} type='button' >
      {props.children}
    </button>
  );
})

export default Button;