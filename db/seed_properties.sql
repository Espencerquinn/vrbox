CREATE TABLE vrproperties (
    id serial primary key,
    name varchar(30),
    address varchar(100), 
    city varchar(100),
    state varchar(2),
    zip integer,
    img varchar(100),
    price decimal,
    vrlink varchar(50)
)

INSERT INTO vrproperties (name, address, city, state, zip, img, price, vrlink)
VALUES ('Test Property2', '2050 S Avoca', 'tempe', 'AZ', '85208', 250, 'heresthelink' )