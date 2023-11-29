/*
  Warnings:

  - You are about to drop the column `title` on the `bank_account` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Bank_account_name` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_name` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "title",
ADD COLUMN     "Bank_account_name" TEXT NOT NULL,
ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
