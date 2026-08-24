import style from "./GetProducts.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category_id: number;
  status: number;
  created_at: string;
  updated_at: string;
};

function GetProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = categoryId
          ? `http://localhost:3000/api/products/category/${categoryId}`
          : "http://localhost:3000/api/products";

        const response = await fetch(url);
        const data: Product[] = await response.json();
        console.log(data);

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar este producto?",
    );
    if (!confirmDelete) return;

    const deleteProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/deleteproduct/${id}`,
          {
            method: "DELETE",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al eliminar producto");
        }

        console.log(data.message);

        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("No se pudo eliminar el producto");
      }
    };

    deleteProduct();
  };

  return (
    <div className={style.container}>
      <section className={style.hero}>
        <h1 className={style.title}>Inventario</h1>
        <p>
          Administra tus productos, controla el stock y mantén tu inventario
          actualizado.
        </p>
      </section>

      {/* PRODUCTOS */}
      <section className={style.productsSection}>
        <h2 className={style.productsTitle}>Productos</h2>
        {products.length === 0 ? (
          <p>No hay productos de esta categoria</p>
        ) : (
          <div className={style.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={style.card}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={style.image}
                />

                {/* HEADER CON BOTONES */}
                <div className={style.cardHeader}>
                  <h3 className={style.productName}>{product.name}</h3>

                  <div className={style.actions}>
                    <Link
                      to={`/editProduct/${product.id}`}
                      className={style.editIcon}
                    >
                      ✏️
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className={style.deleteIcon}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className={style.price}>${product.price}</p>
                <p className={style.stock}>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default GetProducts;
