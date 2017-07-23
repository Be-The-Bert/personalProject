update users
set 
email = $2,
username = $3,
name = $4,
picture = $5
where auth0 = $1;