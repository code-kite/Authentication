import migrations from "@/src/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Redirect, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [isLogin, setIslogin] = useState(false)

  return (
        <Suspense fallback={<ActivityIndicator size="large" />}>
    <SQLiteProvider databaseName="user.db" options={{enableChangeListener: true}} onInit={async (database) => {
        try {
          const db = drizzle(database); // Create a Drizzle instance with the SQLite database
          await migrate(db, migrations); // Run the migrations
          console.log("Migration success");
        } catch (error) {
          console.error("Migration error", error);
        }
      }}>
     <>
    <Stack screenOptions={{headerShown: false}}/>
      {isLogin ? <Redirect href={"/(main)"} /> : <Redirect href={"/(login)"} />}
    </>
    </SQLiteProvider>
    </Suspense>
  )
}
