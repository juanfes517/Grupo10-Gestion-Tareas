/*
  Warnings:

  - You are about to drop the column `isComplete` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isComplete",
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Pendiente';
