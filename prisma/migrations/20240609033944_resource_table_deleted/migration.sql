/*
  Warnings:

  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource_project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource_project" DROP CONSTRAINT "Resource_project_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Resource_project" DROP CONSTRAINT "Resource_project_resourceId_fkey";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "Resource_project";
