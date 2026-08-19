import { useState, useEffect } from "react";
import style from "./CreateProducts.module.css";
import icono from "../../../assets/icons/icons8-caja.svg";
import { useNavigate } from "react-router-dom";


type Product = {
  id: number;
  name: string;
  category_id: number;
  price: number;
  stock: number;
  image?: string;
};

type Props = {
  product?: Product;
};

type Category = {
  id: number;
  name: string;
};

function CreatProducts({ product }: Props) {
  const navigate = useNavigate();
  const isEdit = !!product;

  const [name, setName] = useState<string>("");
  const [category_id, setCategory_id] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(categories);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory_id(product.category_id);
      setPrice(product.price);
      setStock(product.stock);
      setPreview(product.image || null);
    }
  }, [product]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");

        if (!response.ok) {
          throw new Error("Error al obtener categorias");
        }

        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setError("Nombre requerido");
    if (category_id == "") return setError("Categoría requerida");
    if (price === "") return setError("Precio requerido");
    if (stock === "") return setError("Stock requerido");
    if (!image) return setError("Imagen requerida");

    //solo exigimos una imagen cuando esta creando, de lo 
    //contrario puede usar la misma
    if(!isEdit && !image) {
      return setError("Imagen requerida")
    }

    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("category_id", String(category_id));
      formData.append("price", String(price));
      formData.append("stock", String(stock));

      //Si selecciona una nueva imagen, la enviamos
      if (image) {
        formData.append("image", image);
      }

      const url = isEdit
      ? `http://localhost:3000/api/products/updateproduct/${product.id}`
      : "http://localhost:3000/api/products/creatproduct";

      const response = await fetch(url,
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        },
      );

      if(!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 
        isEdit ? "Error al actualizar" : "Error al crear el objeto");
      }

      const data = await response.json();

      console.log(data);

      setSuccess(isEdit ? "Producto actualizado exitosamene" : "Producto creado exitosamente");

      setTimeout(() => {
        navigate("/getProduct");
      }, 1500);

    } catch (error) {
      setError(error instanceof Error 
        ? error.message : 
        "Ocurrio un error al crear producto");
    }
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.card}>
          <div className={style.title}>
            <img className={style.icono} src={icono} alt="icono" />
            <h2 className={style.title_text}>
              {product ? "Editar Producto" : "Crear Producto"}
            </h2>
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

            <select
              className={style.input}
              value={category_id}
              onChange={(e) =>
                setCategory_id(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            >
              <option value="">Selecciona una categoría</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label className={style.label}>Precio</label>
            <input
              className={style.input}
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) =>
                setPrice(
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
