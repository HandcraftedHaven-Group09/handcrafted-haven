/*
  Warnings:

  - You are about to drop the column `productId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_productId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "productId";
