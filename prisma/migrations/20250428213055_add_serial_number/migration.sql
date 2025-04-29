/*
  Warnings:

  - Added the required column `serialNumber` to the `OxygenTank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OxygenTank" ADD COLUMN     "serialNumber" TEXT NOT NULL;
