import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
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

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
    name: text("name").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    listingStatus: LISTING_STATUS("status").notNull().default("selling"),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    imageId: text("image_id").unique(),
    categoryId: uuid("category_id").references(() => categoriesTable.id),
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    sharedCount: integer("shared_count").default(0),
    size: integer("size"),
    price: integer("price").notNull(),
    tags: text("tags"),
    slug: text("slug"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("name_index").on(t.name),
    index("name_and_id_index").on(t.name, t.id),
  ],
);

export const categoriesTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull().unique().default("House"),
  description: varchar("description", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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

export const topSearches = pgTable("searches", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  searchCount: integer("search_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  senderName: varchar("sender_name", { length: 100 }).notNull(),
  senderEmail: varchar("sender_email", { length: 100 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// type enum
export const NOTIFICATION_TYPES = pgEnum("notif_type", ["enquiries"]);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    type: NOTIFICATION_TYPES("type").notNull().default("enquiries"),
    title: varchar("title", { length: 50 }).notNull(),
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false),
    url: text("url"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("id_index").on(t.id)],
);

//==================== Relationships ===========================

// One user can like many products
export const userRelations = relations(usersTable, ({ many }) => ({
  likes: many(likes),
}));

// many products to one category
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [products.categoryId],
    references: [categoriesTable.id],
  }),
  likes: many(likes),
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

// one categories to many products
export const categoryRelations = relations(categoriesTable, ({ many }) => ({
  products: many(products),
}));

// one search entry per product
export const searchRelations = relations(topSearches, ({ one }) => ({
  product: one(products, {
    fields: [topSearches.productId],
    references: [products.id],
  }),
}));
