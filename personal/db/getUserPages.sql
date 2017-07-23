select d.id as dayid, g.name as groupname, s.name as sectionname, date from days d
join sections s on s.id = d.sectionid
join groups g on g.id = s.groupid
join groupmembers gm on g.id = gm.groupid
where userid = $1;