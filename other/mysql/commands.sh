mysql_config_editor set \
  --login-path=somename \
  --host=localhost \
  --user=username \
  --password

# Enter password: pass

mysql --login-path=somename dbname < db-2020-01-01.sql
