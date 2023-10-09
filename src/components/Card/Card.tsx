import { ReactElement } from "react"

import classes from './Card.module.css';

type CardProps = {
   children: ReactElement
}

export const Card = (props: CardProps) => {
   return (
      <div className={classes.card}>
         {props.children}
      </div>
   )
}