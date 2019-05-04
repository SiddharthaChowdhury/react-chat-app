CREATE TABLE IF NOT EXISTS `chat`.`user`(
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL DEFAULT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`) USING BTREE
);

CREATE TABLE `chat`.`messages`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `messageType` ENUM('link', 'attachment', 'text', 'other') NULL,
    `content` TEXT NULL,
    `createdAt` TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP NOT NULL,
    `fromId` INT NOT NULL,
    `toId` INT NOT NULL,
    PRIMARY KEY(`id`) USING BTREE
);