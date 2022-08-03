import classes from "./button.module.scss"

const Button = ({type,onClick,children}) => {
  return (
    <button className={classes.button} type={type} onClick={onClick?onClick:null}>
      {children}
    </button>
  );
}



export default Button;