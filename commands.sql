\d
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
);
insert into blogs (author, url, title, likes) values ('Harry', 'harry.net', 'harry harry haryy', 5);
insert into blogs (author, url, title, likes) values ('Potter', 'potter.com', 'potterr potter potter', 9001);
insert into blogs (author, url, title, likes) values ('Ryan Florence', 'remix.run', 'Blazing fast app', 0);
insert into blogs (author, url, title, likes) values ('Kent C.dodds', 'remix.run', 'Why i wont use nextjs?', 0);
insert into blogs (author, url, title, likes) values ('Rob lee', 'vercel.com', 'Why i use nextjs', 0);
select * from blogs;
\d blogs;