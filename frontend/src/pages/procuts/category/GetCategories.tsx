import style from "./GetCategories.module.css";

type Category = {
  id: number;
  name: string;
  description?: string;
};

function GetCategories() {
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
          {/* Ejemplo visual */}
          <div className={style.card}>
            <div className={style.cardIcon}>📦</div>

            <div className={style.cardContent}>
              <h3 className={style.categoryName}>Electrónica</h3>

              <p className={style.description}>
                Productos y dispositivos electrónicos.
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardIcon}>👕</div>

            <div className={style.cardContent}>
              <h3 className={style.categoryName}>Ropa</h3>

              <p className={style.description}>
                Prendas de vestir y accesorios.
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardIcon}>🏠</div>

            <div className={style.cardContent}>
              <h3 className={style.categoryName}>Hogar</h3>

              <p className={style.description}>
                Productos para el hogar y decoración.
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardIcon}>⚽</div>

            <div className={style.cardContent}>
              <h3 className={style.categoryName}>Deportes</h3>

              <p className={style.description}>
                Artículos y accesorios deportivos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetCategories;

