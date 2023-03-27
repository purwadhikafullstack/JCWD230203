use property_renting_web_app;

SELECT * FROM property_renting_web_app.room;

SELECT * FROM transactions WHERE status_id = 4 AND transactions.createdAt BETWEEN '2023-03-18' AND '2023-03-31';

SELECT @@global.time_zone;
SELECT * FROM mysql.time_zone_name;
SET time_zone = 'Asia/Jakarta';

SELECT @@global.time_zone, @@session.time_zone;
SET GLOBAL time_zone = 'Asia/Jakarta';
SET SESSION time_zone = 'Asia/Jakarta';
SELECT * FROM mysql.time_zone;

SELECT transactions.*
FROM transactions
INNER JOIN room ON transactions.room_id = room.id
INNER JOIN property ON room.property_id = property.id
WHERE property.tenant_id = [1]
AND transactions.room_id = []




