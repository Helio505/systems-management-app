-- CreateTable
CREATE TABLE `System` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `acronym` VARCHAR(10) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `url` VARCHAR(50) NOT NULL,
    `status` ENUM('ATIVO', 'CANCELADO') NOT NULL DEFAULT 'ATIVO',
    `user` VARCHAR(100) NOT NULL,
    `justification` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
