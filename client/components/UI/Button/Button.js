import React from 'react';

import classes from "./button.module.scss"

const Button = React.forwardRef(({type,onClick,children},ref) => {
  return (
    <button className={classes.button} type={type} onClick={onClick?onClick:null}>
      {children}
    </button>
  );
})

export default Button;