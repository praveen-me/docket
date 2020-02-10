do
$body$

DECLARE num_users INTEGER;

BEGIN
	SELECT count(*) 
	INTO num_users 
	FROM pg_user
	WHERE usename = 'docket';

	IF num_users = 0 THEN
		CREATE ROLE docket LOGIN PASSWORD 'docket';
	END IF;

END
$body$
;
ALTER ROLE docket CREATEDB;
CREATE DATABASE docketdb WITH OWNER=docket;
GRANT ALL PRIVILEGES ON DATABASE docketdb TO docket;
