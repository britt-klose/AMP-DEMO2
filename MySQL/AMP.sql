set FOREIGN_KEY_CHECKS=0;
set SQL_MODE = 'NO_ZERO_DATE';

create datebase AMPSQL;
use AMPSQL;

create table users(
user_id INT primary key,
userType varchar(100),
cName varchar(100) not null,
username varchar(100) not null,
password varchar(100) not null

constraint user_constraint check (userType in ('admin', 'client'))
);

create table partners(
partner_id int primary key,
pName varchar(100)
);

create table offers(
offer_id INT primary key,
offername varchar(100),
partner_id int not null

foreign key (partner_id) references partners(partner_id)
);


create table clients(
    client_id INT primary key,
    cName varchar(100)
);

create table stats(
stat_id int primary key,
inputDate datetime,
offer_id int not null, 
clicks int,
conversions int,
WoW decimal,
EPC decimal,
client_id int not null

foreign key (client_id) references clients(client_id)
foreign key (offer_id) references offers(offer_id)
);