create table users
(
id serial primary key not null, 
email text not null,
password text not null
);

create table notes
(
value text not null, 
date date  not null, 
title text not null, 
owner serial references users(id),
id serial primary key not null
);
