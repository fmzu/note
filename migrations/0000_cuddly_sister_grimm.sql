CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text(256) NOT NULL,
	`title` text(64) NOT NULL,
	`text` text(2048) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`uuid` text(256) NOT NULL,
	`name` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`login` text(256) NOT NULL,
	`hashed_password` text(256),
	`avatar_icon_url` text(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_uuid_unique` ON `posts` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);