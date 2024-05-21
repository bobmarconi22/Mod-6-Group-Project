import './ShopDetail.css'

// use prop or context to get the shop information
// change headers to label or headers?
function ShopDetail() {
    return (
        <>
            <div id='shop-detail-cover-container'>
                <img src='img.png' />
                <div className='shop-detail-heading-container'>
                    <div>Coffee Shop Name</div>
                    <div>STARS Avg Rating (& num reviews)</div>
                    <div>Cost</div>
                    <div>Categories</div>
                    <div>see hours</div>
                </div>
                <div className='see-all-photos-button'>See all #(total photos) photos</div>
            </div>

            <div>Menu</div>
            <div>
                <div>
                    <img src='img.png'></img>
                    Menu Item 1
                </div>
            </div>
            <div id='shop-detail-additional-info-container'>
                <div>Coffee Shop Website</div>
                <div>Shop Address</div>
                <div>Shop Contact Info</div>
            </div>

            <div id='hours-address-container'>
                <div>
                    All hours
                    <div>insert hours here</div>
                </div>
                <div>
                    Address
                    <img src='img.png' />
                    <button>Get Directions</button>
                </div>
            </div>

            <div>
                About this Coffee Shop
                <div>
                    Descriptive paragraph about this coffee shop
                </div>
            </div>
        </>
    )

}

export default ShopDetail
