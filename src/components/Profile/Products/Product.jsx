import React from 'react';

const Product = function({name, cost}) {
     

    return <div className='product'>
        name: {name}, 
        cost: {cost}
    </div>
}


export default Product;