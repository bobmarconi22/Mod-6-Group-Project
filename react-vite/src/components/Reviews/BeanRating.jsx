import { useState } from 'react'
import { CiCoffeeBean } from "react-icons/ci";
import { BiSolidCoffeeBean } from "react-icons/bi";


const BeanRating =({setBeans, filledBeans}) => {

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
            < BiSolidCoffeeBean />
            : < CiCoffeeBean/>}
          </div>
        ))}
      </div>
    )
}

export {BeanRating}