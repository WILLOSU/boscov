-- AlterTable
ALTER TABLE `filme` ADD COLUMN `generoId` INTEGER NULL,
    ADD COLUMN `sinopse` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Filme` ADD CONSTRAINT `Filme_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
