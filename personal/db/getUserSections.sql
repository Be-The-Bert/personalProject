select s.id, s.groupid, s.name from sections s
join groupmembers gm on s.groupid = gm.groupid
where gm.userid = $1;