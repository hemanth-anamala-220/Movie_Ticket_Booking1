import { useState } from "react"
import './Products.css'
import { NavLink, Outlet } from "react-router-dom"

const Products = () => {

    const [products, setProducts] = useState([
        "mobiles", "fashion", "grocery", "timer"
    ])

    return (
        <div className="productContainer">
            {products.map((product, index) => {
                return (
                    <div className="card" key={index}>
                        <NavLink to={product}>
                            <h1>{product}</h1>
                        </NavLink>
                    </div>
                )
            })}
            {/* <nav>
                <ul>
                    <li> <NavLink to={'mobiles'}>Mobiles</NavLink></li>
                    <li> <NavLink to={'fashion'}>Fashion</NavLink></li>
                    <li> <NavLink to={'grocery'}>Grocery</NavLink></li>
                </ul>
            </nav> */}
            <Outlet />
        </div>
    )
}
export default Products