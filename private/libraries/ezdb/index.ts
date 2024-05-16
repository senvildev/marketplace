// simple typescript sqlite3 database library made by senvildev on github

import { Database } from "bun:sqlite";

class EZDB
{
	public database : Database;
	public database_tables: object | any;

	constructor(database_path : string, parsed_database_tables : object)
	{
		this.database = new Database(database_path);
		this.database_tables = parsed_database_tables;

		this.prepare_database();
	}

	public prepare_database() : void {
		for (let i in this.database_tables) {
			let full_query : string = "CREATE TABLE IF NOT EXISTS ";

			const table : object | any = this.database_tables[i];
			full_query += `${i} (`;

			for (const column in table) 
				full_query += `${column} ${table[column]},`;

			full_query = full_query.substring(0, full_query.length - 1) + ")";
			this.database.query(full_query).run();
		}
	}
}

const db = new EZDB("./db.sqlite3", {
	users: {
		id: "integer primary key autoincrement",
		username: "varchar(32) not null",
		first_name: "varchar(32) not null",
		password: "varchar(64) not null",
	}
});