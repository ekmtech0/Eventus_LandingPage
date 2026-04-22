#!/usr/bin/env node


async function checkMetaTags(eventName) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eventusangola.com';
  const url = `http://localhost:3000/events/${encodeURIComponent(eventName)}`;

  try {
    console.log(`\n🔍 Verificando metatags para: ${eventName}`);
    console.log(`📍 URL: ${url}\n`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = await response.text();

    // Verificar metatags importantes
    const checks = {
      'og:title': /<meta property="og:title" content="([^"]*)"/.exec(html),
      'og:description': /<meta property="og:description" content="([^"]*)"/.exec(html),
      'og:image': /<meta property="og:image" content="([^"]*)"/.exec(html),
      'og:url': /<meta property="og:url" content="([^"]*)"/.exec(html),
      'twitter:card': /<meta name="twitter:card" content="([^"]*)"/.exec(html),
      'twitter:image': /<meta name="twitter:image" content="([^"]*)"/.exec(html),
      'description': /<meta name="description" content="([^"]*)"/.exec(html),
      'canonical': /<link rel="canonical" href="([^"]*)"/.exec(html),
    };

    console.log('✅ Metatags encontradas:\n');

    Object.entries(checks).forEach(([key, match]) => {
      if (match) {
        console.log(`  ✓ ${key}: ${match[1]}`);
      } else {
        console.log(`  ✗ ${key}: NÃO ENCONTRADA`);
      }
    });

    // Verificar se a imagem é acessível
    const imageMatch = /<meta property="og:image" content="([^"]*)"/.exec(html);
    if (imageMatch) {
      const imageUrl = imageMatch[1];
      console.log(`\n🖼️  Verificando acesso à imagem...`);
      try {
        const imgResponse = await fetch(imageUrl, { method: 'GET' });
        if (imgResponse.ok) {
          console.log(`  ✓ Imagem acessível (${imgResponse.status})`);
        } else {
          console.log(`  ✗ Imagem retorna ${imgResponse.status}`);
        }
      } catch (err) {
        console.log(`  ✗ Erro ao acessar imagem: ${err.message}`);
      }
    }

    console.log('\n');
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
  }
}

const eventName = process.argv[2] || 'teste-evento';
checkMetaTags(eventName);
