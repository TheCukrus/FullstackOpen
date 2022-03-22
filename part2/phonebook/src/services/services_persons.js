import axios from "axios";
const baseUrl = "http://localhost:3001/persons"


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
        return result1;
    }
    catch (err)
    {
        console.log(err);
    }
}

const update = async (id, new_client_obj) =>
{
    try
    {
        const result1 = await axios({
            method: "put",
            url: `${baseUrl}/${id}`,
            data: new_client_obj
        })
        return result1
    }
    catch (err)
    {
        console.log(err);
    }
}

const remove = async (id) =>
{
    try
    {
        const result1 = await axios({
            method: 'delete',
            url: `${baseUrl}/${id}`
        })
    }
    catch (err)
    {
        console.log()
    }
}

export default { getAll, create, update }
