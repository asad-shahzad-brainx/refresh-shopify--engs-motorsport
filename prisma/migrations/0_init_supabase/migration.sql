-- CreateEnum
CREATE TYPE "action_required" AS ENUM ('create', 'update', 'delete');

-- CreateTable
CREATE TABLE "product_desciption" (
    "id" BIGSERIAL NOT NULL,
    "swedish" TEXT,
    "initial_dt" TEXT,
    "product_id" SMALLINT,
    "gpt_translation" TEXT,
    "google_trans" TEXT,

    CONSTRAINT "product_desciption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT,
    "url_handle" TEXT,
    "description" TEXT,
    "no_login_price" DOUBLE PRECISION,
    "buy_price" DOUBLE PRECISION,
    "sales_price" INTEGER,
    "currency_sign" TEXT,
    "currency" TEXT,
    "in_stock" BOOLEAN,
    "image_urls" TEXT[],
    "sku" TEXT,
    "shelf_space" TEXT,
    "specification" TEXT,
    "shipping_class" TEXT,
    "max_shipping_weight" INTEGER,
    "option_name" TEXT,
    "option_values" JSON[],
    "created_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "updated_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "action_required" "action_required",
    "original_title" TEXT,
    "original_description" TEXT,
    "original_specification" TEXT,
    "original_shipping_class" TEXT,
    "original_option_name" TEXT,
    "weight_unit" TEXT,
    "actual_weight" DOUBLE PRECISION,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_sku_idx" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_url_handle_idx" ON "products"("url_handle");

