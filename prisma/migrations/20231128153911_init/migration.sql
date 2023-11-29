/*
  Warnings:

  - You are about to drop the column `Bank_account_name` on the `bank_account` table. All the data in the column will be lost.
  - Added the required column `Bank_account_money` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `bank_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "Bank_account_name",
ADD COLUMN     "Bank_account_money" TEXT NOT NULL,
ADD COLUMN     "balance" INTEGER NOT NULL;
