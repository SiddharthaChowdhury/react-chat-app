CREATE TABLE IF NOT EXISTS `dockety`.`user`(
    `id` INT(10) NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(100) NULL DEFAULT NULL,
    `lastName` VARCHAR(100) NULL DEFAULT NULL,
    `companyName` VARCHAR(100) NOT NULL,
    `companyId` INT(10) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` TEXT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP,
    PRIMARY KEY(`id`) USING BTREE
);

CREATE TABLE `dockety`.`messages`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INT(10) NOT NULL,
    `channelId` INT(10) NULL,
    `channelName` VARCHAR(200) NULL,
    `messageType` ENUM('link', 'attachment', 'text', 'other') NULL,
    `read` ENUM('true', 'false') NULL,
    `content` TEXT NULL,
    `subContent` VARCHAR(200) NULL,
    `fromId` INT NOT NULL,
    `fromName` VARCHAR(200) NOT NULL,
    `toId` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NULL,
    PRIMARY KEY(`id`) USING BTREE
);

CREATE TABLE `dockety`.`channel`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INT(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NULL,
    PRIMARY KEY(`id`) USING BTREE
);

CREATE TABLE `dockety`.`company`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NULL,
    PRIMARY KEY(`id`) USING BTREE
);

CREATE TABLE `dockety`.`_idChannelUser`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INT(10) NOT NULL,
    `channelId` INT(10) NULL,
    `userId` INT(10) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NULL,
    PRIMARY KEY(`id`) USING BTREE
);
