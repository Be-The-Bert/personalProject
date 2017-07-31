select link as source, img, title, description, m.authorid as authorid, m.authorname as authorname, 
g.id as groupid, g.name as groupname, s.id as sectionid, s.name as sectionname, d.id as dayid from groupmembers gm
join users u on u.id = gm.userid
join groups g on g.id = gm.groupid
join sections s on s.groupid = g.id
join days d on d.sectionid = s.id
join media m on m.dayid = d.id
where u.id = $1;