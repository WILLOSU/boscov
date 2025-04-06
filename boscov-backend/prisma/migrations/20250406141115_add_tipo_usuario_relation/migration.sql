/*
  Warnings:

  - You are about to drop the column `tipoUsuario` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `tipoUsuarioId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `tipoUsuario`,
    ADD COLUMN `tipoUsuarioId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TipoUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_tipoUsuarioId_fkey` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `TipoUsuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
