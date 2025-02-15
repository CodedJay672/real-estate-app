import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("creted_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: ROLE_ENUM("role").notNull().default("user"),
});

export const PROPERTY_TYPE = pgEnum("type", ["house", "land"]);
export const LISTING_STATUS = pgEnum("status", [
  "selling",
  "sold out",
  "reopened",
]);

export const productsTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  propertyType: PROPERTY_TYPE("property_type").notNull().default("house"),
  listingStatus: LISTING_STATUS("status").notNull().default("selling"),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  size: integer("size").notNull(),
  imageUrl: text("image_url").notNull(),
  amenities: text("amenities"),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("creted_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
