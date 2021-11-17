import supabase from '../../../../hooks/useSupabase';
import {CREDENTIALS_API_ROUTE} from '../../../../constants/api_constants';

const handler = async (req, res) => {
  const session = req.headers.Authorization;

  let {id} = req.body;

  supabase.auth.setAuth (session);

  let {data, error} = await supabase
    .from (CREDENTIALS_API_ROUTE)
    .select (`*`)
    .eq ('id', id)
    .single ();

  if (error) {
    return {
      status: error.status,
      message: error.message,
    };
  }

  return res.status (200).json ({data});
};

export default handler;
