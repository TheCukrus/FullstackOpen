import axios from "axios";
const baseUrl = "https://localhost:3001/persons"


const getAll = async () =>
{
    try
    {
        const result1 = await axios({
            method: "get",
            url: baseUrl,
        })
        return result1;
    }
    catch (err)
    {
        console.log(err);
    }
}

const create = async (client_obj) =>
{
    try
    {
        const result1 = await axios({
            method: "post",
            url: baseUrl,
            data: client_obj
        })
    }
    catch (err)
    {
        console.log(err);
    }
}


export default { getAll, create }
