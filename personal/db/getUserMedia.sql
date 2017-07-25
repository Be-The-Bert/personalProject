select link as source, img, title, description, u.name as author, gm.id as groupid, s.id as sectionid, g.name as groupname, s.name as sectionname from groupmembers gm
join users u on u.id = gm.userid
join groups g on g.id = gm.groupid
join sections s on s.groupid = g.id
join days d on d.sectionid = s.id
join media m on m.dayid = d.id
where u.id = $1;