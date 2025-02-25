import { relations } from "drizzle-orm";
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  role: ROLE_ENUM("role").notNull().default("user"),
});

export const LISTING_STATUS = pgEnum("status", [
  "selling",
  "sold out",
  "reopened",
]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  name: text("name").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  listingStatus: LISTING_STATUS("status").notNull().default("selling"),
  type: varchar("type", { length: 256 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  categoryId: uuid("category_id").references(() => categoriesTable.id),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  size: integer("size"),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull().unique().default("House"),
  description: varchar("description", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const watchlistInfo = pgTable("watchlist", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  propertyId: uuid("property_id")
    .notNull()
    .references(() => products.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("creted_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  productId: uuid("product").references(() => products.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

//==================== Relationships ===========================

// One user to many watchlists products
export const userRelations = relations(usersTable, ({ many }) => ({
  watchList: many(watchlistInfo),
  likes: many(likes),
}));

// many products to one category
//many products to one watchlist
export const productsRelations = relations(products, ({ one, many }) => ({
  watchlist: many(watchlistInfo),
  category: one(categoriesTable, {
    fields: [products.categoryId],
    references: [categoriesTable.id],
  }),
  likes: many(likes),
}));

// one watchlist many users
export const watchlistRelations = relations(watchlistInfo, ({ one }) => ({
  user: one(usersTable, {
    fields: [watchlistInfo.userId],
    references: [usersTable.id],
  }),
  products: one(products, {
    fields: [watchlistInfo.propertyId],
    references: [products.id],
  }),
}));

//many users can like one product
export const likesRelations = relations(likes, ({ one }) => ({
  users: one(usersTable, {
    fields: [likes.userId],
    references: [usersTable.id],
  }),
  likes: one(products, {
    fields: [likes.productId],
    references: [products.id],
  }),
}));

// one categories to one products
export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  products: many(products),
}));
