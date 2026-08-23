import { useParams } from "react-router-dom";

function ProductsById() {
    const {cateogyId} = useParams();

    console.log(cateogyId);

    return (
        <div>
            <h1>Productos de la categoria {cateogyId}</h1>
        </div>
    )
}

export default ProductsById;