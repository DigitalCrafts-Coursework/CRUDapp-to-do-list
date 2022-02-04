CREATE TABLE tasks (
    id serial,
    task text not null,
    completed boolean default false  
);

