interface TableStructure {
	[ index : string ] : string | number | {
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

interface UpdateColumnsValues {
    [ index : string ] : string
}

type InsertValues = TableStructure[]

export type {
	TableStructure, FilterStructure,
	DatabaseTables, PragmaSettings,
	InsertValues, UpdateColumnsValues
}