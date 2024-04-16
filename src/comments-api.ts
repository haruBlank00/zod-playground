import { z } from "zod";

const ENDPOINT = "https://jsonplaceholder.typicode.com/posts/1/comments";

const comment = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

const commentsSchema = z.array(comment);
const getComments = () => {
  return new Promise((resolve, reject) => {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((e) => {
        console.error({ message: e.message, name: e.name });
        reject("Something went wrong");
      });
  });
};

getComments()
  .then((data) => {
    const parsedData = commentsSchema.parse(data);
    console.log(parsedData);
    return parsedData;
  })
  .catch((e) => console.error({ message: e.message, name: e.name }));
