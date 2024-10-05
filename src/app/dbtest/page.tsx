import { getProductsAll } from "../lib/data";

export default async function Page() {
  const testProduct = await getProductsAll(5);
  return (
    <main>
      <ul>
        {testProduct?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
