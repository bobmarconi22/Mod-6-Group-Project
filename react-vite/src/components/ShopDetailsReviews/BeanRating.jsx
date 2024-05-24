import { useState } from 'react'
import { CiCoffeeBean } from "react-icons/ci";
import { BiSolidCoffeeBean } from "react-icons/bi";
// import '../ReviewModals/BeanRating.css'


const BeanRating = ({ rating }) => {

  const [activeRating, setActiveRating] = useState(0)

  return (
    <div className='five-beans'>
      {[1, 2, 3, 4, 5].map(i => (
        <div>
          {rating >= i ?
            < BiSolidCoffeeBean className='custom-icon' />
            : < CiCoffeeBean className='custom-icon' />}
        </div>
      ))}
    </div>
  )
}

export default BeanRating
