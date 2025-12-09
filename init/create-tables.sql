CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    createdat date NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.products
(
    id uuid NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    price double precision NOT NULL,
    article text COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    active boolean NOT NULL,
    createdat date NOT NULL,
    idvendor uuid,
    rating double precision DEFAULT 0,
    countgrades bigint DEFAULT 0,
    quantitysold bigint NOT NULL DEFAULT 0,
    count_comments bigint NOT NULL DEFAULT 0,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT fk_products_vendor FOREIGN KEY (idvendor) REFERENCES public.users (id) ON DELETE SET NULL
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.avatar
(
    id uuid NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    productid uuid NOT NULL,
    CONSTRAINT avatar_pkey PRIMARY KEY (id),
    CONSTRAINT fk_avatar_product FOREIGN KEY (productid) REFERENCES public.products (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.avatar
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.photos
(
    id uuid NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    product_id uuid NOT NULL,
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT fk_photos_product FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.buy_product
(
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    buy_at date NOT NULL,
    price double precision NOT NULL,
    CONSTRAINT buy_product_pkey PRIMARY KEY (id),
    CONSTRAINT fk_buy_product_product FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE RESTRICT,
    CONSTRAINT fk_buy_product_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE RESTRICT
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.buy_product
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.comments
(
    id uuid NOT NULL,
    comment text COLLATE pg_catalog."default" NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    count_likes bigint NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    created_at date,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_product FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.favorites
(
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT favorites_pkey PRIMARY KEY (id),
    CONSTRAINT fk_favorites_product FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE,
    CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favorites
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.rating
(
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    user_id uuid NOT NULL,
    grade bigint NOT NULL,
    CONSTRAINT rating_pkey PRIMARY KEY (id),
    CONSTRAINT fk_rating_product FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE,
    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rating
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.refresh_tokens
(
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    refresh_token text COLLATE pg_catalog."default" NOT NULL,
    expires_at time with time zone NOT NULL,
    created_at time with time zone NOT NULL,
    CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id),
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.refresh_tokens
    OWNER to postgres;