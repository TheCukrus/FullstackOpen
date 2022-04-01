import axios from "axios";
const port = 80;
// const domain = "https://obscure-plateau-60901.herokuapp.com";
const domain = ""
const baseUrl = `${domain}/api/persons`




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
        return err;
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
        return err;
    }
}

const update = async (id, new_client_obj) =>
{
    try
    {
        const result1 = await axios({
            method: 'patch',
            url: `${baseUrl}/${id}`,
            data: new_client_obj
        })
        return result1
    }
    catch (err)
    {
        console.log(err);
        return err;
    }
}

const remove = async (id) =>
{

    const result1 = await axios({
        method: 'delete',
        url: `${baseUrl}/${id}`
    })
    return result1;


}

export default { getAll, create, update, remove }
