import { useState } from 'react'
import { PiCoffeeBeanLight } from "react-icons/pi";
import { BiSolidCoffeeBean } from "react-icons/bi";

const BeanRaint =({setterBeans, filledBeans}) => {

    const [activeRating, setActiveRating] = useState(0)

    return (
        <div className='five-beans'>
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            onMouseEnter={() => setActiveRating(i)} 
            onMouseLeave={() => setActiveRating(0)} 
            onClick={() => setterBeans(i)}
          >
            {activeRating > i - 1 || filledStars > i - 1 ? <PiCoffeeBeanLight /> : <BiSolidCoffeeBean />}
          </div>
        ))}
      </div>
    )
}