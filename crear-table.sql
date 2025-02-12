CREATE TABLE "tb_product" (
  "id" varchar(36) PRIMARY KEY,
  "name" varchar,
  "price" numeric(10,2),
  "stock" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_active" bool,
  "id_units_measurement" varchar(36)
);

CREATE TABLE "tb_information_period" (
  "id" varchar(36) PRIMARY KEY,
  "month" varchar,
  "demanda" integer,
  "meta" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tb_person" (
  "id" varchar(36) PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "document" varchar(12),
  "id_city" varchar(36),
  "id_comuna" varchar(36)
);

CREATE TABLE "tc_city" (
  "id" varchar(36) PRIMARY KEY,
  "value" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tc_comuna" (
  "id" varchar(36) PRIMARY KEY,
  "value" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tc_units_measurement" (
  "id" varchar(36) PRIMARY KEY,
  "value" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tb_customer" (
  "id" varchar(36) PRIMARY KEY,
  "created_at" timestamp,
  "updated_at" timestamp,
  "is_active" bool
);

CREATE TABLE "tb_sale" (
  "id" varchar(36) PRIMARY KEY,
  "id_customer" varchar(36),
  "id_product" varchar(36),
  "amount" numeric(10,2),
  "number_products" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "id_information_period" varchar(36)
);

ALTER TABLE "tb_customer" ADD FOREIGN KEY ("id") REFERENCES "tb_person" ("id");

ALTER TABLE "tb_person" ADD FOREIGN KEY ("id_city") REFERENCES "tc_city" ("id");

ALTER TABLE "tb_person" ADD FOREIGN KEY ("id_comuna") REFERENCES "tc_comuna" ("id");

ALTER TABLE "tb_sale" ADD FOREIGN KEY ("id_information_period") REFERENCES "tb_information_period" ("id");

ALTER TABLE "tb_sale" ADD FOREIGN KEY ("id_customer") REFERENCES "tb_customer" ("id");

ALTER TABLE "tb_sale" ADD FOREIGN KEY ("id_product") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_product" ADD FOREIGN KEY ("id_units_measurement") REFERENCES "tc_units_measurement" ("id");
