-- AlterTable
ALTER TABLE `filme` ADD COLUMN `dataAtualizacao` DATETIME(3) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
