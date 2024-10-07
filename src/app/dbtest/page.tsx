import { getProductsAll } from "@/app/lib/data";

export default async function Page() {
  const testProduct = await getProductsAll(5);
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Database Testing Sandbox</h2>

      <form>
        <fieldset style={{ padding: "1rem" }}>
          <legend>PRODUCT</legend>
          <dl>
            <dl>
              <label>Name</label>
            </dl>
            <dd>
              <input type="text"></input>
            </dd>
            <dl>
              <label>Price</label>
            </dl>
            <dd>
              <input type="text"></input>
            </dd>
            <dl>
              <label>Discount Percent</label>
            </dl>
            <dd>
              <input type="text"></input>
            </dd>
            <dl>
              <label>Discount Absolute</label>
            </dl>
            <dd>
              <input type="text"></input>
            </dd>
            <dl>
              <label>Description</label>
            </dl>
            <dd>
              <input type="text"></input>
            </dd>
          </dl>
        </fieldset>
      </form>
      <ul>
        {testProduct?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
