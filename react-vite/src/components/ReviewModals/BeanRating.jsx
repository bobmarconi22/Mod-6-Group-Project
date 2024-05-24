import { useState } from 'react'
import { CiCoffeeBean } from "react-icons/ci";
import { BiSolidCoffeeBean } from "react-icons/bi";
import './BeanRating'


const BeanRating = ({ setBeans, filledBeans }) => {

  const [activeRating, setActiveRating] = useState(0)

  return (
    <div className='five-beans'>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          onMouseEnter={() => setActiveRating(i)}
          onMouseLeave={() => setActiveRating(0)}
          onClick={() => setBeans(i)}
        >
          {activeRating > i - 1 || filledBeans > i - 1 ?
            < BiSolidCoffeeBean className='custom-icon' />
            : < CiCoffeeBean className='custom-icon' />}
        </div>
      ))}
    </div>
  )
}

export { BeanRating }
