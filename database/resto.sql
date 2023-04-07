-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;
-- public.admins definition

-- Drop table

-- DROP TABLE public.admins;

CREATE TABLE public.admins (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar NULL,
	"password" varchar NULL,
	CONSTRAINT admins_pkey PRIMARY KEY (id)
);


-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	ktg_name varchar NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (id)
);


-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NULL,
	price varchar NULL,
	stock int8 NULL,
	photo varchar NULL,
	categoris uuid NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT products_categoris_fkey FOREIGN KEY (categoris) REFERENCES public.categories(id)
);


