/*
  Warnings:

  - Made the column `generoId` on table `filme` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `filme` DROP FOREIGN KEY `Filme_generoId_fkey`;

-- DropIndex
DROP INDEX `Filme_generoId_fkey` ON `filme`;

-- AlterTable
ALTER TABLE `filme` MODIFY `generoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Filme` ADD CONSTRAINT `Filme_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
