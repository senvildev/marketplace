// simple typescript sqlite3 database library made by senvildev on github

import { Database } from "bun:sqlite";
import type {
	TableStructure, FilterStructure,
	DatabaseTables, PragmaSettings,
	InsertValues
} from "./types"

class EZDB
{
	public database : Database;
	public database_tables : DatabaseTables;
	private pragma_settings : undefined | PragmaSettings;

	constructor(database_path : string, database_tables : DatabaseTables , pragma_settings? : PragmaSettings)
	{
		this.database = new Database(database_path);
		this.database_tables = database_tables;
		if (pragma_settings)
			this.pragma_settings = pragma_settings;

		this.prepare_settings();
		this.prepare_database();
	}

	public prepare_settings() : void {
		for (let i in this.pragma_settings) {
			let query : string = "";
			query += `PRAGMA ${i} = ${this.pragma_settings[i]}`;
			this.database.exec(query);
		}
	}

	public prepare_database() : void {
		// get columns from passed tables
		for (const i in this.database_tables) {
			let full_query : string = "CREATE TABLE IF NOT EXISTS ";

			const table : TableStructure = this.database_tables[i];
			full_query += `${i} (`;

			for (const column in table) {
				const value : string | {[ index : string ] : string} | any = table[column]
				if (column == "foreign_keys")
					for (const foreign_key in value)
						full_query += `FOREIGN KEY (${foreign_key}) REFERENCES ${value[foreign_key]},`;
				else full_query += `${column} ${value},`;
			}

			full_query = full_query.substring(0, full_query.length - 1) + ")";
			// console.log(full_query);
			this.database.query(full_query).run();
		}
	}

	public find_values(table : string, columns : string[], filters?: FilterStructure, extra? : string) : object[] {
		let full_query : string = "SELECT ";
		for (const i in columns) {
			full_query += `${columns[i]}, `;
		} full_query = full_query.substring(0, full_query.length - 2);
		full_query += ` FROM ${table}`;

		if(filters) {
			full_query += " WHERE";
			for (const column_iterator in filters) {
				const column = filters[column_iterator];
				full_query += ` ${column_iterator} "${column[0]}" ${column[1]}`
			}
		} full_query += ` ${extra != undefined ? extra : ""}`;
		console.log(full_query);

		const query_results : any[] = this.database.query(full_query).all();
		return query_results;
	}

	public add_values(table : string, values : InsertValues) : void {
		for (const i in values) {
			let query : string = `INSERT INTO ${table} `;
			let columns_query : string = "";
			let values_query : string = "";
			const array : any = values[i];
			for (const column in array) {
				columns_query += `${column}, `;
				values_query += `"${array[column]}", `;
			}
			columns_query = columns_query.substring(0, columns_query.length - 2);
			values_query = values_query.substring(0, values_query.length - 2);
			query += `(${columns_query}) VALUES(${values_query})`;
			// console.log(query);
			try {
				this.database.query(query).run();
			} catch (error) {
				console.warn(`[!!!] error adding values to table ${table}.`);
				console.warn(`[!!!]  > query: ${query}`);
				console.log(error)
			}
		}
	}
}

// const db = new EZDB("./db.sqlite3", {
// 		users: {
// 			username: "varchar(32) primary key",
// 			first_name: "varchar(32) not null",
// 			password: "varchar(64) not null"
// 		},
// 		offers: {
// 			id: "integer primary key autoincrement",
// 			title: "varchar(32) not null",
// 			description: "varchar(256) not null",
// 			author: "varchar(32) not null",
// 			price: "real not null", sold: "bool default false",
// 			foreign_keys: { author: "users(username)" }
// 		}
// 	}, { foreign_keys: "ON" }
// );

export {
	EZDB
}

// db.add_values("users", [
// 	{
// 		username: "jajakraba",
// 		first_name: "janskrzy00@gmail.com",
// 		password: "jaja1kraba2"
// 	}
// ]);

// db.add_values("offers", [
// 	{
// 		title: "skarpetki",
// 		description: "uzywane skarpetki Merlin Monroł",
// 		author: "jajakraba",
// 		price: 69420.69
// 	}
// ]);

// console.log(db.find_values("users", ["username", "first_name", "password"]));
// console.log(db.find_values("offers", ["*"]));