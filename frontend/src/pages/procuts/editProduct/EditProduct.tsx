import { useParams } from "react-router-dom";
import CreatProducts from "../createProducts/CreatProducts";
import { useEffect, useState } from "react";


type Product = {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
  image?: string;
};

type Props = {
  product?: Product
}

function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);

        if(!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const data = await response.json();

        setProduct(data);

      } catch (error) {
        console.log("Error al encontrar producto", error);
      }
    }

    getProducts();
  },[id])

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return <CreatProducts product={product}/>;
}

export default EditProduct;
