#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

const { argv } = require("yargs")
	.command("[input] [output]", "sort files into YYYYMMDD format", (yargs) => {
		yargs
			.positional("input", {
				alias: "i",
				describe: "Input directory",
				require: false,
			})
			.positional("output", {
				alias: "o",
				require: false,
				describe: "Output directory",
			});
	})
	.option("recursive", {
		alias: "r",
		type: "boolean",
		description: "Run recursively",
	});

const RECURSIVE = !!(argv.recursive || argv.r);
const INPUT_DIRECTORY = argv.input || argv.i || process.cwd();
const OUTPUT_DIRECTORY = argv.output || argv.o;

if (OUTPUT_DIRECTORY && !fs.existsSync(OUTPUT_DIRECTORY)) {
	fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
}

sortFilesByYYYYMMDD(INPUT_DIRECTORY);

function sortFilesByYYYYMMDD(dirPath) {
	const filenames = fs.readdirSync(dirPath);
	const dirCache = {};

	for (const filename of filenames) {
		const fileSrcPath = path.join(dirPath, filename);
		const file = fs.statSync(fileSrcPath);

		if (file.isDirectory()) {
			if (RECURSIVE) {
				sortFilesByYYYYMMDD(fileSrcPath);
			}

			continue;
		}

		const yyyymmdd = dateToYYYYMMDD(file.birthtime);
		const newDir = path.join(OUTPUT_DIRECTORY ? OUTPUT_DIRECTORY : dirPath, yyyymmdd);

		if (!dirCache[newDir]) {
			if (!fs.existsSync(newDir)) {
				fs.mkdirSync(newDir);
			}

			dirCache[newDir] = true;
		}

		const fileDestPath = path.join(newDir, filename);
		fs.renameSync(fileSrcPath, fileDestPath);
		console.log(`File "${fileSrcPath}" was moved to "${fileDestPath}"`);
	}
}

function dateToYYYYMMDD(date) {
	return date.toISOString().split("T")[0];
}
