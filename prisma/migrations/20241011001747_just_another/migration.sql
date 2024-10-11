/*
  Warnings:

  - The values [FedEx] on the enum `ShippingType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentMethod` on the `PaymentMethod` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - Added the required column `State` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street1` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street2` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ShippingType_new" AS ENUM ('USPS', 'UPS', 'FEDEX');
ALTER TABLE "Invoice" ALTER COLUMN "shippingType" TYPE "ShippingType_new" USING ("shippingType"::text::"ShippingType_new");
ALTER TYPE "ShippingType" RENAME TO "ShippingType_old";
ALTER TYPE "ShippingType_new" RENAME TO "ShippingType";
DROP TYPE "ShippingType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "paymentMethod",
ADD COLUMN     "State" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "paymentType" "PaymentType" NOT NULL,
ADD COLUMN     "street1" TEXT NOT NULL,
ADD COLUMN     "street2" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId",
ADD COLUMN     "profilePictureId" INTEGER,
ALTER COLUMN "bio" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
