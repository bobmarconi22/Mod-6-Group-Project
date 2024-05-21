import './CreateShop.css'
import { useState } from 'react'

function CreateShop() {

    const hoursCreator = () => {
        return (
            <div>
                <select>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednesday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                </select>
                <select>
                    <option value='6:00am'>6:00am</option>
                    <option value='7:00am'>7:00am</option>
                    <option value='8:00am'>8:00am</option>
                    <option value='9:00am'>9:00am</option>
                    <option value='10:00am'>10:00am</option>
                    <option value='11:00am'>11:00am</option>
                    <option value='12:00pm'>12:00pm</option>
                    <option value='1:00pm'>1:00pm</option>
                    <option value='2:00pm'>2:00pm</option>
                    <option value='3:00pm'>3:00pm</option>
                    <option value='3:00pm'>3:00pm</option>
                    <option value='4:00pm'>4:00pm</option>
                    <option value='5:00pm'>5:00pm</option>
                    <option value='6:00pm'>6:00pm</option>
                    <option value='7:00pm'>7:00pm</option>
                    <option value='8:00pm'>8:00pm</option>
                    <option value='9:00pm'>9:00pm</option>
                    <option value='10:00pm'>10:00pm</option>
                    <option value='11:00pm'>11:00pm</option>
                </select>
                <select>
                    <option value='6:00am'>6:00am</option>
                    <option value='7:00am'>7:00am</option>
                    <option value='8:00am'>8:00am</option>
                    <option value='9:00am'>9:00am</option>
                    <option value='10:00am'>10:00am</option>
                    <option value='11:00am'>11:00am</option>
                    <option value='12:00pm'>12:00pm</option>
                    <option value='1:00pm'>1:00pm</option>
                    <option value='2:00pm'>2:00pm</option>
                    <option value='3:00pm'>3:00pm</option>
                    <option value='3:00pm'>3:00pm</option>
                    <option value='4:00pm'>4:00pm</option>
                    <option value='5:00pm'>5:00pm</option>
                    <option value='6:00pm'>6:00pm</option>
                    <option value='7:00pm'>7:00pm</option>
                    <option value='8:00pm'>8:00pm</option>
                    <option value='9:00pm'>9:00pm</option>
                    <option value='10:00pm'>10:00pm</option>
                    <option value='11:00pm'>11:00pm</option>
                </select>
            </div>
        )
    }

    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [webAddress, setWebAddress] = useState('')
    const [description, setDescription] = useState('')


    const categoryCreator = () => {
        return (
            <select>
                <option value='Outdoor Seating'>Outdoor Seating</option>
                <option value='Free Wifi'>Free Wifi</option>
                <option value='Pet Friendly'>Pet Friendly</option>
                <option value='Live Music'>Live Music</option>
                <option value='Late Night'>Late Night</option>
                <option value='Lunch Menu'>Lunch Menu</option>
                <option value='Dinner Menu'>Dinner Menu</option>
                <option value='Vegan Options'>Vegan Options</option>
                <option value='Gluten-Free Options'>Gluten-Free Options</option>
                <option value='Kid Friendly'>Kid Friendly</option>
                <option value='Study Area'>Study Area</option>
                <option value='Drive-Thru'>Drive-Thru</option>
                <option value='Delivery Available'>Delivery Available</option>
                <option value='Parking Available'>Parking Available</option>
                <option value='Bike Racks'>Bike Racks</option>
                <option value='Wheelchair Accessible'>Wheelchair Accessible</option>
                <option value='Fireplace'>Fireplace</option>
                <option value='Cozy Atmosphere'>Cozy Atmosphere</option>
                <option value='Specialty Drinks'>Specialty Drinks</option>
                <option value='Seasonal Menu'>Seasonal Menu</option>
                <option value='Happy Hour'>Happy Hour</option>
                <option value='Handcrafted Pastries'>Handcrafted Pastries</option>
                <option value='Fair Trade Coffee'>Fair Trade Coffee</option>



            </select>
        )
    }

    return (
        <form className='create-shop-form'>
            <h1>Add Your Coffee Shop</h1>
            <label>
                Country
                <input type='select'></input>
            </label>
            <label>
                Business Name
                <input type='select'></input>
            </label>
            <label>
                Address 1
                <input type='select'></input>
            </label>
            <label>
                Address 2
                <input type='select'></input>
            </label>
            <label>
                City
                <input type='select'></input>
            </label>
            <label>
                State
                <input type='select'></input>
            </label>
            <label>
                Zip
                <input type='select'></input>
            </label>
            <label>
                Phone
                <input type='select'></input>
            </label>
            <label>
                Web Address
                <input type='select'></input>
            </label>
            <label className='hours-input'>
                Hours
                {/* currently the add hours button does not dynamically create new blocks */}
                <>{hoursCreator()}</>
                {/* <>{hoursCreator()}</> */}
                <button onClick={() => console.log('create new add hours')}>Add Hours</button>
            </label>
            <label>
                Categories
                <>{categoryCreator()}</>
                <>{categoryCreator()}</>
                <>{categoryCreator()}</>
            </label>
            <label>
                Describe your Coffee Shop
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </label>


        </form>
    )
}

export default CreateShop
