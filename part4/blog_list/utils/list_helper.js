import Blog from "../models/note.js";

const dummy = (blogs) =>
{
    return 1;
}


const totalLikes = async (blogs) =>
{
    try
    {
        const result1 = await Blog.find()
        const result2 = JSON.stringify(result1)
        let sum = 0;
        console.log(result2);
        for (let i = 0; i < result1.length; i++)
        {
            sum += result1[i].likes;
        }
        console.log(sum)

        return sum;
    }
    catch (err)
    {
        console.log(`klaida ${err}`)
    }

}


const favoriteBlog = async (blogs) => 
{
    try
    {
        const result1 = await Blog.find();
        console.log(result1);
        let favoriteb = 0;
        let temp;
        for (let i = 0; i < result1.length; i++)
        {
            if (favoriteb < result1[i].likes)
            {
                favoriteb = result1[i].likes;
                temp =
                {
                    "title": result1[i].title,
                    "author": result1[i].author,
                    "likes": result1[i].likes
                }
            }
        }
        console.log(temp);
        return temp;
    }
    catch (err)
    {
        console.log(`klaida list helper: ${err}`);
    }
}

const mostBlogs = async (blogs) =>
{
    try
    {
        const result1 = await Blog.find();
        let temp = 0;
        let temp2;

        for (let i = 0; i < result1.length; i++)
        {
            var author = result1[i].author;
            var counter = 0;

            for (let j = 0; j < result1.length; j++)
            {
                if (author === result1[j].author)
                {
                    counter++;
                }
            }
            if (counter > temp)
            {
                temp = counter;
                temp2 = {
                    "author": author,
                    "blogs": temp
                }
            }
        }
        console.log(temp2);
        return temp2;
    }
    catch (err)
    {
        console.log(`klaida mostBlogs: ${err}`)
    }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs };