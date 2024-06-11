/*
  Warnings:

  - You are about to drop the column `isComplete` on the `Task` table. All the data in the column will be lost.
  - Added the required column `isPersonal` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isComplete",
ADD COLUMN     "isPersonal" BOOLEAN NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Pendiente';
