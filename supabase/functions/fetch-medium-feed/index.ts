import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();
    
    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const feedUrl = `https://medium.com/feed/@${username}`;
    console.log(`Fetching Medium feed from: ${feedUrl}`);

    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch feed: ${response.status}`);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Medium feed' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const xmlText = await response.text();
    
    // Parse RSS feed
    const items: Array<{
      title: string;
      link: string;
      pubDate: string;
      description: string;
      categories: string[];
    }> = [];

    // Extract items using regex (simple XML parsing)
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];
    
    for (const itemXml of itemMatches) {
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || 
                    itemXml.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      
      // Extract description/content
      const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
      const descriptionMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
      let description = contentMatch?.[1] || descriptionMatch?.[1] || '';
      
      // Strip HTML and get first ~200 chars for excerpt
      description = description
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .trim()
        .substring(0, 300);
      
      // Extract categories
      const categoryMatches = itemXml.match(/<category>(.*?)<\/category>/g) || [];
      const categories = categoryMatches.map(cat => 
        cat.replace(/<\/?category>/g, '').replace(/<!\[CDATA\[|\]\]>/g, '')
      );

      items.push({
        title,
        link,
        pubDate,
        description,
        categories,
      });
    }

    console.log(`Successfully parsed ${items.length} items from Medium feed`);

    return new Response(
      JSON.stringify({ items }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in fetch-medium-feed function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
