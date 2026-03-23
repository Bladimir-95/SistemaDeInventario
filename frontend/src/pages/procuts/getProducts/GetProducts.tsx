import style from "./GetProducts.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
};

function GetProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "laptop Gamer",
      price: 1200,
      stock: 3,
      image:
        "https://i5.walmartimages.com/seo/ASUS-ROG-Strix-SCAR-15-G533QS-DS76-AMD-Ryzen-7-5800H-4-4-GHz-Windows-10-Home-GF-RTX-3080-16-GB-RAM-1-TB-SSD-NVMe-15-6-1920-x-1080-Full-HD-300-Hz-Giga_dcab559f-0914-43e1-bda7-cc99f820da28.b6ef2d60d9b688ffede8c036c31956d8.jpeg",
    },
    {
      id: 2,
      name: "Teclado Mecánico",
      price: 150,
      image:
        "https://cyberteamcr.com/wp-content/uploads/2024/11/3754610-cb069311.webp",
      stock: 2,
    },
    {
      id: 3,
      name: "Mouse Gamer",
      price: 80,
      image:
        "https://www.steren.com.sv/media/catalog/product/cache/bb0cad18a6adb5d17b0efd58f4201a2f/image/2302839e9/mouse-usb-gamer-800-1600-2400-3200-4800-7200-dpi.jpg",
      stock: 9,
    },
  ]);

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirmDelete) return;

    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
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
                  <Link to={`/editProduct/${product.id}`} className={style.editIcon}>
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
      </section>
    </div>
  );
}

export default GetProducts;
