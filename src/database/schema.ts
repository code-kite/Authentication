import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users",{
    email: text("email").notNull(),
    username: text("username").primaryKey(),
    password: text("password").notNull()
})


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

