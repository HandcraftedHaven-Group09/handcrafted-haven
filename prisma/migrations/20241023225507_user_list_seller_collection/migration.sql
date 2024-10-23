-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discountAbsolute" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "productId" INTEGER;

-- CreateTable
CREATE TABLE "UserList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerCollection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "SellerCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserListToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SellerCollectionToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserListToProduct_AB_unique" ON "_UserListToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_UserListToProduct_B_index" ON "_UserListToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SellerCollectionToProduct_AB_unique" ON "_SellerCollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_SellerCollectionToProduct_B_index" ON "_SellerCollectionToProduct"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserList" ADD CONSTRAINT "UserList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerCollection" ADD CONSTRAINT "SellerCollection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserListToProduct" ADD CONSTRAINT "_UserListToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserListToProduct" ADD CONSTRAINT "_UserListToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "UserList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SellerCollectionToProduct" ADD CONSTRAINT "_SellerCollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SellerCollectionToProduct" ADD CONSTRAINT "_SellerCollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "SellerCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
