import { getProductsAll } from "../lib/data";

export default async function Page() {
  const testProduct = await getProductsAll(5);
  return (
    <main>
      <ul>
        {testProduct?.map((product) => (
          <li>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
