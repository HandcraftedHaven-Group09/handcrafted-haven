/*
  Warnings:

  - Added the required column `credential` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShippingType" AS ENUM ('USPS', 'UPS', 'FedEx');

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ownerId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credential" TEXT NOT NULL,
ADD COLUMN     "imageId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL,
    "shippingType" "ShippingType" NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToProduct_AB_unique" ON "_InvoiceToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToProduct_B_index" ON "_InvoiceToProduct"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToProduct" ADD CONSTRAINT "_InvoiceToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToProduct" ADD CONSTRAINT "_InvoiceToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
