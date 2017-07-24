select g.name as name, g.id as groupid, g.status as status, gm.admin as admin from groups g
join groupmembers gm on g.id = gm.groupid
join users u on gm.userid = u.id
where u.id = $1;