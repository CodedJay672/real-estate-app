CREATE INDEX "name_index" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX "name_and_id_index" ON "products" USING btree ("name","id");