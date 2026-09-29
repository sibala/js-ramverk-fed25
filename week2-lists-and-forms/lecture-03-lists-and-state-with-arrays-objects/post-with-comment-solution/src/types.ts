export type Post = {
  headline: string,
  content: string
  date: Date,
  author: Author
}

export type Author = {
  fullname: string
  image: string,
}

export type Comment = {
  content: string,
  date: Date,
  author: Author
}