select link as source, img, title, desciption, name as author from media
join users on users.id = media.author
where users.id = $1;