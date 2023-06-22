 import useSelector
 const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
}) => {

const df= useSelector()


    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total}</td>
            <td>
                <button className={styles.actionButton}>+</button>
                <button className={styles.actionButton}>-</button>
            </td>
        </tr>
    )
}
