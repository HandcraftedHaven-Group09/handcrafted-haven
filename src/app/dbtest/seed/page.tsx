import seedData from "@/app/lib/seed.json";
import { Prisma, PrismaClient } from "@prisma/client";

console.log("Writing need seed data");
const client = new PrismaClient();

// Order is important
client.image.deleteMany({}).catch((e) => console.log(e));
client.product.deleteMany({});
client.seller.deleteMany({});

for (const seller of seedData.Sellers) {
  client.seller
    .create({
      data: {
        displayName: seller.displayName,
        firstName: seller.firstName,
        lastName: seller.lastName,
      },
    })
    .then(() => {
      console.log("Sellers created");
    })
    .catch((error) => {
      console.log(error);
    });
}

for (const image of seedData.Images) {
  client.image
    .create({
      data: {
        url: image.url,
        description: image.description,
        ownerId: image.ownerId,
      },
    })
    .then(() => {
      console.log("Images created");
    })
    .catch((error) => {
      console.log(error);
    });
}

for (const user of seedData.Users) {
  client.user
    .create({
      data: {
        userId: user.userId,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        profilePictureId: user.profilePictureId,
        credential: user.credential,
      },
    })
    .then(() => {
      console.log("Users created");
    })
    .catch((error) => {
      console.log(error);
    });
}

client.$disconnect();
export default async function Page() {
  return (
    <>
      <p>SEEDING</p>
    </>
  );
}
