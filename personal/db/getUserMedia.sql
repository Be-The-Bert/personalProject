select link as source, img, title, description, u.name as author, gm.id as groupid, s.id as sectionid, g.name as groupname, s.name as sectionname from media m
join users u on u.id = m.author
join groupmembers gm on gm.userid = u.id
join groups g on g.id = gm.groupid
join sections s on s.groupid = gm.groupid
where u.id = $1;