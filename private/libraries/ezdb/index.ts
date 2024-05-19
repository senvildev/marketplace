// simple typescript sqlite3 database library made by senvildev on github

import { Database } from "bun:sqlite";
import type {
	TableStructure, FilterStructure,
	DatabaseTables, PragmaSettings
} from "./types"

class EZDB
{
	public database : Database;
	public database_tables : DatabaseTables;
	private pragma_settings : PragmaSettings;

	constructor(database_path : string, database_tables : DatabaseTables , pragma_settings : PragmaSettings)
	{
		this.database = new Database(database_path);
		this.database_tables = database_tables;
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
		for (let i in this.database_tables) {
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
			this.database.query(full_query).run();
		}
	}

	public find_values(table : string, columns : string[], filters?: FilterStructure) : void {
		let full_query : string = "SELECT ";
		for (let i in columns) {
			full_query += `${columns[i]}, `;
		} full_query = full_query.substring(0, full_query.length - 2);
		full_query += ` FROM ${table}`;

		if(filters) {
			full_query += " WHERE";
			for (const column_iterator in filters)
			{
				const column = filters[column_iterator];
				full_query += ` ${column_iterator} ${column[0]} ${column[1]}`
			}
		}

		console.log(full_query)
		const query = this.database.query(full_query);
		console.log(query.all())
	}

	public add_values() : void {
		
	}
}

const db = new EZDB("./db.sqlite3", {
		users: {
			id: "integer primary key autoincrement",
			username: "varchar(32) not null",
			first_name: "varchar(32) not null",
			password: "varchar(64) not null"
		},
		offers: {
			id: "integer primary key autoincrement",
			offer_title: "varchar(32) not null",
			offer_description: "varchar(256) not null",
			offer_author: "integer not null",
			foreign_keys: { offer_author: "users(id)" }
		}
	}, { foreign_keys: "ON" }
);

db.find_values("users", ["id", "username"], { "id": ["= 1", ""] });