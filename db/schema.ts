import { pgTable, serial, text, boolean, integer, date, numeric } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  exerciseName: text("exercise_name").notNull(),
  muscleGroup: text("muscle_group").notNull()
})

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  date: date().notNull()
})

export const workout_exercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull().references(() => workouts.id),
  exerciseId: integer("exercise_id").notNull().references(() => exercises.id)
})

export const sets = pgTable("sets", {
  id: serial("id").primaryKey(),
  workoutExercise: integer("workout_exercise").notNull().references(() => workout_exercises.id),
  setNumber: integer("set_number").notNull(),
  weight: numeric("weight").notNull(),
  reps: integer("reps")
})