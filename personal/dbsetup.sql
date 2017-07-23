create table groups (
    id serial primary key,
    name text not null,
    status boolean
);
create table pinnedgroups (
    id serial primary key,
    userid integer references users(id),
    groupid integer references groups(id)
);
create table groupmembers (
    id serial primary key,
    usersid integer references users(id),
    groupid integer references groups(id),
    admin boolean
);
create table sections (
    id serial primary key,
    groupid integer references groups(id),
    name varchar(20) not null
);
create table days (
    id serial primary key,
    sectionid integer references sections(id)
);
create table media (
    id serial primary key,
    dayid INTEGER references days(id),
    author integer references users(id),
    public boolean,
    link text,
    img text
);
create table notes (
    id serial primary key,
    dayid integer references days(id),
    author integer references users(id),
    content text
);
create table reviews (
    id serial primary key,
    dayid integer references days(id)
);
create table reviewquestions (
    id serial primary key,
    reviewid integer references reviews(id),
    author integer references users(id),
    question text not null
);
create table focus (
    id serial primary key,
    dayid integer references days(id)
);
create table focusquestions (
    id serial primary key,
    focusid integer references focus(id),
    question text
);
create table focusanswers (
    id serial primary key, 
    focusquestionid integer references focusquestions(id),
    author integer references users(id),
    answer text
);



