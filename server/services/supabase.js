import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

export const getAvailableCats = async () => {
    const { data, error } = await supabase
        .from('cats')
        .select('*')
        .eq('available', true)

    if (error) throw new Error(`Supabase error: ${error.message}`)
    return data
}