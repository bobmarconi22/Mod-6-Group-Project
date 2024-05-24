import { CiCoffeeBean } from "react-icons/ci";
import { BiSolidCoffeeBean } from "react-icons/bi";
// import '../ReviewModals/BeanRating.css'


const BeanRating = ({ avg_rating }) => {

  return (
    <div className='five-beans'>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i}>
          {avg_rating >= i ?
            < BiSolidCoffeeBean className='custom-icon' />
            : < CiCoffeeBean className='custom-icon' />}
        </div>
      ))}
    </div>
  )
}

export default BeanRating
