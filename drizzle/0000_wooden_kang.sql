CREATE TABLE `completion` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` integer NOT NULL,
	`stepId` integer NOT NULL,
	FOREIGN KEY (`stepId`) REFERENCES `step`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`icon` text NOT NULL,
	`category` text NOT NULL,
	`moneyUnit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `response` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`infoId` integer NOT NULL,
	FOREIGN KEY (`infoId`) REFERENCES `info`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `step` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`icon` text NOT NULL,
	`details` text NOT NULL,
	`moneyCost` real NOT NULL,
	`timeCost` real NOT NULL,
	`responseId` integer NOT NULL,
	FOREIGN KEY (`responseId`) REFERENCES `response`(`id`) ON UPDATE no action ON DELETE cascade
);
