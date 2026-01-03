import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, instance } = await req.json();
    
    if (!username || !instance) {
      return new Response(
        JSON.stringify({ error: 'Username and instance are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // First, look up the account ID
    const lookupUrl = `https://${instance}/api/v1/accounts/lookup?acct=${username}`;
    console.log(`Looking up Mastodon account: ${lookupUrl}`);
    
    const lookupResponse = await fetch(lookupUrl);
    if (!lookupResponse.ok) {
      console.error(`Failed to lookup account: ${lookupResponse.status}`);
      return new Response(
        JSON.stringify({ error: 'Failed to find Mastodon account' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const account = await lookupResponse.json();
    const accountId = account.id;
    
    // Fetch the statuses
    const statusesUrl = `https://${instance}/api/v1/accounts/${accountId}/statuses?limit=20&exclude_replies=true&exclude_reblogs=true`;
    console.log(`Fetching statuses: ${statusesUrl}`);
    
    const statusesResponse = await fetch(statusesUrl);
    if (!statusesResponse.ok) {
      console.error(`Failed to fetch statuses: ${statusesResponse.status}`);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Mastodon statuses' }),
        { status: statusesResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const statuses = await statusesResponse.json();
    
    const posts = statuses.map((status: any) => {
      // Strip HTML tags from content
      const content = status.content
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
      
      // Get first image if available
      const image = status.media_attachments?.find((m: any) => m.type === 'image')?.preview_url || null;
      
      return {
        id: status.id,
        content,
        createdAt: status.created_at,
        url: status.url,
        reblogs: status.reblogs_count,
        favorites: status.favourites_count,
        image,
      };
    });

    console.log(`Successfully fetched ${posts.length} Mastodon posts`);

    return new Response(
      JSON.stringify({ posts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in fetch-mastodon-feed function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
