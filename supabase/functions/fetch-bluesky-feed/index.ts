import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { handle } = await req.json();
    
    if (!handle) {
      return new Response(
        JSON.stringify({ error: 'Handle is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const feedUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=20&filter=posts_no_replies`;
    console.log(`Fetching Bluesky feed: ${feedUrl}`);

    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch Bluesky feed: ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Bluesky feed' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    const posts = data.feed?.map((item: any) => {
      const post = item.post;
      const record = post.record;
      
      // Get first image if available
      let image = null;
      if (post.embed?.$type === 'app.bsky.embed.images#view') {
        image = post.embed.images?.[0]?.thumb || null;
      } else if (post.embed?.$type === 'app.bsky.embed.external#view') {
        image = post.embed.external?.thumb || null;
      }
      
      return {
        id: post.cid,
        content: record.text || '',
        createdAt: record.createdAt,
        url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`,
        likes: post.likeCount || 0,
        reposts: post.repostCount || 0,
        image,
      };
    }) || [];

    console.log(`Successfully fetched ${posts.length} Bluesky posts`);

    return new Response(
      JSON.stringify({ posts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in fetch-bluesky-feed function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
