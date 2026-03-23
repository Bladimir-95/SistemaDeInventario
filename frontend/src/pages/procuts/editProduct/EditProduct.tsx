import { useParams } from "react-router-dom";
import CreatProducts from "../createProducts/CreatProducts";
import GetProducts from '../getProducts/GetProducts';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
};

// TEMPORAL (luego vendrá de estado o backend)
const products: Product[] = [
  {
    id: 1,
    name: "laptop Gamer",
    price: 1200,
    stock: 3,
    category: "tecnologia",
  },
  {
    id: 2,
    name: "Teclado Mecánico",
    price: 150,
    stock: 2,
    category: "tecnologia",
  },
];

function EditProduct() {
  const { id } = useParams();

  const product = products.find(p => p.id === Number(id));

  if(!product) return <p>Producto no encontrado</p>

  return <CreatProducts product={product}/>;
}

export default EditProduct;
