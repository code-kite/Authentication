🔐 Authentication App — Drizzle ORM + Expo + SQLite

Welcome to your Authentication App powered by Drizzle ORM, Expo, and SQLite. This guide will walk you through setting up the database, configuration files, migrations, and usage in your app.

🚀 Getting Started
✅ Prerequisites

Node.js and npm installed

Expo project initialized

TypeScript support

🧱 1. Define Your Database Schema

Install Drizzle ORM:

npm install drizzle-orm


Create the schema file:

// src/db/schema.ts

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

⚙️ 2. Setup Configuration Files
🔧 Babel Configuration

Install plugin:

npm install babel-plugin-inline-import


If you don’t already have babel.config.js, generate one:

npx expo customize babel.config.js


Update babel.config.js:

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]]
  };
};

🔧 Metro Configuration

If not already present, create metro.config.js:

npx expo customize metro.config.js


Update metro.config.js:

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql'); // Add support for SQL file imports

module.exports = config;

🧰 3. Install Drizzle Kit (CLI & Migrations)

Install the CLI tool for migrations:

npm install -D drizzle-kit


Create the drizzle.config.ts file in the root of your project:

// drizzle.config.ts

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts', // Path to schema
  out: './src/drizzle',         // Output folder for migrations
  dialect: 'sqlite',
  driver: 'expo',               // Use Expo driver for SQLite
} satisfies Config;

📦 4. Generate Migrations

Convert your TypeScript schema into .sql migration files:

npx drizzle-kit generate

🌐 5. Setup Root Layout with SQLite Provider

Update your RootLayout.tsx or equivalent file:

// app/_layout.tsx or RootLayout.tsx

import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';

export const DATABASE_NAME = 'MyDatabase';

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <Stack />
    </SQLiteProvider>
  );
}

🔁 6. Apply Migrations on App Init

Update your RootLayout.tsx to run migrations automatically on init:

import migrations from "@/src/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';

export const DATABASE_NAME = 'MyDatabase';

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
      onInit={async (database) => {
        try {
          const db = drizzle(database);
          await migrate(db, migrations); // Run migrations
          console.log("Migration success");
        } catch (error) {
          console.error("Migration error", error);
        }
      }}
    >
      <Stack />
    </SQLiteProvider>
  );
}

📋 7. Reading and Writing Data with Drizzle

Create a screen (e.g., src/app/index.tsx) to insert and display users:

import * as schema from "@/src/db/schema";
import { Button } from "@react-navigation/elements";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";
import { user } from "../db/schema";

export default function Index() {
  const expoDb = useSQLiteContext();
  const drizzleDB = drizzle(expoDb, { schema });

  const { data } = useLiveQuery(drizzleDB.select().from(user));

  const addUser = async () => {
    try {
      await drizzleDB.insert(user).values({
        name: `User ${Date.now()}`,
        email: `user${Date.now()}@example.com`,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Users:</Text>
      
      {data?.map((userData) => (
        <View key={userData.id} style={{ marginBottom: 15 }}>
          <Text>ID: {userData.id}</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
        </View>
      ))}
      
      <Button onPress={addUser}>Add User</Button>
    </View>
  );
}

🧪 You're Done!

You now have:

✅ A typed schema with Drizzle ORM
✅ Auto-generated migration files
✅ SQLite integration using Expo
✅ Real-time querying and UI updates

📁 Project Structure Summary
project-root/
├── drizzle.config.ts
├── metro.config.js
├── babel.config.js
├── src/
│   ├── db/
│   │   ├── schema.ts         # Drizzle ORM schema
│   └── drizzle/
│       └── migrations/       # SQL migration files
├── app/
│   ├── _layout.tsx           # SQLite Provider & Migrations
│   └── index.tsx             # UI to read/write users

🧠 Helpful Tips

Use drizzle-kit push to push schema directly to DB (for advanced use)

Check Drizzle ORM Docs
 for advanced usage

Happy coding! 🎉
