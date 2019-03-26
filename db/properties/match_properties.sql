select * 
from vrproperties
join vrusers ON vrproperties.id = vrusers.property_id
where vrproperties.id = $1;
-- will return records that have a matching value on both tables

