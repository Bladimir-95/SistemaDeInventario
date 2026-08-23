import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./GetCategories.module.css";

type Category = {
  id: number;
  name: string;
  description: string;
};

function GetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data: Category[] = await response.json();
        console.log(data);

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className={style.container}>
      <section className={style.hero}>
        <h1 className={style.title}>Categorías</h1>

        <p className={style.subtitle}>
          Administra y organiza las categorías de tus productos.
        </p>
      </section>

      <section className={style.categoriesSection}>
        <h2 className={style.categoriesTitle}>Categorías disponibles</h2>

        <div className={style.categoriesGrid}>
          {categories.map((c) => (
            <Link to={`categories/${c.id}`} className={style.card} key={c.id}>
              <div className={style.cardContent}>
                <h3 className={style.categoryName}>{c.name}</h3>

                <p className={style.description}>{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GetCategories;
