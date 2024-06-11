/*
  Warnings:

  - Added the required column `stock` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "stock" TEXT NOT NULL;
