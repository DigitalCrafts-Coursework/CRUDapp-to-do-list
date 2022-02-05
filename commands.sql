CREATE TABLE tasks (
    id serial,
    task text not null CHECK (task <> ''),
    completed boolean default false  
);

