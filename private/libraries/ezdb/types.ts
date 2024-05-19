interface TableStructure {
	[ index : string ] : string | {
		[ index : string ] : string
	}
}

interface FilterStructure {
	[ index : string ] : [string, string]
}

interface DatabaseTables {
	[ index : string ] : TableStructure
}

interface PragmaSettings {
	[ index : string ] : string
}

export type {
	TableStructure, FilterStructure,
	DatabaseTables, PragmaSettings
}