-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `idArtist` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `streams` INTEGER NOT NULL,
    `photo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idArtist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Music` (
    `idMusic` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `album` VARCHAR(191) NOT NULL,
    `artistId` INTEGER NULL,

    PRIMARY KEY (`idMusic`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MusicToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MusicToUser_AB_unique`(`A`, `B`),
    INDEX `_MusicToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Music` ADD CONSTRAINT `Music_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`idArtist`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MusicToUser` ADD CONSTRAINT `_MusicToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Music`(`idMusic`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MusicToUser` ADD CONSTRAINT `_MusicToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
