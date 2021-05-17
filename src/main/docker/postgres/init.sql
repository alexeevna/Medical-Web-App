create table if not exists public.users
(
    id              bigint not null,
    password        varchar(255),
    rate            integer,
    registered_date timestamp,
    role            varchar(255),
    status          integer,
    username        varchar(255),
    constraint users_pkey
    primary key (id)
    );

alter table public.users
    owner to postgres;
