import { useState, useEffect } from "react";
import style from "./CreateProducts.module.css";
import icono from "../../../assets/icons/icons8-caja.svg";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

type Props = {
  product?: Product
}

function CreatProducts({ product }: Props) {
  const navigate = useNavigate();
  const isEdit = !!product;

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [precio, setPrecio] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if(product){
      setName(product.name);
      setCategory(product.category);
      setPrecio(product.price);
      setStock(product.stock);
      setPreview(product.image || null);
    }
  }, [product]);

  const message = error ? (
    <p className={style.error}>{error}</p>
  ) : success ? (
    <p className={style.success}>{success}</p>
  ) : null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setError("Nombre requerido");
    if (!category.trim()) return setError("Categoría requerida");
    if (precio === "") return setError("Precio requerido");
    if (stock === "") return setError("Stock requerido");
    if (!image) return setError("Imagen requerida");

    setError("");

    if(isEdit) {
      console.log("Editando", {
        id: product?.id,
        name,
        category,
        precio,
        stock,
        image,
      });

      setSuccess("Producto actulaizado");
      
      setTimeout(() => navigate("/getProduct"), 3000);
      
    } else {
      console.log("Creando:", {
        name,
        category,
        precio,
        stock,
        image,
      });
    }

    setSuccess("Producto agregado exitosamente");
   

    // Limpiar inputs
    setTimeout(() => {
      setName("");
      setCategory("");
      setPrecio("");
      setStock("");
      setImage(null);
      setPreview(null);
      setSuccess("");
    }, 5000);
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.card}>
          <div className={style.title}>
            <img className={style.icono} src={icono} alt="icono" />
            <h2 className={style.title_text}>Agregar Producto</h2>
          </div>

          <p className={style.p}>Agrega un producto nuevo para tu tienda</p>

          {message}

          <form onSubmit={handleSubmit} className={style.form}>
            <label className={style.label}>Nombre</label>
            <input
              className={style.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className={style.label}>Categoría</label>
            <input
              className={style.input}
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <label className={style.label}>Precio</label>
            <input
              className={style.input}
              type="number"
              min={0}
              step={0.01}
              value={precio}
              onChange={(e) =>
                setPrecio(
                  e.target.value === "" ? "" : parseFloat(e.target.value),
                )
              }
            />

            <label className={style.label}>Stock</label>
            <input
              className={style.input}
              type="number"
              min={0}
              value={stock}
              onChange={(e) =>
                setStock(e.target.value === "" ? "" : parseInt(e.target.value))
              }
            />

            <div className={style.imageUpload}>
              <label className={style.uploadBox}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />

                {preview ? (
                  <img src={preview} alt="preview" className={style.preview} />
                ) : (
                  <span>📷 Subir imagen</span>
                )}
              </label>
            </div>

            <div className={style.btnContainer}>
              <button className={style.button} type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreatProducts;
