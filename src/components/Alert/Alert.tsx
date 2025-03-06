import { ReactNode } from "react"
import './Alert.css'


export const Alert = ({children}: {children:ReactNode}) => {
  return (
    <div className='alert' data-testid="alert"> {children} </div>
  )
}
