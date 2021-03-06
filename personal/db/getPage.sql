select d.id as dayid, g.name as groupname, s.name as sectionname, date, g.id as groupid, s.id as sectionid from days d
join sections s on s.id = d.sectionid
join groups g on g.id = s.groupid
where d.id = $1;