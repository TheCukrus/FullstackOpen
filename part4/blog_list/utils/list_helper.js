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
        console.log(result2)
        let sum = 0;
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


export default { dummy, totalLikes };