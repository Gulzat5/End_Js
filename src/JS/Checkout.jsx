import { useEffect } from 'react'
import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/ProductThunk/ProductThunk'
import { productActions } from '../store/ProductSlice/ProductSlice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderQuantity,
    total,
    incrementHandler,
    DecrementHandler,
}) => {
    const totalPrice = total.toFixed(2)
    const enabled = total === 0
    const disable = availableCount === orderQuantity
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderQuantity}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button
                    className={styles.actionButton}
                    onClick={() => incrementHandler(id, price)}
                    // disabled={disable}
                >
                    +
                </button>
                <button
                    onClick={() => DecrementHandler(id, price)}
                    className={styles.actionButton}
                    // disabled={enabled}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const { products, totalPrice } = useSelector((state) => state.products)
    console.log('products: ', products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    const incrementHandler = (id, price) => {
        dispatch(productActions.incremet(id))
        dispatch(productActions.IncrementById(price))
    }
    const DecrementHandler = (id, price) => {
        dispatch(productActions.decrement(id))
        dispatch(productActions.DecrementById(price))
    }

    const Price = products.reduce((sum, product) => sum + product.price, 0)
    const totalDisCount = Price - Price * 10
    const discount = Price * 0.1

    const price = totalPrice.toFixed(2)
    let count = 0
    if (totalPrice > 1000) {
        count = totalPrice * 0.1
    }
    const resultCount = count.toFixed(2)

    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                <LoadingIcon />
                <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item) => (
                            <Product
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                availableCount={item.availableCount}
                                price={item.price}
                                orderQuantity={item.orderQuantity}
                                total={item.total}
                                incrementHandler={incrementHandler}
                                DecrementHandler={DecrementHandler}
                            />
                        ))}
                    </tbody>
                </table>

                <h2>Order summary</h2>
                <p>Discount: $ {resultCount}</p>
                <p>Total: $ {price}</p>
            </main>
        </div>
    )
}

export default Checkout
