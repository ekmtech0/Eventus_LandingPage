#!/usr/bin/env node

import fetch from 'node-fetch';

async function checkMetaTags(eventName) {
  const url = `http://localhost:3000/events/${encodeURIComponent(eventName)}`;

  try {
    console.log(`\n🔍 Verificando metatags para: "${eventName}"`);
    console.log(`📍 URL: ${url}\n`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (response.status === 404) {
      console.log('❌ Evento não encontrado (404). Verifique se o nome do evento está correto.');
      return;
    }

    const html = await response.text();

    // Verificar metatags importantes
    const checks = {
      'og:title': /<meta property="og:title" content="([^"]*)"/.exec(html),
      'og:description': /<meta property="og:description" content="([^"]*)"/.exec(html),
      'og:image': /<meta property="og:image" content="([^"]*)"/.exec(html),
      'og:url': /<meta property="og:url" content="([^"]*)"/.exec(html),
      'og:type': /<meta property="og:type" content="([^"]*)"/.exec(html),
      'twitter:card': /<meta name="twitter:card" content="([^"]*)"/.exec(html),
      'twitter:image': /<meta name="twitter:image" content="([^"]*)"/.exec(html),
      'description': /<meta name="description" content="([^"]*)"/.exec(html),
      'canonical': /<link rel="canonical" href="([^"]*)"/.exec(html),
    };

    console.log('✅ Metatags encontradas:\n');

    let hasUndefined = false;
    Object.entries(checks).forEach(([key, match]) => {
      if (match) {
        const value = match[1];
        if (value.includes('undefined')) {
          console.log(`  ❌ ${key}: "${value}" (UNDEFINED - Evento não foi carregado!)`);
          hasUndefined = true;
        } else {
          console.log(`  ✓ ${key}: "${value}"`);
        }
      } else {
        console.log(`  ⚠️  ${key}: NÃO ENCONTRADA`);
      }
    });

    // Verificar se a imagem é acessível
    const imageMatch = /<meta property="og:image" content="([^"]*)"/.exec(html);
    if (imageMatch) {
      const imageUrl = imageMatch[1];
      console.log(`\n🖼️  Testando acesso à imagem...`);
      try {
        const imgResponse = await fetch(imageUrl);
        if (imgResponse.ok) {
          console.log(`  ✓ Imagem acessível (${imgResponse.status})`);
          console.log(`  ✓ URL: ${imageUrl}`);
        } else {
          console.log(`  ❌ Imagem retorna ${imgResponse.status}`);
          console.log(`  URL: ${imageUrl}`);
        }
      } catch (err) {
        console.log(`  ❌ Erro ao acessar imagem: ${err.message}`);
      }
    }

    if (hasUndefined) {
      console.log('\n⚠️  PROBLEMA DETECTADO:');
      console.log('   - O evento não foi encontrado na API');
      console.log('   - Verifique se o evento existe no banco de dados');
      console.log('   - Tente procurar eventos disponíveis em: http://localhost:3000/explorar');
    }

    console.log('\n');
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
  }
}

const eventName = process.argv[2];
if (!eventName) {
  console.log('\n📝 Uso: node verify-metadata.mjs <nome-do-evento>');
  console.log('\nExemplos:');
  console.log('  node verify-metadata.mjs "meu-evento"');
  console.log('  node verify-metadata.mjs "festa-de-aniversario"\n');
  process.exit(1);
}

checkMetaTags(eventName);
