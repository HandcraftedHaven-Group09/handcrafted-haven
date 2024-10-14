import seedData from "@/app/lib/seed.json";
import { list } from "@vercel/blob";
import { PrismaClient, PaymentType, ShippingType } from "@prisma/client";

async function main() {
  console.log("Writing needed seed data");
  const client = new PrismaClient();

  // Order is important
  await client.image.deleteMany({}).catch((e) => console.log(e));
  await client.user.deleteMany({}).catch((e) => console.log(e));
  await client.seller.deleteMany({}).catch((e) => console.log(e));
  await client.product.deleteMany({}).catch((e) => console.log(e));
  await client.review.deleteMany({}).catch((e) => console.log(e));
  await client.paymentMethod.deleteMany({}).catch((e) => console.log(e));
  await client.invoice.deleteMany({}).catch((e) => console.log(e));

  // Reset all the auto increment ids
  await client.$executeRawUnsafe('ALTER SEQUENCE "Image_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "User_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "Seller_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "Product_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "Review_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "PaymentMethod_id_seq" RESTART WITH 1');
  await client.$executeRawUnsafe('ALTER SEQUENCE "Invoice_id_seq" RESTART WITH 1');

  for (const seller of seedData.Sellers) {
    await client.seller
      .create({
        data: seller,
      })
      .then(() => {
        console.log("Sellers created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const image of seedData.Images) {
    await client.image
      .create({
        data: image,
      })
      .then(() => {
        console.log("Images created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const user of seedData.Users) {
    await client.user
      .create({
        data: user,
      })
      .then(() => {
        console.log("Users created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const product of seedData.Products) {
    await client.product
      .create({
        data: product
      })
      .then(() => {
        console.log("Products created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const review of seedData.Reviews) {
    await client.review
      .create({
        data: review
      })
      .then(() => {
        console.log("Reviews created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const paymentMethod of seedData.PaymentMethods) {
    await client.paymentMethod
      .create({
        // data: paymentMethod
        data: {
          identifier: paymentMethod.identifier,
          expirationMonth: paymentMethod.expirationMonth,
          expirationYear: paymentMethod.expirationYear,
          paymentType: paymentMethod.paymentType as PaymentType, //CURSE YOU ENUM!
          street1: paymentMethod.street1,
          street2: paymentMethod.street2,
          city: paymentMethod.city,
          state: paymentMethod.state,
          zip: paymentMethod.zip,
          validation: paymentMethod.validation,
          userId: paymentMethod.userId
        }
      })
      .then(() => {
        console.log("PaymentMethods created");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  for (const invoice of seedData.Invoices) {
    await client.invoice
      .create({
        // data: paymentMethod
        data: {
          subtotal: invoice.subtotal,
          tax: invoice.tax,
          shipping: invoice.shipping,
          shippingType: invoice.shippingType as ShippingType,
          totalCost: invoice.totalCost,
          userId: invoice.userId,
          paymentMethodId: invoice.paymentMethodId
        }
      })
      .then(() => {
        console.log("Invoices created");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log("Importing BLOB images")
  const files = await list();
  files.blobs.forEach((file) => {

    console.log("FILE:", file);
    const description = file.pathname.replace(/\.(webp|jpeg|png)/g, "").replaceAll("_", " ");
    console.log(description)

    client.image.create({
      data: {
        url: file.url,
        description: description,
        ownerId: 1
      },
    })
      .then(() => {
        console.log(`${description} created from blob`);
      })
      .catch((error) => {
        console.log(error);
      })
  });




  console.log("Seeding completed");
  client.$disconnect();
}

if (process.env.DEV) { main(); }


export default async function Page() {
  return (
    <>
      <p>SEEDING</p>
    </>
  );
}
